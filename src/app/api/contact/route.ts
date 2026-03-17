import { NextRequest, NextResponse } from 'next/server';

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

    // Send to Discord webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      const embed = {
        title: '📬 New Contact Form Submission',
        color: 0x10b981, // emerald
        fields: [
          { name: 'Name', value: name, inline: true },
          { name: 'Email', value: email, inline: true },
          { name: 'Message', value: message.slice(0, 1024) },
          { name: 'IP', value: ip, inline: true },
        ],
        timestamp: new Date().toISOString(),
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      }).catch((err) => console.error('Discord webhook failed:', err));
    }

    // Also send email via gws (fire-and-forget to Rivet's Telegram)
    // For now, Discord webhook is the primary notification channel

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
