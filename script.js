// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Gallery lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const imagePath = item.dataset.image;

    lightboxImage.src = imagePath;
    lightboxImage.alt = item.querySelector("img").alt;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// Subtle cursor glow on desktop
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});


//projects
const projects = {
  music: {
    category: "PROJECT / 001 · MUSIC",
    title: "Music & Production",
    description:
      "A collection of original songs, songwriting, vocal production, and sound experiments. My work explores different sounds and genres, blending emotion with creative production.",
    role: "Singer, Songwriter & Producer",
    tools: "FL Studio, BandLab",
    image: "img/music.jpg"
  },

  visuals: {
    category: "PROJECT / 002 · VISUALS",
    title: "Visual Storytelling",
    description:
      "Creative visual projects that bring ideas to life through graphic design, digital artwork, multimedia, and visual storytelling.",
    role: "Visual Artist & Designer",
    tools: "Photoshop, Canva, Ibis Paint",
    image: "img/project.jpg"
  },

  technology: {
    category: "PROJECT / 003 · TECHNOLOGY",
    title: "Technology",
    description:
      "A collection of web development and software projects focused on practical digital solutions, user experience, and turning ideas into working systems.",
    role: "Developer",
    tools: "HTML, CSS, JavaScript",
    image: "img/car.jpg"
  }
};

function openProject(projectId) {
  const project = projects[projectId];
  if (!project) return;

  document.getElementById("modal-category").textContent =
    project.category;

  document.getElementById("modal-title").textContent =
    project.title;

  document.getElementById("modal-description").textContent =
    project.description;

  document.getElementById("modal-role").textContent =
    project.role;

  document.getElementById("modal-tools").textContent =
    project.tools;

  document.getElementById("modal-image").src =
    project.image;

  document.getElementById("modal-contact-btn").onclick = function () {
    const contactMessage = document.getElementById("contact-message");

    if (contactMessage) {
      contactMessage.value =
        `Hi! I'm interested in your ${project.title} project.`;
    }

    closeProject();
  };

  document.getElementById("project-modal").classList.add("active");
  document.body.classList.add("modal-open");
}

function closeProject() {
  document.getElementById("project-modal").classList.remove("active");
  document.body.classList.remove("modal-open");
}

function closeProjectOutside(event) {
  if (event.target.id === "project-modal") {
    closeProject();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeProject();
  }
});
