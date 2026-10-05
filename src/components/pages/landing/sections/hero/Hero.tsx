import RobotLaptopHero from "./RobotLaptopHero";
import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
import { STATS } from "./constants/heroData";

interface HeroProps {
  docked: boolean;
}

const Hero = ({ docked }: HeroProps) => {
  return (
    <section className="relative isolate z-10 flex min-h-screen w-full flex-col pt-3 sm:pt-5 lg:pt-6">
      <HeroBackground />

      {/* HERO CANVAS */}
      <div className="homepage-container relative z-20 flex flex-1 flex-col justify-between w-full">
        {/* MAIN HERO */}
        <div className="relative my-auto grid w-full items-center grid-cols-1 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-0 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] py-4 sm:py-6">
          {/* LEFT — CONTENT */}
          <div className="relative z-30 flex w-full justify-center md:justify-start lg:justify-start">
            <div className="w-full max-w-[680px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[720px]">
              <HeroContent docked={docked} />
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="relative z-20 flex w-full items-center justify-center mt-6 sm:mt-8 md:mt-0 md:min-w-0 lg:justify-end">
            <div className="relative flex w-full items-center justify-center max-w-[320px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[540px] xl:max-w-[640px] origin-center">
              <RobotLaptopHero />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative z-40 w-full mt-auto pt-4 pb-7 sm:pb-9 lg:pb-10">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.10] bg-black/[0.20] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-4 lg:px-6 lg:py-4 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.045),transparent)]">
            <div className="grid grid-cols-2 items-stretch divide-x divide-white/[0.07] [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-white/[0.07] lg:grid-cols-4 lg:[&>*:nth-child(n+3)]:border-t-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="group relative min-w-0 flex flex-col justify-center px-3 py-3 sm:px-4 sm:py-2 lg:px-6 transition-colors duration-300">
                  <div className="pointer-events-none absolute inset-x-2 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-cyan-400/50 via-cyan-400/20 to-transparent transition-transform duration-500 group-hover:scale-x-100 sm:origin-left" />

                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 md:gap-3.5">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] ${stat.bg} text-white/90 shadow-inner sm:h-8 sm:w-8 md:h-9 md:w-9`}>
                      {stat.icon}
                    </span>

                    <div className="min-w-0 flex flex-1 flex-col">
                      <p className="text-lg font-bold leading-none tracking-[-0.025em] text-white sm:text-xl md:text-2xl lg:text-[1.5rem]">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[8px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/60 sm:text-[9px] md:text-[10px] lg:text-xs lg:tracking-[0.1em]">
                        {stat.label}
                      </p>

                      <p className="mt-1 text-[9px] leading-relaxed text-white/35 sm:text-[10px] lg:text-[11px]">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;