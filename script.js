
/* =========================================================
   1. PORTFOLIO IMAGE DATA
   ========================================================= */

// Replace the example image paths with your actual image files.
//
// Photography folder:
// Images/photography/your-photo.jpg
//
// Design folder:
// Images/design/your-design.jpg
//
// Keep filenames and capitalization exactly the same as GitHub.

const portfolioItems = [

    // PHOTOGRAPHY / CINEMATIC ART
    {
        title: "Graphic Design",
        category: "Design",
        type: "Poster / Cinematic Art",
        image: "Images/Dusheera Poster.jpg",
        description: "Cinematic poster and visual storytelling."
    },

    {
        title: "Photography & DOP",
        category: "photography",
        type: "Digital Artwork",
        image: "Images/Lambo.jpg",
        description: "Digital artwork and cinematic concepts."
    },

    // GRAPHIC DESIGN / VISUALS
    {
        title: "Visual Identity",
        category: "design",
        type: "Branding / Graphic Design",
        image: "Images/Mustang.png",
        description: "Brand identity and graphic design project."
    },

    {
        title: "Social Media Creative",
        category: "design",
        type: "Campaign Design",
        image: "ImagesBloomCrest.jpg",
        description: "Social media campaign creative."
    },

    // PHOTOGRAPHY / DOP
    {
        title: "Photography 01",
        category: "photography",
        type: "Photography / DOP",
        image: "Images/photography/photography-01.jpg",
        description: "Photography and DOP still."
    },

    // DIGITAL DESIGN
    {
        title: "Digital Design 01",
        category: "design",
        type: "Digital Design",
        image: "Images/design/digital-design-01.jpg",
        description: "Digital design and visual communication."
    }

];


/* =========================================================
   2. SCROLL REVEAL ANIMATION
   ========================================================= */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


/* Observe elements with the reveal class */

function setupReveals(root = document) {

    root.querySelectorAll(".reveal").forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   3. CREATE AN IMAGE ELEMENT
   ========================================================= */

function createImage(src, alt) {

    const img = document.createElement("img");

    img.src = src;
    img.alt = alt;
    img.loading = "lazy";

    // Show a message if the image cannot be loaded.
    img.onerror = () => {

        const placeholder = document.createElement("div");

        placeholder.className = "placeholder";

        placeholder.textContent =
            "IMAGE NOT FOUND — CHECK script.js PATH";

        img.replaceWith(placeholder);

    };

    return img;

}


/* =========================================================
   4. HOMEPAGE WORK PREVIEWS
   ========================================================= */

// Shows two photography items and one design item on the homepage.

function renderHomePreviews() {

    const container = document.getElementById("homePreviews");

    if (!container) return;

    container.innerHTML = "";

    const photographyItems = portfolioItems
        .filter(item => item.category === "photography")
        .slice(0, 2);

    const designItems = portfolioItems
        .filter(item => item.category === "design")
        .slice(0, 1);

    const items = [
        ...photographyItems,
        ...designItems
    ];

    items.forEach(item => {

        const link = document.createElement("a");

        link.className = "preview-card reveal";

        link.href =
            item.category === "photography"
                ? "photography.html"
                : "design.html";

        // Work image
        if (item.image) {

            link.appendChild(
                createImage(item.image, item.title)
            );

        } else {

            const placeholder = document.createElement("div");

            placeholder.className = "empty-art";

            placeholder.textContent = "ADD YOUR WORK IMAGE";

            link.appendChild(placeholder);

        }

        // Image details
        const info = document.createElement("div");

        info.className = "preview-info";

        const type = document.createElement("span");

        type.textContent = item.type;

        const heading = document.createElement("h3");

        heading.textContent = item.title;

        const description = document.createElement("p");

        description.textContent = item.description;

        info.append(type, heading, description);

        link.appendChild(info);

        container.appendChild(link);

    });

    setupReveals(container);

}


/* =========================================================
   5. FULL PHOTOGRAPHY AND DESIGN GALLERIES
   ========================================================= */

// The category comes from photography.html or design.html.

function renderFullGallery(category) {

    const container = document.getElementById("fullGallery");

    if (!container) return;

    container.innerHTML = "";

    const filteredItems = portfolioItems.filter(
        item => item.category === category
    );

    filteredItems.forEach(item => {

        // Gallery card
        const card = document.createElement("article");

        card.className = "gallery-item reveal";

        // Image container
        const imageContainer = document.createElement("div");

        imageContainer.className = "gallery-image";

        if (item.image) {

            const img = createImage(item.image, item.title);

            img.style.cursor = "zoom-in";

            img.addEventListener("click", () => {

                openLightbox(item.image, item.title);

            });

            imageContainer.appendChild(img);

        } else {

            const placeholder = document.createElement("div");

            placeholder.className = "placeholder";

            placeholder.textContent = "ADD IMAGE PATH IN script.js";

            imageContainer.appendChild(placeholder);

        }

        // Image caption
        const caption = document.createElement("div");

        caption.className = "gallery-caption";

        const type = document.createElement("span");

        type.textContent = item.type;

        const heading = document.createElement("h3");

        heading.textContent = item.title;

        const description = document.createElement("p");

        description.textContent = item.description;

        caption.append(type, heading, description);

        // Assemble gallery card
        card.append(imageContainer, caption);

        container.appendChild(card);

    });

    setupReveals(container);

}


/* =========================================================
   6. IMAGE LIGHTBOX
   ========================================================= */

// Clicking a gallery image opens it in a larger view.

const lightbox = document.getElementById("lightbox");

function openLightbox(src, title) {

    if (!lightbox) return;

    const lightboxImage = document.getElementById("lbImage");

    const lightboxCaption = document.getElementById("lbCaption");

    if (!lightboxImage || !lightboxCaption) return;

    lightboxImage.src = src;

    lightboxImage.alt = title;

    lightboxCaption.textContent = title;

    lightbox.classList.add("open");

    document.body.style.overflow = "hidden";

}


// Close the enlarged image.

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    const lightboxImage = document.getElementById("lbImage");

    if (lightboxImage) {

        lightboxImage.src = "";

    }

    document.body.style.overflow = "";

}


/* Close button */

document
    .getElementById("lbClose")
    ?.addEventListener("click", closeLightbox);


/* Close when clicking outside the image */

lightbox?.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* Close when pressing Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================================================
   7. GALLERY CATEGORY FILTERS
   ========================================================= */

// Supports buttons with data-gallery="photography"
// or data-gallery="design".

document.querySelectorAll("[data-gallery]").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll("[data-gallery]").forEach(item => {

            item.classList.toggle("active", item === button);

        });

        renderFullGallery(button.dataset.gallery);

    });

});


/* =========================================================
   8. INITIALIZE THE WEBSITE
   ========================================================= */

// Render homepage previews.

renderHomePreviews();


// Render the correct full gallery page.

if (document.getElementById("fullGallery")) {

    renderFullGallery(
        document.body.dataset.category || "photography"
    );

}


// Activate reveal animations.

document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});


// Automatically update the copyright year.

document.querySelectorAll("[data-year]").forEach(element => {

    element.textContent = new Date().getFullYear();

});
