import type { TagId } from "@/data/tags";
import { tags } from "@/data/tags";
import TagIcon from "./TagIcon";

export default function TagLegend({ tagIds }: { tagIds: TagId[] }) {
  if (tagIds.length === 0) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5 rounded-lg border border-line bg-surface/60 px-3 py-2.5">
      {tagIds.map((id) => (
        <div key={id} className="flex items-center gap-1.5">
          <TagIcon tag={id} className="h-3.5 w-3.5" />
          <span className="text-[11px] text-muted">{tags[id].label}</span>
        </div>
      ))}
    </div>
  );
}
