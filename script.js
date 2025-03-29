import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
// Ensure Supabase is available
const supabaseClient = supabase.createClient(
"https://wzgchcvyzskespcfrjvi.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ");

    // Debugging: Check if elements exist
    function checkElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with ID '${id}' not found.`);
        }
        return element;
    }


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

        document.querySelectorAll("section").forEach((section) => {
            section.classList.remove("active");
        });

        document.getElementById(sectionId).classList.add("active");
    };

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const galleryImages = Array.from(document.querySelectorAll(".gallery-card img"));
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

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => openLightbox(index));
    });

    const closeBtn = document.getElementById("close-lightbox");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);


    let startX = 0;

    lightbox.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", function (e) {
        let endX = e.changedTouches[0].clientX;
        let diffX = startX - endX;

        if (diffX > 50) {
            nextImage();
        } else if (diffX < -50) {
            prevImage();
        }
    });

    document.getElementById("feedback-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let feedbackText = document.getElementById("feedbackText").value.trim();

        if (!name || !feedbackText) {
            alert("Please enter both name and feedback.");
            return;
        }

        const { data, error } = await supabaseClient
            .from("Feedback")
            .insert([{ name: name, message: feedbackText }])
            .select();

        if (error) {
            console.error("Error submitting feedback:", error.message);
            document.getElementById("message").textContent = "Error submitting feedback. Try again!";
        } else {
            document.getElementById("message").textContent = "Feedback submitted successfully!";
            document.getElementById("feedback-form").reset();
            fetchFeedback();
        }
    });

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

document.addEventListener("DOMContentLoaded", function () {
    fetchFeedback();
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, adding event listeners...");

    // ✅ Dropdown Toggle Logic
    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdown = document.querySelector(".dropdown");

    if (dropdownToggle) {
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            dropdown.classList.toggle("active"); // Toggle dropdown menu
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !event.target.classList.contains("dropdown-toggle")) {
            dropdown.classList.remove("active");
        }
    });

window.showGallerySection = function (sectionId) {
    console.log(`Navigating to: ${sectionId}`);

    // Ensure that the main Gallery section is visible
    let galleryMainSection = document.getElementById("gallery");
    if (galleryMainSection) {
        galleryMainSection.style.display = "block";
    }

    // Hide all gallery sub-sections
    document.querySelectorAll(".gallery-section").forEach(section => {
        section.style.display = "none";
        console.log(`Hiding: ${section.id}`);
    });

    // Show the selected sub-section
    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
        console.log(`Showing: ${targetSection.id}, new display: ${targetSection.style.display}`);
    } else {
        console.error(`Error: Section ${sectionId} not found!`);
    }
};


    // ✅ General Section Navigation
    window.showSection = function (sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Show only the selected section if it exists
        let targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        } else {
            console.error("Section with ID '" + sectionId + "' not found.");
        }
    };
});




