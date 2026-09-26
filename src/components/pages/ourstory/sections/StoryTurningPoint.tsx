"use client";
 
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react"; // 💡 Replaced plain text checkmark with a vector icon
 
const PHILOSOPHY = [
  "Affordable prices",
  "Low cost",
  "High quality",
  "Because quality matters"
];
 
 
const StoryTurningPoint = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] px-4  sm:ppy-7x-10 sm:py-7 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--accent-green)]/5 to-[var(--accent-blue)]/5 blur-3xl sm:h-96 sm:w-96" />
      <div className="mx-auto max-w-8xl">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
          className="space-y-10 text-center sm:space-y-16"
        >
 
          {/* <div className="flex justify-center">
            <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] sm:w-12"
            />
          </div> */}
 
          {/* Heading + paragraph now left-aligned, starting flush with the left edge of the container */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3 text-left sm:space-y-5"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              One conversation at the tea stall
              <span className="mt-2 block bg-gradient-to-r from-[var(--accent-green)] via-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">
                changed everything.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              One day, while they were sitting at the tea stall, they heard someone talking about how much money they had paid to build their dream website. They were shocked. The amount was almost double what they believed the project should have cost.
            </p>
          </motion.div>
 
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl border border-[var(--accent-green)]/20 bg-[var(--surface-secondary)]/50 px-3 py-8 sm:px-12 sm:py-7"
          >
 
            <p className="text-xl font-bold leading-tight text-[var(--accent-green)] sm:text-3xl lg:text-4xl">
              "Why don't we start something of our own?"
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 gap-3 pt-3 xs:grid-cols-2 sm:gap-4 sm:pt-3 lg:grid-cols-4"
          >
            {PHILOSOPHY.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
                whileHover={{ y: -4, borderColor: "var(--accent-green)" }}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-5 text-center transition-colors duration-300"
              >
                <div className="text-[var(--accent-green)]">
                  <CheckCircle2 size={22} className="sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs font-semibold leading-snug text-[var(--text-secondary)] sm:text-sm">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default StoryTurningPoint;