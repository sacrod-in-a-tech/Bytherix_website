import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductItem } from "../data/product.data";

interface ProductCardProps {
  product: ProductItem;
  index: number;
  featuredLayout?: boolean;
}

const accentStyles = {
  blue: {
    text: "text-[#0084BD] dark:text-[#00AEEF]",
    chip: "border-[#00AEEF]/30 bg-[#00AEEF]/10 text-[#0084BD] dark:text-[#00AEEF]",
    border: "hover:border-[#00AEEF]/40",
  },

  green: {
    text: "text-[#0C8F6A] dark:text-[#20C997]",
    chip: "border-[#20C997]/30 bg-[#20C997]/10 text-[#0C8F6A] dark:text-[#20C997]",
    border: "hover:border-[#20C997]/40",
  },

  red: {
    text: "text-[#D92D20] dark:text-[#FF3B30]",
    chip: "border-[#FF3B30]/30 bg-[#FF3B30]/10 text-[#D92D20] dark:text-[#FF3B30]",
    border: "hover:border-[#FF3B30]/40",
  },
};

const neutralChip =
  "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400";

export default function ProductCard({
  product,
  index,
  featuredLayout = false,
}: ProductCardProps) {
  const accent = accentStyles[product.accent];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
      }}
      whileHover={{ y: -5 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition-[border-color,box-shadow] duration-500 hover:shadow-xl hover:shadow-slate-300/40 dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none dark:hover:shadow-black/30 ${accent.border}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-white/[0.07] dark:from-white/[0.035] dark:to-white/[0.015]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.1 + index * 0.07,
          }}
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={`${product.name} preview`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:p-4"
          />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500 dark:border-white/[0.07]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <Link
            to={product.href}
            className={`inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors ${accent.text}`}
          >
            <span>{product.action}</span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}