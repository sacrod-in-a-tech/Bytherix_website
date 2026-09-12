import { motion, useReducedMotion } from "framer-motion";

import {
  missionStructure,
  worldSummary,
} from "../data/founderContent";

import SectionHeading from "../ui/SectionHeading";

const FounderWorld = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section">
      <div className="founder-container">
        <SectionHeading
          eyebrow="A journey across a living world"
          title="One map opens into many"
          description={worldSummary}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {missionStructure.map((mission, index) => {
            const Icon = mission.icon;

            return (
              <motion.div
                key={mission.label}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                      }
                }
                className="founder-card p-7 sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="founder-icon">
                    <Icon className="h-6 w-6" />
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-8 flex items-end gap-3">
                  <span className="text-6xl font-black tracking-[-0.05em] text-white">
                    {mission.count}
                  </span>

                  <span className="pb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
                    {mission.label}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {mission.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FounderWorld;