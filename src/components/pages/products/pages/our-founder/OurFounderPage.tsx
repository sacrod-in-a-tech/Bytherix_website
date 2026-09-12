import FounderHero from "./components/FounderHero";
import FounderOrigin from "./components/FounderOrigin";
import FounderWorld from "./components/FounderWorld";
import FounderCombat from "./components/FounderCombat";
import FounderElements from "./components/FounderElements";
import FounderCompanion from "./components/FounderCompanion";
import FounderEnemies from "./components/FounderEnemies";
import FounderClosing from "./components/FounderClosing";
import "./founder.css";

const FounderAmbient = () => (
  <div className="founder-ambient" aria-hidden="true">
    <div className="founder-grid founder-grid-moving" />
    <div className="founder-orb founder-orb-orange" />
    <div className="founder-orb founder-orb-red" />
    <div className="founder-orb founder-orb-blue" />
  </div>
);

const OurFounderPage = () => {
  return (
    <main className="founder-page">
      <FounderAmbient />

      <FounderHero />

      <div className="founder-divider" />

      <FounderOrigin />

      <div className="founder-divider" />

      <FounderWorld />

      <div className="founder-divider" />

      <FounderCombat />

      <div className="founder-divider" />

      <FounderElements />

      <div className="founder-divider" />

      <FounderCompanion />

      <div className="founder-divider" />

      <FounderEnemies />

      <FounderClosing />
    </main>
  );
};

export default OurFounderPage;