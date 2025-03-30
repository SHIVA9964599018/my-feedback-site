import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase Client
const supabaseClient = createClient(
    "https://wzgchcvyzskespcfrjvi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ"
);



window.showSection = function (sectionId) {
    console.log(`Switching to Section: ${sectionId}`);

    // Hide all sections first
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });

    // Show the selected section
    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
        console.log(`Showing: ${targetSection.id}`);

        // ✅ If Gallery is opened, ensure subtabs are visible & show All Photos by default
        if (sectionId === "gallery") {
            console.log("Gallery section opened, ensuring sub-tabs appear...");

            // Ensure the dropdown menu appears
            let dropdownMenu = document.querySelector(".dropdown-menu");
            if (dropdownMenu) {
                dropdownMenu.style.display = "block";
            }

            // Show All Photos by default when opening Gallery
            showGallerySection("allPhotos");
        }
    } else {
        console.error(`Error: Section ${sectionId} not found.`);
    }
};




window.showGalleryTab = function () {
    console.log("Switching to Gallery...");

    // Hide all sections
    document.querySelectorAll("section").forEach((section) => {
        section.style.display = "none";
    });

    // Show only the Gallery section
    let gallerySection = document.getElementById("gallery");
    if (gallerySection) {
        gallerySection.style.display = "block";
        gallerySection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error("Gallery section not found!");
    }

    // Hide all gallery content initially
    document.querySelectorAll(".gallery-section").forEach((section) => {
        section.style.display = "none";
    });

    // Show dropdown menu
    let dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "block";
    }
};




window.toggleDropdown = function() {
    var dropdownMenu = document.querySelector(".dropdown-menu");
    
    // Toggle visibility
    if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
    } else {
        dropdownMenu.style.display = "block";
    }
}

window.showGallerySection = function (sectionId) {
    console.log(`Navigating to: ${sectionId}`);

    // ✅ Ensure the "Gallery" section is visible
    let gallerySection = document.getElementById("gallery");
    if (gallerySection) {
        gallerySection.style.display = "block"; // 🔹 This ensures "Gallery" becomes visible
    } else {
        console.error("Gallery section not found!");
        return;
    }

    // ✅ Hide all gallery subsections first
    document.querySelectorAll(".gallery-section").forEach((section) => {
        section.style.display = "none";
    });

    // ✅ Show the selected gallery subsection
    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
        console.log(`Showing: ${sectionId}`);
    } else {
        console.error(`Error: Section ${sectionId} not found!`);
    }

    // ✅ Hide dropdown after selection
    let dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        dropdownMenu.style.display = "none";
    }
};


// ✅ Debugging: Ensure subtabs correctly trigger `showGallerySection`
document.querySelectorAll(".dropdown-menu a").forEach((item) => {
    item.addEventListener("click", function (event) {
        event.preventDefault();
        let sectionId = item.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extract section name
        console.log(`Subtab clicked, navigating to: ${sectionId}`);
        window.showGallerySection(sectionId);
    });
});










document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded, adding event listeners...");

    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdownMenu = document.querySelector(".dropdown-menu");
    let dropdown = document.querySelector(".dropdown");

    if (dropdownToggle && dropdownMenu) {
        // ✅ Show dropdown on click
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Gallery clicked!");

            // Toggle dropdown visibility
            dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
        });

        // ✅ Show dropdown on hover
        dropdown.addEventListener("mouseenter", function () {
            dropdownMenu.style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function () {
            dropdownMenu.style.display = "none";
        });

        // ✅ Hide dropdown when clicking outside
        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });

        // ✅ Ensure clicking a subtab hides the dropdown
        document.querySelectorAll(".dropdown-menu a").forEach((item) => {
            item.addEventListener("click", function () {
                console.log(`Subtab clicked: ${item.innerText}`);
                dropdownMenu.style.display = "none";
            });
        });
    } else {
        console.error("Dropdown toggle or menu not found!");
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
