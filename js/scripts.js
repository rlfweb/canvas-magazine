// if we have any javascript that runs on page load, which we also want to run when we are using barba, put all off the JS into a runScripts variable and then call that function when you need it

const bodyTag = document.querySelector("body");

const runScripts = () => {
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
};

// calling the runScripts function on page load
runScripts();

// initialising and running barba
// by default, debug is false, but you can turn it to true and check if transitions found in Chrome console
barba.init({
  transitions: [
    {
      name: "switch",
      once({ current, next, trigger }) {
        return new Promise((resolve) => {
          const timeline = gasp.timeline({
            onComplete() {
              resolve();
            },
          });
          timeline
            .set(next.container, { opacity: 0 })
            .to(next.container, { opacity: 1, delay: 1 });
        });
      },
      leave({ current, next, trigger }) {
        // A promise is 'after a certain amount of time, resolve this'
        // setting up a new promise
        return new Promise((resolve) => {
          // setting up a timeline - when you're finished remove what was there and finish this whole transition
          const timeline = gsap.timeline({
            onComplete() {
              current.container.remove();
              resolve();
            },
          });
          // timeline brings in the header and footer at the same time and fades out the current container
          timeline
            .to("header", { y: "-100%" }, 0)
            .to("footer", { y: "100%" }, 0)
            .to(current.container, { opacity: 0 });
        });
      },
      enter({ current, next, trigger }) {
        // new promise for the new page entering
        return new Promise((resolve) => {
          // scroll to the top
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          // timeline which when complete, run the scripts and finish the whole page transition
          const timeline = gsap.timeline({
            onComplete() {
              runScripts();
              resolve();
            },
          });
          // setting up timeline for the new page - container is hidden, fading in header and footer at the same time and then fading in the container
          timeline
            .set(next.container, { opacity: 0 })
            .to("header", { y: "0%" }, 0)
            .to("header", { y: "0%" }, 0)
            .to(next.container, { opacity: 1 });
        });
      },
    },
  ],
  // setting up view to add the body tag "product" to the view
  // could set up several views if you have different parts of site that you want to be different
  // also need to put the data-barba-namespace tag onto the body tag in product.html
  views: [
    {
      namespace: "product",
      beforeEnter() {
        bodyTag.classList.add("product");
      },
      afterLeave() {
        bodyTag.classList.remove("product");
      },
    },
  ],
  debug: true,
});
