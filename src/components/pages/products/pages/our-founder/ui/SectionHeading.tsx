import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "ember";
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: SectionHeadingProps) => {
  const reduceMotion = useReducedMotion();

  const alignClass =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

  const eyebrowClass =
    tone === "ember"
      ? "text-orange-400"
      : "text-cyan-400";

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`founder-heading flex max-w-3xl flex-col gap-4 ${alignClass}`}
    >
      <span className={`founder-eyebrow ${eyebrowClass}`}>
        {eyebrow}
      </span>

      <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      <div className="founder-heading-line" />

      {description && (
        <p className="max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;