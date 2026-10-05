import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "./components/layout/navbar/Navbar";
import { INTRO_TOTAL_MS } from "./components/layout/navbar/constants/navbar.constants";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ThemeToggle from "./components/ui/ThemeToggle";
import TeamProfile from "./components/pages/team/pages/TeamProfile";

import logoImg from "./assets/logo.png";
import robotLaptopGif from "./assets/robot_blink_full.gif";

// ─── Preloadable lazy imports ──────────────────────────────────────────────────

const loadHome = () => import("./components/pages/landing/Home");
const Home = lazy(loadHome);

const OurTeam = lazy(
  () => import("./components/pages/team/Team")
);

const Shop = lazy(
  () => import("./components/pages/shop/ShopPage")
);

const OurProducts = lazy(
  () => import("./components/pages/products/ProductsPage")
);

const OurFounder = lazy(
  () => import("./components/pages/products/pages/our-founder/OurFounderPage")
);

const OneForAll = lazy(
  () => import("./components/pages/products/pages/one-for-all/OneForAllPage")
);

const PAM = lazy(
  () => import("./components/pages/products/pages/PAM/PAMPage")
);

const OurPortfolios = lazy(
  () => import("./components/pages/portfolios/PortfolioPage")
);

const OurStoryPage = lazy(
  () => import("./components/pages/ourstory/OurStoryPage")
);

const BlogsPage = lazy(
  () => import("./components/pages/blogs/BlogsPage")
);

const BlogArticle = lazy(
  () => import("./components/pages/blogs/pages/BlogArticle")
);

const LoginPage = lazy(
  () => import("./pages/auth/LoginPage")
);

const RegisterPage = lazy(
  () => import("./pages/auth/RegisterPage")
);

const AboutCompany = lazy(
  () => import("./components/pages/aboutcompany/AboutCompanyPage")
);

// ─── Image decode helper ──────────────────────────────────────────────────────

function decodeImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      if ("decode" in img) {
        img.decode().then(resolve).catch(resolve);
      } else {
        resolve();
      }
    } else {
      img.onload = () => {
        if ("decode" in img) {
          img.decode().then(resolve).catch(resolve);
        } else {
          resolve();
        }
      };
      img.onerror = () => resolve();
    }
  });
}

// ─── Splash guard (once per browser session) ─────────────────────────────────

const SPLASH_KEY = "bytherix_splash_shown";

// ─── Route helpers ────────────────────────────────────────────────────────────

/**
 * Routes that render as dedicated, full-viewport experiences with no site
 * chrome (navbar / theme toggle). Auth pages own their entire screen.
 */
const CHROMELESS_ROUTES = ["/login", "/register"];

function TeamProfileRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <TeamProfile
      slug={slug ?? ""}
      onBack={() => navigate("/our-team")}
    />
  );
}

// ─── Scroll behaviour ─────────────────────────────────────────────────────────

/**
 * On every navigation:
 *  • If the URL has a hash, scroll to that element (e.g. /#services).
 *  • Otherwise scroll to the top of the page.
 *
 * Placed inside the Layout so it runs after the new page mounts.
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the new page a tick to paint before scrolling.
      const id = hash.slice(1);
      const attempt = (tries: number) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries > 0) {
          requestAnimationFrame(() => attempt(tries - 1));
        }
      };
      attempt(20);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}

// ─── Persistent Layout (Navbar + Outlet) ─────────────────────────────────────

interface LayoutProps {
  docked: boolean;
}

function Layout({ docked }: LayoutProps) {
  const { pathname } = useLocation();
  const isChromeless = CHROMELESS_ROUTES.includes(pathname);

  return (
    <>
      <ScrollHandler />

      {!isChromeless && (
        <>
          <ThemeToggle />
          {/*
            Navbar stays mounted while pages change,
            so its intro animation does not restart on navigation.
          */}
          <Navbar docked={docked} />
        </>
      )}

      {/*
        Suspense here means the old page stays visible until the new
        lazy chunk is ready — no blank flash between routes.
      */}
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

// ─── Router factory ───────────────────────────────────────────────────────────

/**
 * Build the router each render so Layout receives the up-to-date `docked`
 * prop. `createBrowserRouter` is stable with respect to matching — only the
 * element instances update when docked changes.
 */
function createAppRouter(docked: boolean) {
  return createBrowserRouter([
    {
      element: <Layout docked={docked} />,
      children: [
        // Home
        { path: "/", element: <Home docked={docked} /> },

        // About Company
        { path: "/about-company", element: <AboutCompany /> },

        // Team
        { path: "/our-team", element: <OurTeam /> },
        { path: "/team/:slug", element: <TeamProfileRoute /> },

        // Shop
        { path: "/shop", element: <Shop /> },

        // Products
        { path: "/products", element: <OurProducts /> },
        { path: "/products/our-founder", element: <OurFounder /> },
        { path: "/products/one-for-all", element: <OneForAll /> },
        { path: "/products/pam", element: <PAM /> },

        // Portfolios
        { path: "/portfolios", element: <OurPortfolios /> },

        // Our Story
        { path: "/our-story", element: <OurStoryPage /> },

        // Blog
        { path: "/blogs", element: <BlogsPage /> },
        { path: "/blogs/:slug", element: <BlogArticle /> },

        // Auth (chromeless — Layout hides chrome for these paths)
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },

        // Fallback — redirect unknown paths to home
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);
}

// ─── Root app ─────────────────────────────────────────────────────────────────

function App() {
  const initialDocked =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(SPLASH_KEY) === "true";

  const [docked, setDocked] = useState(initialDocked);

  useEffect(() => {
    if (initialDocked) {
      return;
    }

    let isMounted = true;

    // Minimum display time to let splash logo animation present smoothly
    const minTimePromise = new Promise((resolve) =>
      setTimeout(resolve, INTRO_TOTAL_MS)
    );

    // Maximum timeout safety fallback (4s) so splash never hangs indefinitely
    const maxTimeoutPromise = new Promise((resolve) =>
      setTimeout(resolve, 4000)
    );

    // Preload initial Home chunk and key hero images in parallel with splash
    const assetsPromise = Promise.all([
      loadHome(),
      decodeImage(logoImg),
      decodeImage(robotLaptopGif),
    ]);

    Promise.race([
      Promise.all([minTimePromise, assetsPromise]),
      maxTimeoutPromise,
    ]).then(() => {
      if (isMounted) {
        setDocked(true);
        sessionStorage.setItem(SPLASH_KEY, "true");
      }
    });

    return () => {
      isMounted = false;
    };
  }, [initialDocked]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <main className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <RouterProvider router={createAppRouter(docked)} />
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ─── Page-level loading fallback ─────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#050814]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
    </div>
  );
}

export default App;
