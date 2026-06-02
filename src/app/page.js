import { HeroAurora } from "@/components/01_homepage/hero";
import GoruCarousel from "@/components/01_homepage/GoruCarousel";
import { StatsCards } from "@/components/01_homepage/stats-cards";
import AnimalProvider from "@/context/AnimalProvider";

export default function Home() {
  const items = [
    { id: "g1", title: "Goru 1", description: "Strong and healthy", tag: "Prime" },
    { id: "g2", title: "Goru 2", description: "Young and fit", tag: "Young" },
    { id: "g3", title: "Goru 3", description: "Well-fed", tag: "Available" },
    { id: "g4", title: "Goru 4", description: "Young and fit", tag: "Young" },
    { id: "g5", title: "Goru 5", description: "Well-fed", tag: "Available" },
    { id: "g6", title: "Goru 6", description: "Well-fed", tag: "Available" },
    { id: "g7", title: "Goru 7", description: "Well-fed", tag: "Available" },
    { id: "g8", title: "Goru 8", description: "Well-fed", tag: "Available" },
    { id: "g9", title: "Goru 9", description: "Well-fed", tag: "Available" },
    ];
  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center gap-10 bg-background/50 py-10 px-25">
      <HeroAurora />
      <GoruCarousel className="" items={items}/>
      <AnimalProvider>
        <StatsCards />
      </AnimalProvider>
    </div>
  );
}
