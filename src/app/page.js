import { HeroAurora } from "@/components/01_homepage/hero";
import GoruCarousel from "@/components/01_homepage/GoruCarousel";
import { StatsCards } from "@/components/01_homepage/stats-cards";
import AnimalProvider from "@/context/AnimalProvider";
import { qTips } from "@/providers/api";

export default async function Home() {
  const tips = await qTips();
  const priorityOrder = {
    Essential: 0,
    High: 1,
    Recommended: 2,
    Sunnah: 3,
  };
  const items = tips
    .slice()
    .sort(
      (a, b) =>
        (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9),
    )
    .map((tip) => ({
    id: String(tip.id ?? tip.title),
    title: tip.title,
    description: tip.description,
    priority: tip.priority,
    tags: [tip.category, tip.icon].filter(Boolean),
    }));
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-12 bg-background/50 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-24">
      <HeroAurora />
      <GoruCarousel className="" items={items} />
      <AnimalProvider>
        <StatsCards />
      </AnimalProvider>
    </div>
  );
}
