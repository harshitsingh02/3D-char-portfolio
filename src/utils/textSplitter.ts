export class TextSplitter {
  chars: Element[] = [];
  words: Element[] = [];
  lines: Element[] = [];
  elements: Element[] = [];
  selector: string | Element | NodeListOf<Element> | Element[];
  private originalHTML: Map<Element, string> = new Map();

  constructor(target: string | Element | NodeListOf<Element> | Element[], vars?: { type?: string; linesClass?: string }) {
    const type = vars?.type || "chars,words,lines";
    const linesClass = vars?.linesClass || "split-line";

    let elements: Element[] = [];
    if (typeof target === "string") {
      elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof NodeList) {
      elements = Array.from(target as NodeListOf<Element>);
    } else if (Array.isArray(target)) {
      elements = target;
    } else {
      elements = [target];
    }

    this.selector = target;
    this.elements = elements;

    elements.forEach((element) => {
      this.originalHTML.set(element, element.innerHTML);

      if (type.includes("chars") && type.includes("words")) {
        this.splitWords(element);
        this.splitCharsFromWords(element);
      } else if (type.includes("chars")) {
        this.splitChars(element);
      } else if (type.includes("words")) {
        this.splitWords(element);
      }

      if (type.includes("lines")) {
        this.splitLines(element, linesClass);
      }
    });
  }

  private splitChars(element: Element) {
    const text = element.textContent || "";
    const chars = text.split("");
    element.innerHTML = chars
      .map((char) => `<span class="split-char">${char}</span>`)
      .join("");
    this.chars.push(...Array.from(element.querySelectorAll(".split-char")));
  }

  private splitWords(element: Element) {
    const text = element.textContent || "";
    const words = text.split(" ").filter(w => w.trim().length > 0);
    
    // CRITICAL FIX: Join with " " (space) to ensure browser renders gap
    element.innerHTML = words
      .map((word) => `<span class="split-word">${word}</span>`)
      .join(" "); 

    this.words.push(...Array.from(element.querySelectorAll(".split-word")));
  }

  private splitCharsFromWords(element: Element) {
    const words = element.querySelectorAll(".split-word");
    words.forEach((word) => {
      const text = word.textContent || "";
      const chars = text.split("");
      word.innerHTML = chars
        .map((char) => `<span class="split-char">${char}</span>`)
        .join("");
      this.chars.push(...Array.from(word.querySelectorAll(".split-char")));
    });
  }

  private splitLines(element: Element, linesClass: string) {
    setTimeout(() => {
      const items = element.querySelectorAll(".split-word");
      if (items.length === 0) return;

      let currentLine: Element[] = [];
      let currentTop = 0;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (currentTop === 0) currentTop = rect.top;

        if (Math.abs(rect.top - currentTop) > 10) { 
          if (currentLine.length > 0) this.wrapLine(currentLine, linesClass);
          currentLine = [];
          currentTop = rect.top;
        }
        currentLine.push(item);
      });

      if (currentLine.length > 0) {
        this.wrapLine(currentLine, linesClass);
      }
      
      this.lines.push(...Array.from(element.querySelectorAll(`.${linesClass}`)));
    }, 100); 
  }

  private wrapLine(items: Element[], linesClass: string) {
    if (items.length === 0) return;
    const wrapper = document.createElement("div");
    wrapper.className = linesClass;
    wrapper.style.display = "block";
    
    const parent = items[0].parentNode;
    if (!parent) return;
    parent.insertBefore(wrapper, items[0]);
    items.forEach((item) => wrapper.appendChild(item));
  }

  revert() {
    this.elements.forEach((element) => {
      const original = this.originalHTML.get(element);
      if (original) element.innerHTML = original;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}