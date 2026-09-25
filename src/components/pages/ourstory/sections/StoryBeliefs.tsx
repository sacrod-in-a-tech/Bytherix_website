"use client";

import { motion, type Variants } from "framer-motion";
import { Globe2, Sparkles, Target, Rocket } from "lucide-react";

const BELIEFS = [
  { title: "Technology for Everyone", description: "Technology should not only belong to people who can afford expensive solutions.", icon: Globe2 },
  { title: "Quality Matters", description: "Build high-quality technology that is accessible and affordable.", icon: Sparkles },
  { title: "Real Opportunities", description: "Give young people opportunities to work on real problems and real projects.", icon: Target },
  { title: "Learning Without Fear", description: "Create an environment where people can learn without being afraid of failure.", icon: Rocket },
];

const MANIFESTO = ["Crazy ideas", "Good friends", "Courage to start", "Willingness to keep going"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const StoryBeliefs = () => {
  return (
    <section className="relative bg-[var(--bg-primary)] px-4 py-6 sm:px-6 md:px-10 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-l from-[var(--accent-green)]/10 to-transparent blur-3xl sm:h-64 sm:w-64 md:h-80 md:w-80" />

      <div className="relative z-10 mx-auto max-w-8xl">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-6 sm:space-y-7 md:space-y-10">
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
             <h2 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">What we believe</h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] sm:text-base md:text-lg">These core beliefs have guided every decision from day one and continue to shape Bytherix Technology.</p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
            {BELIEFS.map((belief) => {
              const Icon = belief.icon;
              return (
                <motion.div key={belief.title} variants={itemVariants} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 transition-all duration-300 hover:border-[var(--accent-green)]/50 hover:shadow-lg sm:p-6 md:p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-green)]/5 to-[var(--accent-blue)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="inline-flex rounded-xl bg-[var(--accent-green)]/10 p-2.5 text-[var(--accent-green)] sm:p-3">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-base font-bold leading-tight sm:text-lg md:text-xl">{belief.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">{belief.description}</p>
                  </div>
                  <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)]" />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="relative rounded-2xl border-2 border-[var(--accent-green)] bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-primary)] px-4 py-8 sm:px-6 sm:py-10 md:px-12 md:py-16">
            <div className="absolute right-0 top-0 -m-1 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2 border-[var(--accent-green)]/30 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <div className="absolute bottom-0 left-0 -m-1 h-8 w-8 rounded-tr-2xl border-r-2 border-t-2 border-[var(--accent-green)]/30 sm:h-10 sm:w-10 md:h-12 md:w-12" />

            <div className="relative space-y-3 text-center sm:space-y-4 md:space-y-6">
              
              <p className="text-lg font-bold leading-tight sm:text-xl md:text-2xl lg:text-3xl">Sometimes, all you need is:</p>
              <div className="grid grid-cols-2 gap-2 pt-3 sm:gap-3 sm:pt-4 md:gap-4 lg:grid-cols-4">
                {MANIFESTO.map((item, idx) => (
                  <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }} className="rounded-lg bg-[var(--bg-primary)] px-2 py-2 text-xs font-semibold text-[var(--accent-green)] sm:px-3 sm:text-sm">
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryBeliefs;