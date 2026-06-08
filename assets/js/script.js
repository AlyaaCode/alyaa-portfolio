const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        document.body.classList.toggle("nav-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

if (siteHeader) {
    const updateHeaderState = () => {
        siteHeader.classList.toggle("scrolled", window.scrollY > 12);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
}

const blogSearch = document.querySelector("#blogSearch");
const blogCards = document.querySelectorAll(".blog-card[data-search]");

if (blogSearch && blogCards.length) {
    blogSearch.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase();

        blogCards.forEach((card) => {
            const text = `${card.textContent} ${card.dataset.search}`.toLowerCase();
            card.classList.toggle("hidden", query !== "" && !text.includes(query));
        });
    });
}

const revealSelectors = [
    ".section-heading",
    ".recruiter-panel",
    ".stat-card",
    ".project-card",
    ".achievement-card",
    ".skill-group",
    ".content-panel",
    ".blog-card",
    ".contact-panel",
    ".contact-form",
    ".cta-section"
];

const revealItems = document.querySelectorAll(revealSelectors.join(","));
const imageRevealItems = document.querySelectorAll(".profile-image-wrap, .profile-info");

revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
});

imageRevealItems.forEach((item) => {
    item.classList.add("image-reveal");
});

const animatedItems = document.querySelectorAll(".reveal, .image-reveal");

if ("IntersectionObserver" in window && animatedItems.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -48px 0px"
    });

    animatedItems.forEach((item) => revealObserver.observe(item));
} else {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
}
