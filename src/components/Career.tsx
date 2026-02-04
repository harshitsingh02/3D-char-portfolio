import "./styles/Career.css";
import { config } from "../config";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // MODIFIED: Added local GSAP context to fix missing animation
    const ctx = gsap.context(() => {
      // 1. Animate the central vertical line
      // FIX: Changed from 'maxHeight' to 'scaleY' for smoother, jitter-free GPU animation
      gsap.fromTo(
        ".career-timeline",
        { scaleY: 0 }, 
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          transformOrigin: "top", // Ensures line grows from top to bottom
          scrollTrigger: {
            trigger: ".career-section",
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // 2. Animate the career items appearing
      const boxes = gsap.utils.toArray<HTMLElement>(".career-info-box");
      boxes.forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: box,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" ref={containerRef}>
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{exp.period.includes("Present") ? "NOW" : exp.period.split(" - ")[1]}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;