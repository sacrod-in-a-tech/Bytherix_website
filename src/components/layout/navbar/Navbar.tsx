import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarBrand from "./NavbarBrand";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";

export interface NavbarProps {
  docked: boolean;
}

const Navbar = ({ docked }: NavbarProps) => {
  const introPlayedRef = useRef(false);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  /* =========================
     CLOSE ALL NAVIGATION STATES
  ========================== */
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setHoveredNavItem(null);
    setMobileSearchOpen(false);
  };

  /* =========================
     NAVIGATION
  ========================== */
  const navigateTo = (path: string) => {
    navigate(path);
    closeMenu();
  };

  /* =========================
     SCROLL TO SECTION
  ========================== */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  /* =========================
     DROPDOWN ITEM CLICK
  ========================== */
  const handleDropdownItemClick = (item: string) => {
    const pageMap: Record<string, string> = {
      "About Company": "/about-company",
      "Our Team": "/our-team",
      "Our Story": "/our-story",
      "Blogs & Articles": "/blogs",
      Founder: "/products/our-founder",
      "One For All Management System": "/products/one-for-all",
      "PAM": "/products/pam",
      "All Products": "/shop",
      "Digital Products": "/shop",
      Software: "/shop",
    };

    const pagePath = pageMap[item];

    if (pagePath) {
      navigateTo(pagePath);
      return;
    }

    // In-page hash sections — navigate to /#sectionId so ScrollHandler picks it up
    const sectionMap: Record<string, string> = {
      Testimonials: "testimonials",
      "Contact Us": "contact",
      "Our Services": "services",
      Courses: "courses",
      "Featured Courses": "courses",
      Certifications: "courses",
      "Teach on Bytherix": "contact",
      "Get a Quote": "contact",
    };

    const sectionId = sectionMap[item];

    if (!sectionId) {
      closeMenu();
      return;
    }

    // If already on home, just scroll directly
    if (window.location.pathname === "/") {
      scrollToSection(sectionId);
      closeMenu();
      return;
    }

    // Navigate to home with hash — ScrollHandler will scroll once home mounts
    navigate(`/#${sectionId}`);
    closeMenu();
  };

  /* =========================
     MAIN NAV ITEM CLICK
  ========================== */
  const handleNavItemClick = (item: string) => {
    const pageMap: Record<string, string> = {
      Portfolios: "/portfolios",
      Shop: "/shop",
      Products: "/products",
      "Our Story": "/our-story",
      Blogs: "/blogs",
    };

    const pagePath = pageMap[item];

    if (pagePath) {
      navigateTo(pagePath);
      return;
    }

    const sectionMap: Record<string, string> = {
      Contact: "contact",
    };

    const sectionId = sectionMap[item];

    if (!sectionId) {
      return;
    }

    if (window.location.pathname === "/") {
      scrollToSection(sectionId);
      closeMenu();
      return;
    }

    navigate(`/#${sectionId}`);
    closeMenu();
  };

  /* =========================
     LOGO CLICK
  ========================== */
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo("/");
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-[100]
          w-full
          bg-[#050814]/90
          backdrop-blur-md
          px-3
          py-2
          sm:px-4
          sm:py-2.5
          lg:px-5
          lg:py-3
          xl:px-6
        "
        style={{
          opacity: docked ? 1 : 0,
          transition: "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseLeave={() => {
          setActiveDropdown(null);
          setHoveredNavItem(null);
        }}
      >
        <div
          className="
            relative
            mx-auto
            flex
            min-h-[54px]
            w-full
            max-w-[1600px]
            items-center
            rounded-[20px]
            border
            border-white/[0.16]
            bg-[#080F29]
            px-4
            shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_25px_rgba(0,0,0,0.35)]
            sm:min-h-[58px]
            sm:px-5
            lg:min-h-[62px]
            lg:rounded-[22px]
            lg:px-6
            xl:min-h-[64px]
            xl:px-7
          "
        >
          {/* Inner border */}
          <div
            className="
              pointer-events-none
              absolute
              inset-[1px]
              rounded-[19px]
              border
              border-white/[0.035]
              sm:rounded-[21px]
              lg:rounded-[21px]
            "
          />

          {/* =========================
              LOGO
          ========================== */}
          <NavbarBrand
            docked={docked}
            introPlayedRef={introPlayedRef}
            onLogoClick={handleLogoClick}
          />

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <DesktopNavigation
            docked={docked}
            activeDropdown={activeDropdown}
            hoveredNavItem={hoveredNavItem}
            setActiveDropdown={setActiveDropdown}
            setHoveredNavItem={setHoveredNavItem}
            navigateTo={navigateTo}
            handleDropdownItemClick={handleDropdownItemClick}
            handleNavItemClick={handleNavItemClick}
          />

          {/* =========================
              MOBILE NAVIGATION
          ========================== */}
          <div
            className="
              relative
              z-[150]
              ml-auto
              flex
              shrink-0
              items-center
              lg:hidden
            "
          >
            <MobileNavigation
              docked={true}
              mobileMenuOpen={mobileMenuOpen}
              mobileSearchOpen={mobileSearchOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              setMobileSearchOpen={setMobileSearchOpen}
              closeMenu={closeMenu}
              handleDropdownItemClick={handleDropdownItemClick}
              handleNavItemClick={handleNavItemClick}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;