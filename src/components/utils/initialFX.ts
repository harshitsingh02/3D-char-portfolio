import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  const landingText = new TextSplitter(elements, {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new TextSplitter(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = new TextSplitter(".landing-h2-info-1", TextProps);
  const landingText4 = new TextSplitter(".landing-h2-1", TextProps);
  const landingText5 = new TextSplitter(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: TextSplitter, Text2: TextSplitter) {
  // Ensure Text2 is explicitly hidden at the start to prevent "all visible" glitch
  gsap.set(Text2.chars, { y: 80, opacity: 0 });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  // Swap 1: Text1 Leaves (Up), Text2 Enters (from Down)
  tl.to(
    Text1.chars,
    {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
    },
    delay
  )
    .to(
      Text2.chars,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
      },
      delay
    );

  // Swap 2: Text2 Leaves (Up), Text1 Enters (from Down)
  tl.to(
    Text2.chars,
    {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
      stagger: 0.1,
    },
    delay2
  )
    // Snap Text1 to bottom instantly before animating it in
    .set(Text1.chars, { y: 80, opacity: 0 }, delay2)
    .to(
      Text1.chars,
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
      },
      delay2
    );

  // Reset Text2 to bottom position for the next loop iteration
  tl.set(Text2.chars, { y: 80, opacity: 0 });
}