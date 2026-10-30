import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { MotionConfig } from "framer-motion";

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

const DockedContext = createContext(false);

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

const SPLASH_KEY = "bytherix_splash_shown";

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
    let frameId = 0;

    if (hash) {
      const id = hash.slice(1);
      const attempt = (tries: number) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "start",
          });
        } else if (tries > 0) {
          frameId = requestAnimationFrame(() => attempt(tries - 1));
        }
      };
      attempt(20);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    return () => {
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [pathname, hash]);

  return null;
}

function Layout() {
  const docked = useContext(DockedContext);
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

function HomeRoute() {
  const docked = useContext(DockedContext);
  return <Home docked={docked} />;
}

function createAppRouter() {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [

        { path: "/", element: <HomeRoute /> },
        { path: "/about-company", element: <AboutCompany /> },
        { path: "/our-team", element: <OurTeam /> },
        { path: "/team/:slug", element: <TeamProfileRoute /> },
        { path: "/shop", element: <Shop /> },
        { path: "/products", element: <OurProducts /> },
        { path: "/products/our-founder", element: <OurFounder /> },
        { path: "/products/one-for-all", element: <OneForAll /> },
        { path: "/products/pam", element: <PAM /> },
        { path: "/portfolios", element: <OurPortfolios /> },
        { path: "/our-story", element: <OurStoryPage /> },
        { path: "/blogs", element: <BlogsPage /> },
        { path: "/blogs/:slug", element: <BlogArticle /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);
}

const appRouter = createAppRouter();

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

    const introDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : INTRO_TOTAL_MS;
    const timer = window.setTimeout(() => {
      setDocked(true);
      sessionStorage.setItem(SPLASH_KEY, "true");
    }, introDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [initialDocked]);

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AuthProvider>
          <DockedContext.Provider value={docked}>
            <main className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
              <RouterProvider router={appRouter} />
            </main>
          </DockedContext.Provider>
        </AuthProvider>
      </ThemeProvider>
    </MotionConfig>
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
