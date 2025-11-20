import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievement,
  Contact,
  Feedbacks,
  Hero,
  Navbar,
  Preloader,
  StarsCanvas,
  Works,
} from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import SkillKeyboard from "./components/SkillKeyboard";

const App = () => {
  return (
    <Preloader>
      <BrowserRouter>
        <div
          className="relative z-0"
          style={{ backgroundColor: "#EDEDFC" }}
        >
          <ElasticCursor />
          <EasterEggs />
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <StarsCanvas />
          <About />
          <SkillKeyboard />
          <Works />
          <div className="relative z-0">
            <Contact />
          </div>
        </div>
      </BrowserRouter>
    </Preloader>
  );
};

export default App;
