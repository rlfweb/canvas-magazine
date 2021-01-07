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

// give your images a class of i.e. "image" witih the html markup
// Attach IntersectionObserver to every image and fade them in/out when they enter/leave the viewport, like the bullet points

const imageHolders = document.querySelectorAll("div.image");

// using the observer variable from above, can instead make a new variable, name it i.e. observer2 and have a new set of ratios or thresholds etc.
imageHolders.forEach((holder) => {
  observer.observe(holder);
});
