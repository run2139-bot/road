"use client";

import { useMemo, useState } from "react";
import { Bike, Search } from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";
import CourseCard from "@/components/CourseCard";
import CourseModal from "@/components/CourseModal";
import { useBookmarks } from "@/hooks/useBookmarks";
import { categories, courses, difficulties, type Category, type Difficulty } from "@/lib/courses";
import { cn } from "@/lib/utils";

const MAX_DISTANCE = Math.max(...courses.map((c) => c.distance));

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition",
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-slate-700 text-slate-400 hover:border-slate-500",
      )}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [maxDistance, setMaxDistance] = useState(MAX_DISTANCE);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { bookmarks, toggle } = useBookmarks();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (!q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)) &&
        (!difficulty || c.difficulty === difficulty) &&
        (!category || c.category === category) &&
        c.distance <= maxDistance &&
        (!onlyBookmarks || bookmarks.includes(c.id)),
    );
  }, [query, difficulty, category, maxDistance, onlyBookmarks, bookmarks]);

  const selected = courses.find((c) => c.id === selectedId) ?? null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <header className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-widest text-primary">
            <Bike className="size-5" /> BUSAN ROAD CYCLING
          </p>
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl">
            부산 로드바이크
            <br />
            라이딩 코스 추천
          </h1>
          <p className="mt-4 max-w-md text-slate-400">
            바다, 업힐, 강변까지. 오늘의 바람과 컨디션에 맞는 부산 코스를 골라보세요.
          </p>
        </div>
        <WeatherWidget />
      </header>

      <section aria-label="필터" className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="코스명 또는 지역 검색"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-slate-500">난이도</span>
          {difficulties.map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(difficulty === d ? null : d)}>{d}</Chip>
          ))}
          <span className="ml-3 mr-1 text-xs text-slate-500">카테고리</span>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)}>{c}</Chip>
          ))}
          <span className="ml-3" />
          <Chip active={onlyBookmarks} onClick={() => setOnlyBookmarks((v) => !v)}>
            북마크만 ({bookmarks.length})
          </Chip>
        </div>
        <label className="flex items-center gap-4 text-sm">
          <span className="whitespace-nowrap text-slate-400">
            최대 거리 <b className="text-primary">{maxDistance}km</b>
          </span>
          <input
            type="range"
            min={10}
            max={MAX_DISTANCE}
            step={1}
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </section>

      <section className="mt-8">
        <p className="mb-4 text-sm text-slate-400">{filtered.length}개의 코스</p>
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-700 py-16 text-center text-slate-500">
            조건에 맞는 코스가 없어요.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                bookmarked={bookmarks.includes(c.id)}
                onOpen={() => setSelectedId(c.id)}
                onToggleBookmark={() => toggle(c.id)}
              />
            ))}
          </div>
        )}
      </section>

      {selected && (
        <CourseModal
          course={selected}
          bookmarked={bookmarks.includes(selected.id)}
          onClose={() => setSelectedId(null)}
          onToggleBookmark={() => toggle(selected.id)}
        />
      )}
    </main>
  );
}
