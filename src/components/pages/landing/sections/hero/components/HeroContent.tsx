import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import SocialProof from "./SocialProof";

interface HeroContentProps {
  docked: boolean;
}

const ROTATING_WORDS = [
  "Web Applications",
  "AI Solutions",
  "Cybersecurity",
  "IoT Systems",
  "Robotics",
  "PCB Design",
  "Mobile Apps",
  "Smart Tools",
];

const HeroContent = ({ docked }: HeroContentProps) => {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rotator = rotatorRef.current;

    if (!rotator) return;

    const words = gsap.utils.toArray<HTMLElement>(
      ".hero-rotating-word",
      rotator
    );

    if (!words.length) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(words, {
        opacity: 0,
        y: 28,
        filter: "blur(6px)",
      });

      // First word
      gsap.set(words[0], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      // Rotating words timeline
      const timeline = gsap.timeline({
        repeat: -1,
        paused: true,
      });

      words.forEach((word, index) => {
        const nextWord = words[(index + 1) % words.length];

        timeline
          // Hold current word
          .to({}, {
            duration: 1,
          })

          // Exit current word
          .to(word, {
            opacity: 0,
            y: -24,
            filter: "blur(5px)",
            duration: 0.9,
            ease: "power2.inOut",
          })

          // Prepare next word
          .set(nextWord, {
            opacity: 0,
            y: 26,
            filter: "blur(6px)",
          })

          // Enter next word
          .to(nextWord, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          });
      });

      timeline.play();

      return () => {
        timeline.kill();
      };
    }, rotator);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="
        relative
        z-20
        w-full
        max-w-[620px]
        mx-auto
        lg:mx-0
        text-center
        lg:text-left
      "
      style={{
        opacity: docked ? 1 : 0,
        transform: docked ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Heading */}
      <div>
        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[4.5rem]
            xl:text-[5.1rem]
            font-extrabold
            leading-[0.92]
            tracking-[-0.045em]
            text-white
          "
        >
          We Build
        </h1>

        {/* Rotating Words */}
        <div
          ref={rotatorRef}
          className="
            relative
            mt-0
            sm:-mt-1
            lg:-mt-2
            block
            w-full
            overflow-visible
            text-left
          "
        >
          {/* Sizer span to reserve width/height based on longest rotating phrase */}
          <span
            aria-hidden="true"
            className="
              invisible
              block
              whitespace-nowrap
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-[4.5rem]
              xl:text-[5.1rem]
              font-extrabold
              leading-[0.92]
              tracking-[-0.04em]
              px-0.5
            "
          >
            Web Applications
          </span>

          {ROTATING_WORDS.map((word) => (
            <span
              key={word}
              className="
                hero-rotating-word
                absolute
                inset-0
                whitespace-nowrap
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-[4.5rem]
                xl:text-[5.1rem]
                font-extrabold
                leading-[0.92]
                tracking-[-0.04em]
                bg-linear-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent
                will-change-transform
                px-0.5
              "
              style={{
                textShadow: "0 0 35px rgba(56,189,248,0.15)",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        className="
          mt-4
          sm:mt-5
          max-w-[520px]
          mx-auto
          lg:mx-0
          px-1
          sm:px-0
          text-xs
          sm:text-sm
          md:text-[15px]
          leading-[1.65]
          text-white/60
        "
      >
        We design and engineer modern digital products,
        intelligent systems, and connected experiences —
        from web and mobile platforms to AI, IoT, robotics,
        and custom hardware.
      </p>

      {/* Social Proof & CTAs */}
      <div className="mt-4 sm:mt-5">
        <SocialProof />
      </div>
    </div>
  );
};

export default HeroContent;