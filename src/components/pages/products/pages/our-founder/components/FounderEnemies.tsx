import { motion, useReducedMotion } from "framer-motion";
import { Crown } from "lucide-react";

import {
  antagonist,
  enemies,
} from "../data/founderContent";

import SectionHeading from "../ui/SectionHeading";

const FounderEnemies = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Enemies that shape the world"
          title="Dangerous, and layered"
          tone="ember"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {enemies.map((enemy, index) => {
            const Icon = enemy.icon;

            return (
              <motion.div
                key={enemy.name}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 25,
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
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
                className="founder-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="founder-icon h-12 w-12 rounded-xl">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    Enemy 0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  {enemy.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {enemy.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 35,
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
            duration: 0.75,
          }}
          className="founder-card relative mt-8 overflow-hidden border-red-500/25 bg-gradient-to-br from-red-950/50 via-slate-950/70 to-slate-950/60 p-8 sm:p-12"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-[100px]" />

          <div className="relative">
            <span className="founder-icon border-red-400/25 bg-red-400/10 text-red-300">
              <Crown className="h-6 w-6" />
            </span>

            <span className="mt-7 block text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              The central threat
            </span>

            <h3 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {antagonist.name}
            </h3>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-400 sm:text-lg">
              {antagonist.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderEnemies;