import Card from "@/components/common/Card/Card";
import Image from "next/image";

export const metadata = {
  title: "About",
  description: "About the ForestBlog project and architecture.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      <section className="grid items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">Our story</p><h1 className="mt-3 text-5xl font-bold tracking-[-0.05em] text-forest-950 dark:text-forest-50">A journal for people who keep looking.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-forest-800/75 dark:text-forest-100/70">ForestBlog makes room for the ideas that deserve more than a fleeting glance—clear thinking, useful craft, and the everyday details that shape a considered life.</p></div><div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]"><Image src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85" alt="A peaceful forest path" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div></section>
      <section className="grid gap-5 md:grid-cols-3">{[["Quality content", "A focused collection that values depth, context, and a well-made argument."],["Community driven", "A welcoming space for readers and contributors to keep the conversation moving."],["Always growing", "New notes and practical perspectives added as the collection evolves."]].map(([title, copy], index) => <Card key={title} className="space-y-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-forest-100 text-sm font-bold text-forest-700">0{index + 1}</span><h2 className="text-xl font-bold tracking-[-0.025em] text-forest-950 dark:text-forest-50">{title}</h2><p className="text-sm leading-6 text-forest-800/70 dark:text-forest-100/70">{copy}</p></Card>)}</section>
    </div>
  );
}
