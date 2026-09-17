import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";

import { companionSummary } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderCompanion = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section">
      <div className="founder-container grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  scale: 0.8,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scale: 1,
                }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.04] shadow-[0_0_100px_rgba(34,211,238,0.08)] sm:h-80 sm:w-80"
        >
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-5 rounded-full border border-dashed border-cyan-400/20"
          />

          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_50px_rgba(34,211,238,0.12)]">
            <Users className="h-14 w-14 text-cyan-300" />
          </div>
        </motion.div>

        <div>
          <SectionHeading
            title="He's not completely alone"

          />

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            {companionSummary}
          </p>

          <div className="mt-8 flex items-center gap-3 text-l font-semibold uppercase tracking-[0.18em] text-[#fb923c]">
            <span className="h-px w-25 bg-[#fb923c] " />
            Guidance • Combat • Truth
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderCompanion;