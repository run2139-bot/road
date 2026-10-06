import { Bookmark, Mountain, Route, Timer } from "lucide-react";
import type { Course } from "@/lib/courses";
import { cn } from "@/lib/utils";

export const difficultyStyle: Record<Course["difficulty"], string> = {
  초급: "bg-accent/15 text-accent",
  중급: "bg-yellow-400/15 text-yellow-300",
  상급: "bg-red-500/15 text-red-400",
};

interface Props {
  course: Course;
  bookmarked: boolean;
  onOpen: () => void;
  onToggleBookmark: () => void;
}

export default function CourseCard({ course, bookmarked, onOpen, onToggleBookmark }: Props) {
  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_24px_-6px_#00f2fe]">
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-primary"
        aria-label={`${course.name} 상세 보기`}
      />
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
        <span className={cn("rounded-full px-2.5 py-1", difficultyStyle[course.difficulty])}>
          {course.difficulty}
        </span>
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-primary">
          {course.category}
        </span>
      </div>
      <h3 className="text-xl font-bold">{course.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{course.region}</p>
      <div className="mt-4 flex gap-4 text-sm text-slate-300">
        <span className="flex items-center gap-1"><Route className="size-4 text-primary" />{course.distance}km</span>
        <span className="flex items-center gap-1"><Mountain className="size-4 text-primary" />{course.elevationGain}m</span>
        <span className="flex items-center gap-1"><Timer className="size-4 text-primary" />{course.duration}</span>
      </div>
      <button
        type="button"
        onClick={onToggleBookmark}
        aria-pressed={bookmarked}
        aria-label={bookmarked ? "북마크 해제" : "북마크"}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 transition hover:text-accent"
      >
        <Bookmark className={cn("size-5", bookmarked && "fill-accent text-accent")} />
      </button>
    </div>
  );
}
