import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  tags?: string[];
  dateRange?: string;
}

export default function ProjectCard({ title, description, href, tags, dateRange }: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-surface hover:bg-surface-hover rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald/5 border border-transparent hover:border-emerald/20"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-lg font-bold group-hover:text-emerald transition-colors">
          {title}
        </h3>
        {dateRange && (
          <span className="text-xs text-muted whitespace-nowrap mt-1">{dateRange}</span>
        )}
      </div>
      <p className="text-muted text-sm leading-relaxed mb-3">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-emerald/10 text-emerald"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
