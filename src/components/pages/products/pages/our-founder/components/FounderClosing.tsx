import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";

import {
  closingHook,
  closingStatement,
} from "../data/founderContent";

const FounderClosing = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-20 sm:px-8 sm:pb-36 lg:px-16">
      <div className="absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(circle_at_50%_100%,rgba(239,68,68,0.14),transparent_65%)]" />

      <motion.div
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
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="founder-container relative flex flex-col items-center text-center"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-300 shadow-[0_0_50px_rgba(251,146,60,0.12)]"
        >
          <Flame className="h-7 w-7" />
        </motion.div>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          {closingStatement}
        </p>

        <h2 className="mt-8 bg-gradient-to-r from-orange-300 via-red-400 to-orange-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl">
          {closingHook}
        </h2>

        <Link
          to="/products"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-[#fb923c] backdrop-blur-xl transition-all duration-300 hover:border-orange-400/30 hover:bg-orange-400/[0.06] hover:shadow-[0_0_45px_rgba(251,146,60,0.12)]"
        >
          Explore all Bytherix products

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
};

export default FounderClosing;