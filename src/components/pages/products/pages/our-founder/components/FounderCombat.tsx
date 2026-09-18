import { motion, useReducedMotion } from "framer-motion";

import { combatPhilosophy, weapons } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderCombat = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="combat" className="founder-section">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Combat"
          title="No guns. No robots. Just steel and skill."
          description={combatPhilosophy}
          tone="ember"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {weapons.map((weapon, index) => {
            const Icon = weapon.icon;

            return (
              <motion.div
                key={weapon.name}
                initial={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: 30 }
                }
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="founder-weapon group"
              >
                <div className="founder-weapon-plinth">
                  <span className="founder-weapon-ring" aria-hidden="true" />
                  <motion.span
                    className="founder-weapon-icon"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { rotate: 16, scale: 1.12 }
                    }
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon className="h-12 w-12" strokeWidth={1.4} />
                  </motion.span>
                </div>

                <div className="founder-weapon-body">
                  <h3 className="text-3xl font-bold text-white">{weapon.name}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">
                    {weapon.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-400/70">
                    <span className="h-px w-10 bg-orange-400/30" />
                    Traditional combat
                  </div>
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
