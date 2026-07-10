import PageHeader from "@/components/PageHeader";
import { about } from "@/data/about";

export default function AboutPage() {
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
        </div>
      </div>
    </div>
  );
}
