import Card from "@/components/common/Card/Card";
import Image from "next/image";

export const metadata = {
  title: "About",
  description: "About the ForestBlog project, editorial philosophy, and architecture.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Depth Over Noise",
      copy: "A focused collection that values sustained thought, clear context, and well-made arguments over click-driven superficiality.",
      color: "border-t-amber-500",
      chip: "Editorial Focus",
      chipColor: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
    },
    {
      title: "Community of Thinkers",
      copy: "A welcoming, quiet space for readers and contributors to share notes, build on ideas, and advance the conversation.",
      color: "border-t-ocean-500",
      chip: "Open Dialogue",
      chipColor: "bg-ocean-100 text-ocean-900 dark:bg-ocean-950 dark:text-ocean-200",
    },
    {
      title: "Engineered for Readers",
      copy: "Built with soft neomorphic tactility, high contrast, mobile speed optimization, and zero layout shift on all devices.",
      color: "border-t-violet-500",
      chip: "Technical Craft",
      chipColor: "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-200",
    },
  ];

  return (
    <div className="space-y-16 py-4 sm:py-8">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest-100/90 px-3.5 py-1 text-xs font-semibold text-forest-800 dark:bg-forest-900/60 dark:text-forest-200">
            <span>Our Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-[-0.04em] text-forest-950 dark:text-forest-50 leading-[1.1]">
            A journal for people who keep looking.
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-forest-800/80 dark:text-forest-100/75">
            ForestBlog makes room for the ideas that deserve more than a fleeting glance—clear thinking, practical craft, and the quiet observations that shape a considered life.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-3xl neu-flat p-2 border border-white/80 dark:border-forest-800/40">
          <div className="relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden rounded-2xl bg-forest-900/10">
            <Image
              src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=75"
              alt="A peaceful path winding through a sunlit pine forest"
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 94vw, (max-width: 1024px) 48vw, 520px"
              className="object-cover gpu-layer"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {pillars.map(({ title, copy, color, chip, chipColor }) => (
          <Card
            key={title}
            variant="flat"
            className={`space-y-3 border-t-2 ${color} border-white/70 dark:border-forest-800/40 p-6`}
          >
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${chipColor}`}>
              {chip}
            </span>
            <h2 className="text-xl font-bold tracking-tight text-forest-950 dark:text-forest-50">
              {title}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-forest-800/75 dark:text-forest-100/70">
              {copy}
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
