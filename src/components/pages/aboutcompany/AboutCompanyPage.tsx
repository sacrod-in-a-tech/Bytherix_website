import AboutOverview from './sections/overview/AboutOverview';
import OurTeam from '../team/Team';
import AllInOne from './sections/allinone/AllInOne';
import BlogsPage from '../../pages/blogs/BlogsPage';
import SDLCSection from "./sections/SDLCSection/SDLCSection";
import Footer from '../../layout/Footer';

export default function AboutCompanyPage() {
  return (
    <main>
      <AboutOverview />
      <OurTeam />
      <AllInOne /> 
      <SDLCSection />
      <BlogsPage />
      <Footer />
    </main>
  );
}