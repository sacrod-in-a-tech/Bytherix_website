import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "ember";
}

const SectionHeading = ({

  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const reduceMotion = useReducedMotion();

  const alignClass =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";

 const titleClass = "text-[#fb923c]";

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

      <h2
        className={`text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl ${titleClass}`}
      >
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
