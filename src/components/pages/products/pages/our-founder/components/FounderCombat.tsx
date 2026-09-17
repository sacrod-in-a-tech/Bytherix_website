import { motion, useReducedMotion } from "framer-motion";

import {
  combatPhilosophy,
  weapons,
} from "../data/founderContent";

import SectionHeading from "../ui/SectionHeading";

const FounderCombat = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section">
      <div className="founder-container">
        <SectionHeading
          title="No guns. No robots. Just steel and skill."
          description={combatPhilosophy}
          tone="ember"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {weapons.map((weapon, index) => {
            const Icon = weapon.icon;

            return (
              <motion.div
                key={weapon.name}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.96,
                        y: 25,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        rotateX: 2,
                      }
                }
                className="founder-card group p-8 sm:p-10"
              >
                <div className="absolute right-8 top-8 text-7xl font-black text-white/[0.025]">
                  0{index + 1}
                </div>

                <span className="founder-icon">
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="mt-7 text-3xl font-bold text-white">
                  {weapon.name}
                </h3>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">
                  {weapon.description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400/70">
                  <span className="h-px w-10 bg-orange-400/30" />
                  Traditional combat
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FounderCombat;