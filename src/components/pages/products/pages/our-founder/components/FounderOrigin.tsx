import { motion, useReducedMotion } from "framer-motion";

import { originStory } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderOrigin = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="origin" className="founder-section">
      <div className="founder-container">
        <SectionHeading
          title="One family. One night. One purpose."
        />

        <motion.ol
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
              },
            },
          }}
          className="founder-timeline mt-14 flex flex-col gap-6"
        >
          {originStory.map((beat, index) => (
            <motion.li
              key={beat.title}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -30,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="founder-card flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8"
            >
              <span className="founder-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="pt-1">
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#fb923c]">
                  {beat.title}
                </h3>

                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
                  {beat.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default FounderOrigin;

