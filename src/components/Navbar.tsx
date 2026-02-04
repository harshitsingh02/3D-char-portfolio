import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    lenis.stop();

    const handleLinkClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        const target = e.currentTarget as HTMLAnchorElement;
        const sectionId = target.getAttribute("data-href");
        if (sectionId && lenis) {
          e.preventDefault();
          lenis.scrollTo(sectionId, { offset: 0, duration: 1.5 });
        }
      }
    };

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick as EventListener);
    });

    const onResize = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      lenis?.destroy();
      gsap.ticker.remove(tickerFn);
      window.removeEventListener("resize", onResize);
      links.forEach((elem) => {
        elem.removeEventListener("click", handleLinkClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Harshit
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn hover-link"
              data-cursor="disable"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                padding: '0 10px',
                "--accentColor": "var(--accent-color)"
              } as React.CSSProperties}
              aria-label="Toggle Theme"
            >
              <div className="hover-in">
                {theme === 'light' ? <FiMoon key="moon-top" /> : <FiSun key="sun-top" />}
                <div>
                  {theme === 'light' ? <FiMoon key="moon-bot" /> : <FiSun key="sun-bot" />}
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;