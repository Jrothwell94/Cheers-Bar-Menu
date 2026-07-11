import PageHeader from "@/components/PageHeader";
import { about } from "@/data/about";

const socialIcon: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13.5 21v-8.1h2.72l.4-3.15h-3.12V7.75c0-.91.25-1.53 1.56-1.53h1.66V3.4A22 22 0 0 0 14.2 3.2c-2.34 0-3.95 1.43-3.95 4.04v2.55H7.5v3.15h2.75V21h3.25Z" />
    </svg>
  ),
};

export default function AboutPage() {
  const mapQuery = encodeURIComponent(about.details.address);

  return (
    <div>
      <PageHeader eyebrow="Cheers Bar" title={about.heading} />
      <div className="flex flex-col gap-4 px-5 pb-8">
        <p className="text-[15px] leading-relaxed text-foreground">
          {about.intro}
        </p>
        {about.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted-strong">
            {p}
          </p>
        ))}

        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-surface p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Location
            </p>
            <p className="mt-1 text-sm text-foreground">
              {about.details.address}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              title="Cheers Bar location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-48 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full border border-line bg-surface-raised py-2 text-sm text-gold-soft"
          >
            Get Directions
          </a>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Opening Hours
            </p>
            <p className="mt-1 text-sm text-foreground">
              {about.details.hours}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Contact
            </p>
            <p className="mt-1 text-sm text-foreground">
              {about.details.phone}
            </p>
          </div>

          {about.socials.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                Follow Us
              </p>
              <div className="mt-2 flex gap-3">
                {about.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-raised text-gold-soft"
                  >
                    {socialIcon[social.name]}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
