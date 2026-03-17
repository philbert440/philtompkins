import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

// --- Rate limiting ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3; // 3 submissions per window
const RATE_WINDOW_MS = 300_000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// --- Input validation ---
function sanitize(input: string, maxLen: number): string {
  return input
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLen);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const name = sanitize(body.name || '', 100);
    const email = sanitize(body.email || '', 200);
    const message = sanitize(body.message || '', 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    // Persist to JSON file for heartbeat pickup
    const dataDir = path.join(process.cwd(), 'data');
    const submissionsFile = path.join(dataDir, 'contact-submissions.json');
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const existing: unknown[] = fs.existsSync(submissionsFile)
        ? JSON.parse(fs.readFileSync(submissionsFile, 'utf-8'))
        : [];
      existing.push({
        id: crypto.randomUUID(),
        name,
        email,
        message,
        ip,
        timestamp: new Date().toISOString(),
        notified: false,
      });
      fs.writeFileSync(submissionsFile, JSON.stringify(existing, null, 2));
    } catch (err) {
      console.error('Failed to persist contact submission:', err);
    }

    // Also log to stdout so PM2 logs capture it as a backup
    console.log(`[CONTACT] name=${name} email=${email} message=${message.slice(0, 200)}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
