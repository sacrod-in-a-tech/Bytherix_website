import { motion, useReducedMotion } from "framer-motion";
import { Flame, ArrowDown } from "lucide-react";

import {
  gameSubtitle,
  gameTitle,
  heroSummary,
  heroTagline,
} from "../data/founderContent";

const FounderHero = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.75,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="founder-hero founder-section px-6 pb-20 pt-32 sm:px-8 lg:px-16">
      <div className="founder-hero-glow" aria-hidden="true" />
      <div className="founder-hero-ring" aria-hidden="true" />

      <div className="founder-container relative z-10 flex flex-col items-center text-center">

        <motion.h1
          {...fadeUp(0.08)}
          className="founder-title mt-4 max-w-6xl"
        >
          <span className="founder-title-gradient mt-4 block">
            {gameTitle}
          </span>

          <span className="founder-title-gradient mt-4 block">
            {gameSubtitle}
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          className="mt-8 max-w-3xl text-lg font-medium leading-8 text-slate-300 sm:text-xl"
        >
          {heroTagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.25)}
          className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base"
        >
          {heroSummary}
        </motion.p>

        <motion.a
          {...fadeUp(0.34)}
          href="#tragedy"
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-orange-400/30 bg-gradient-to-r from-orange-500 to-red-600 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(251,146,60,0.18)] transition-shadow hover:shadow-[0_0_65px_rgba(251,146,60,0.3)]"
        >
          <Flame className="h-5 w-5" />

          <span>Begin the story</span>

          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </motion.a>

      </div>
    </section>
  );
};

export default FounderHero;