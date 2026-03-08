const languageSwitches = document.querySelectorAll("[data-lang-switch]");
const activeLang = document.documentElement.lang.toLowerCase().startsWith("zh")
  ? "zh"
  : "en";

languageSwitches.forEach((link) => {
  link.addEventListener("click", () => {
    try {
      window.localStorage.setItem("site-lang", link.dataset.langSwitch);
    } catch (_) {}
  });

  if (link.dataset.langSwitch === activeLang) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const toggleScrolledState = () => {
  document.body.classList.toggle("is-scrolled", window.scrollY > 18);
};

toggleScrolledState();
window.addEventListener("scroll", toggleScrolledState, { passive: true });
