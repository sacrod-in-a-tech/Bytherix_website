import RobotLaptopHero from "./RobotLaptopHero";
import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
import { STATS } from "./constants/heroData";

interface HeroProps {
  docked: boolean;
}

const Hero = ({ docked }: HeroProps) => {
  return (
    <section className="relative isolate z-10 flex w-full flex-col overflow-hidden" style={{ minHeight: "100svh" }}>
      <HeroBackground />

      {/* HERO CANVAS CONTAINER */}
      <div className="homepage-container relative z-20 flex flex-col w-full flex-1 justify-between">
        {/* MAIN HERO CONTENT & ROBOT */}
        <div className="grid flex-1 w-full grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-0 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] pt-5 sm:pt-6 md:pt-7 lg:pt-8 pb-0">
          {/* LEFT — CONTENT */}
          <div className="relative z-30 flex w-full flex-col justify-start items-start">
            <div className="w-full max-w-[640px] md:max-w-[580px] lg:max-w-[640px] xl:max-w-[680px]">
              <HeroContent docked={docked} />
            </div>
          </div>

          {/* RIGHT — ROBOT */}
          <div className="relative z-20 flex w-full items-center justify-center mt-2 sm:mt-4 md:mt-0 md:min-w-0 lg:justify-end">
            <div className="relative flex w-full items-center justify-center max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[680px] xl:max-w-[800px] 2xl:max-w-[900px] origin-center">
              <RobotLaptopHero />
            </div>
          </div>
        </div>

        {/* STATS BAR — sits directly below the robot/content row */}
        <div className="relative z-40 w-full pb-4 sm:pb-5 lg:pb-6 shrink-0">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.10] bg-black/[0.25] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3 lg:px-6 lg:py-3.5 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.045),transparent)]">
            <div className="grid grid-cols-2 items-stretch divide-x divide-white/[0.07] [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-white/[0.07] lg:grid-cols-4 lg:[&>*:nth-child(n+3)]:border-t-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="group relative min-w-0 flex flex-col justify-center px-2 py-2 sm:px-3 sm:py-2 lg:px-5 transition-colors duration-300">
                  <div className="pointer-events-none absolute inset-x-2 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-cyan-400/50 via-cyan-400/20 to-transparent transition-transform duration-500 group-hover:scale-x-100 sm:origin-left" />

                  <div className="flex min-w-0 items-center gap-2 sm:gap-2.5 md:gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] ${stat.bg} text-white/90 shadow-inner sm:h-8 sm:w-8 md:h-8.5 md:w-8.5`}>
                      {stat.icon}
                    </span>

                    <div className="min-w-0 flex flex-1 flex-col">
                      <p className="text-base font-bold leading-none tracking-[-0.025em] text-white sm:text-lg md:text-xl lg:text-[1.35rem]">
                        {stat.value}
                      </p>

                      <p className="mt-0.5 text-[8px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/60 sm:text-[9px] md:text-[9.5px] lg:text-[10px] lg:tracking-[0.1em]">
                        {stat.label}
                      </p>

                      <p className="mt-0.5 text-[8.5px] leading-tight text-white/35 sm:text-[9.5px] lg:text-[10px] hidden sm:block">
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