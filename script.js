import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase Client
const supabaseClient = createClient(
    "https://wzgchcvyzskespcfrjvi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ"
);

// ✅ Function to Show a Section
window.showSection = function (sectionId) {
    if (sectionId === "gallery") {
        const alreadyAuthorized = sessionStorage.getItem("galleryAuthorized");
        if (!alreadyAuthorized) {
            const password = prompt("This section is protected. Please enter the password:");
            if (password !== "1988") {
                alert("Incorrect password!");
                return;
            }
            sessionStorage.setItem("galleryAuthorized", "true");
        }
    }

    // Hide all sections
    document.querySelectorAll("section").forEach((section) => {
        section.classList.remove("active");
        section.style.display = "none";
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add("active");
        selectedSection.style.display = "block";
    } else {
        console.error(`Section with ID '${sectionId}' not found.`);
    }
};

// ✅ Lightbox Functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".gallery-card img");
let currentIndex = 0;

window.openLightbox = function (index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.style.display = "flex";
};

window.closeLightbox = function () {
    lightbox.style.display = "none";
};

window.nextImage = function () {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
};

window.prevImage = function () {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
};

// ✅ Add click events to images
galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

// ✅ Lightbox Buttons
document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
document.getElementById("next-btn").addEventListener("click", nextImage);
document.getElementById("prev-btn").addEventListener("click", prevImage);

// ✅ Swipe gesture for mobile navigation
let startX = 0;
lightbox.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
});
lightbox.addEventListener("touchend", function (e) {
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;
    if (diffX > 50) nextImage();
    if (diffX < -50) prevImage();
});

// ✅ Feedback Form Submission
document.getElementById("feedback-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let feedbackText = document.getElementById("feedbackText").value.trim();

    if (!name || !feedbackText) {
        alert("Please enter both name and feedback.");
        return;
    }

    const { error } = await supabaseClient
        .from("Feedback")
        .insert([{ name, message: feedbackText }]);

    if (error) {
        console.error("Error submitting feedback:", error.message);
        document.getElementById("message").textContent = "Error submitting feedback. Try again!";
    } else {
        document.getElementById("message").textContent = "Feedback submitted successfully!";
        document.getElementById("feedback-form").reset();
        fetchFeedback();
    }
});

// ✅ Fetch Feedback Function
async function fetchFeedback() {
    const { data, error } = await supabaseClient.from("Feedback").select("*").order("id", { ascending: false });

    if (error) {
        console.error("Error fetching feedback:", error.message);
        return;
    }

    let feedbackList = document.getElementById("feedback-list");
    feedbackList.innerHTML = "";

    data.forEach((feedback) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${feedback.name}:</strong> ${feedback.message}`;
        feedbackList.appendChild(listItem);
    });
}

// ✅ Fetch feedback on page load
document.addEventListener("DOMContentLoaded", function () {
    fetchFeedback();
});

// ✅ Gallery Dropdown Fix
document.addEventListener("DOMContentLoaded", function () {
    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });

        // Close dropdown when clicking a subtab
        document.querySelectorAll(".dropdown-menu a").forEach(item => {
            item.addEventListener("click", function () {
                dropdownMenu.style.display = "none";
            });
        });
    }
});

// ✅ Show Gallery Tab
window.showGalleryTab = function () {
    console.log("Switching to Gallery...");

    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });

    let gallerySection = document.getElementById("gallery");
    if (gallerySection) {
        gallerySection.style.display = "block";
        gallerySection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Gallery section not found!");
    }

    document.querySelectorAll(".gallery-section").forEach(section => {
        section.style.display = "none";
    });
};

// ✅ Show Specific Gallery Section
window.showGallerySection = function (sectionId) {
    console.log(`Navigating to: ${sectionId}`);

    document.querySelectorAll(".gallery-section").forEach(section => {
        section.style.display = "none";
    });

    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
    } else {
        console.error(`Section ${sectionId} not found!`);
    }

    let dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "none";
    }
};
