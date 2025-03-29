import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase Client
const supabaseClient = createClient(
    "https://wzgchcvyzskespcfrjvi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ"
);



// ✅ Function to Show a Section
window.showSection = function (sectionId) {
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });

    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
    } else {
        console.error(`Section '${sectionId}' not found!`);
    }
};

// ✅ Function to Show Gallery and Its Dropdown
window.showGalleryTab = function () {
    console.log("Switching to Gallery...");

    // Show the gallery section
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });

    let gallerySection = document.getElementById("gallery");
    if (gallerySection) {
        gallerySection.style.display = "block";
        gallerySection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Gallery section not found!");
    }

    // Show dropdown menu
    let dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "block";
    }
};

window.showGallerySection = function (sectionId) {
    console.log(`Navigating to: ${sectionId}`);

    // Hide all gallery sub-sections
    document.querySelectorAll(".gallery-section").forEach((section) => {
        section.style.display = "none"; // Hide all sections
    });

    // Show the selected section
    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block"; // Make it visible
        targetSection.scrollIntoView({ behavior: "smooth" });
        console.log(`Showing: ${targetSection.id}`);
    } else {
        console.error(`Error: Section ${sectionId} not found!`);
    }

    // Hide dropdown after selecting a subtab
    let dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "none";
    }
};

// ✅ Dropdown Toggle Logic
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, adding event listeners...");

    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });

        // Ensure clicking a subtab hides the dropdown
        document.querySelectorAll(".dropdown-menu a").forEach((item) => {
            item.addEventListener("click", function () {
                dropdownMenu.style.display = "none";
            });
        });
    }
});

// ✅ Handle Feedback Submission
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

// ✅ Fetch Feedback from Supabase
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

// ✅ Load feedback on page load
document.addEventListener("DOMContentLoaded", fetchFeedback);
