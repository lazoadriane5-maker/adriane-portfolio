
/* ========================================
   CURRENT YEAR
======================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
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
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* ========================================
   GALLERY LIGHTBOX
======================================== */

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!lightboxImage) return;

      const imagePath = item.dataset.image;
      const galleryImage = item.querySelector("img");

      lightboxImage.src = imagePath || "";

      lightboxImage.alt = galleryImage
        ? galleryImage.alt
        : "Gallery image";

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

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

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
}

/* ========================================
   SUBTLE CURSOR GLOW
======================================== */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

/* ========================================
   PROJECT DATA
======================================== */

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
    image: "img/Digital.png"
  }
};

/* ========================================
   PROJECT MODAL
======================================== */

function openProject(projectId) {
  const project = projects[projectId];

  if (!project) return;

  const projectModal = document.getElementById("project-modal");

  if (!projectModal) return;

  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalRole = document.getElementById("modal-role");
  const modalTools = document.getElementById("modal-tools");
  const modalImage = document.getElementById("modal-image");
  const modalContactBtn = document.getElementById("modal-contact-btn");

  if (modalCategory) {
    modalCategory.textContent = project.category;
  }

  if (modalTitle) {
    modalTitle.textContent = project.title;
  }

  if (modalDescription) {
    modalDescription.textContent = project.description;
  }

  if (modalRole) {
    modalRole.textContent = project.role;
  }

  if (modalTools) {
    modalTools.textContent = project.tools;
  }

  if (modalImage) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
  }

  if (modalContactBtn) {
    modalContactBtn.onclick = () => {
      const contactMessage =
        document.getElementById("contact-message");

      if (contactMessage) {
        contactMessage.value =
          `Hi! I'm interested in your ${project.title} project.`;
      }

      closeProject();
    };
  }

  projectModal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeProject() {
  const projectModal = document.getElementById("project-modal");

  if (!projectModal) return;

  projectModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function closeProjectOutside(event) {
  if (event.target.id === "project-modal") {
    closeProject();
  }
}

/* ========================================
   CLOSE MODALS WITH ESCAPE
======================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProject();
  }
});

/* ========================================
   REALISTIC CANVAS FLAMES
   Hover-only particle animation
======================================== */

document
  .querySelectorAll(".social-links a.social-icon")
  .forEach((icon) => {
    // Create canvas for this icon
    const canvas = document.createElement("canvas");

    canvas.classList.add("flame-canvas");
    canvas.setAttribute("aria-hidden", "true");

    icon.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    /* ========================================
       CANVAS SETTINGS
    ======================================== */

    const canvasWidth = 90;
    const canvasHeight = 120;

    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    let particles = [];
    let animationFrame = null;
    let burning = false;

    /* ========================================
       BRAND FLAME COLORS
    ======================================== */

    const styles = getComputedStyle(icon);

    const flameColor =
      styles.getPropertyValue("--flame-color").trim() ||
      "#ff5a1f";

    const highlightColor =
      styles.getPropertyValue("--flame-highlight").trim() ||
      "#ffd166";

    const shadowColor =
      styles.getPropertyValue("--flame-shadow").trim() ||
      "#ff2d00";

    /* ========================================
       CREATE PARTICLES
    ======================================== */

    function createParticle() {
      const originX = canvasWidth / 2;

      const particle = {
        x: originX + (Math.random() - 0.5) * 22,

        y: canvasHeight - 8,

        size: Math.random() * 9 + 5,

        speedY: Math.random() * 2.8 + 1.5,

        speedX: (Math.random() - 0.5) * 1.8,

        life: 1,

        decay: Math.random() * 0.018 + 0.012,

        wobble: Math.random() * Math.PI * 2,

        wobbleSpeed: Math.random() * 0.12 + 0.04,

        color:
          Math.random() > 0.5
            ? flameColor
            : shadowColor
      };

      particles.push(particle);
    }

    /* ========================================
       DRAW PARTICLE
    ======================================== */

    function drawParticle(particle) {
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size
      );

      gradient.addColorStop(0, "#fff9c4");

      gradient.addColorStop(
        0.25,
        highlightColor
      );

      gradient.addColorStop(
        0.55,
        particle.color
      );

      gradient.addColorStop(
        0.8,
        flameColor
      );

      gradient.addColorStop(
        1,
        "transparent"
      );

      ctx.globalAlpha = particle.life;
      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.ellipse(
        particle.x,
        particle.y,
        particle.size * 0.65,
        particle.size * 1.4,
        particle.wobble * 0.15,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    /* ========================================
       ANIMATE FIRE
    ======================================== */

    function animateFire() {
      if (!burning) return;

      ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      // Create new particles continuously
      for (let i = 0; i < 4; i++) {
        createParticle();
      }

      particles.forEach((particle) => {
        particle.y -= particle.speedY;

        particle.x +=
          particle.speedX +
          Math.sin(particle.wobble) * 0.6;

        particle.wobble += particle.wobbleSpeed;

        particle.life -= particle.decay;

        particle.size *= 0.994;

        drawParticle(particle);
      });

      // Remove faded particles
      particles = particles.filter(
        (particle) =>
          particle.life > 0 &&
          particle.y > -20
      );

      ctx.globalAlpha = 1;

      animationFrame =
        requestAnimationFrame(animateFire);
    }

    /* ========================================
       IGNITE
    ======================================== */

    function ignite() {
      if (burning) return;

      burning = true;
      particles = [];

      canvas.classList.add("burning");

      animateFire();
    }

    /* ========================================
       EXTINGUISH
    ======================================== */

    function extinguish() {
      burning = false;

      canvas.classList.remove("burning");

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);

        animationFrame = null;
      }

      ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      particles = [];
    }

    /* ========================================
       POINTER EVENTS
    ======================================== */

    icon.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") {
        ignite();
      }
    });

    icon.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") {
        extinguish();
      }
    });

    // Touch support
    icon.addEventListener(
      "touchstart",
      ignite,
      { passive: true }
    );

    icon.addEventListener(
      "touchend",
      extinguish,
      { passive: true }
    );

    icon.addEventListener(
      "touchcancel",
      extinguish,
      { passive: true }
    );
  });
