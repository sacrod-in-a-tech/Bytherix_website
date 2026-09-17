import { motion, useReducedMotion } from "framer-motion";

import {
  elements,
  elementsSummary,
} from "../data/founderContent";

import SectionHeading from "../ui/SectionHeading";

const FounderElements = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section overflow-hidden">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Elemental power system"
          title="Power is earned, not given"
          description={elementsSummary}
          align="center"
          tone="ember"
        />

        <div className="relative mx-auto mt-16 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:items-stretch md:justify-center">
          {elements.map((element, index) => {
            const Icon = element.icon;
            const unlocked = element.status === "unlocked";

            return (
              <div
                key={element.name}
                className="flex w-full items-center md:w-auto"
              >
                <motion.div
                  initial={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          scale: 0.9,
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
                    duration: 0.7,
                    delay: index * 0.18,
                  }}
                  className={`founder-card relative w-full p-7 text-center md:w-[330px] ${
                    unlocked
                      ? "border-orange-400/30 bg-orange-500/[0.06]"
                      : "opacity-70"
                  }`}
                >
                  {unlocked && (
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.2, 0.5, 0.2],
                              scale: [1, 1.08, 1],
                            }
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"
                    />
                  )}

                  <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/25 bg-orange-400/10 text-orange-300">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="relative mt-4 text-2xl font-bold text-white">
                    {element.name}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-slate-400">
                    {element.meaning}
                  </p>
                </motion.div>

                {index < elements.length - 1 && (
                  <div className="mx-3 hidden h-px w-16 bg-gradient-to-r from-orange-400/50 to-red-400/20 md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FounderElements;