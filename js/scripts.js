// using intersection observer to make the bullet points appear in the viewport and disappear when the h2 or h3 isn't in view

const headers = document.querySelectorAll("h2, h3");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.1) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  {
    threshold: [0, 0.1, 1],
  }
);

headers.forEach((header) => {
  observer.observe(header);
});
