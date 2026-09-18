import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";

import { elements, elementsSummary } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderElements = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="powers" className="founder-section overflow-hidden">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Elemental power system"
          title="Power is earned, not given"
          description={elementsSummary}
          align="center"
          tone="ember"
        />

        <div className="founder-power-rail relative mx-auto mt-16 flex max-w-4xl flex-col items-center gap-0 md:flex-row md:justify-center">
          {elements.map((element, index) => {
            const Icon = element.icon;
            const unlocked = element.status === "unlocked";

            return (
              <div
                key={element.name}
                className="founder-power-node-wrap flex w-full flex-col items-center md:w-auto"
              >
                <motion.div
                  initial={
                    reduceMotion ? undefined : { opacity: 0, scale: 0.9 }
                  }
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className={`founder-power-node ${
                    unlocked ? "founder-power-node-unlocked" : "founder-power-node-locked"
                  }`}
                >
                  {unlocked && (
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [0.2, 0.55, 0.2], scale: [1, 1.1, 1] }
                      }
                      transition={{ duration: 3, repeat: Infinity }}
                      className="founder-power-glow"
                    />
                  )}

                  <span className="founder-power-icon">
                    {unlocked ? (
                      <Icon className="h-8 w-8" />
                    ) : (
                      <Lock className="h-6 w-6" />
                    )}
                  </span>

                  <span className="founder-power-status">
                    {unlocked ? "Unlocked" : "Locked"}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {element.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {element.meaning}
                  </p>
                </motion.div>

                {index < elements.length - 1 && (
                  <motion.div
                    initial={reduceMotion ? undefined : { scaleX: 0 }}
                    whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="founder-power-link"
                    aria-hidden="true"
                  />
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
