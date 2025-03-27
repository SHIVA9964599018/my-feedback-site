<script>
    function showSection(sectionId) {
      document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active')
      })
      document.getElementById(sectionId).classList.add('active')
    }

    const lightbox = document.getElementById("lightbox")
    const lightboxImg = document.getElementById("lightbox-img")
    const galleryImages = Array.from(document.querySelectorAll('.gallery-card img'))
    let currentIndex = 0

    function openLightbox(index) {
      currentIndex = index
      lightboxImg.src = galleryImages[currentIndex].src
      lightbox.style.display = "flex"
    }

    function closeLightbox() {
      lightbox.style.display = "none"
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % galleryImages.length
      lightboxImg.src = galleryImages[currentIndex].src
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
      lightboxImg.src = galleryImages[currentIndex].src
    }

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index))
    })
  </script>
  <script>
  let startX = 0;

  lightbox.addEventListener("touchstart", function(e) {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", function(e) {
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;

    if (diffX > 50) {
      // Swiped left
      nextImage();
    } else if (diffX < -50) {
      // Swiped right
      prevImage();
    }
  });

   const correctPassword = "1988"; // Change to your own secure password

  function showSection(sectionId) {
    // Check if it's the gallery
    if (sectionId === 'gallery') {
      const alreadyAuthorized = sessionStorage.getItem("galleryAuthorized");
      if (!alreadyAuthorized) {
        const password = prompt("This section is protected. Please enter the password:");
        if (password !== correctPassword) {
          alert("Incorrect password!");
          return;
        }
        // If password is correct, store session key
        sessionStorage.setItem("galleryAuthorized", "true");
      }
    }

    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
  }   
</script>
<script type='module'>
// Ensure Supabase is available
const { createClient } = supabase;

// Supabase configuration
const SUPABASE_URL = "https://wzgchcvyzskespcfrjvi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Event listener for submitting feedback
document.getElementById("feedback-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get input values
    let name = document.getElementById("name").value.trim();
    let feedbackText = document.getElementById("feedbackText").value.trim();

    if (!name || !feedbackText) {
        alert("Please enter both name and feedback.");
        return;
    }

    // Insert feedback into Supabase
    const { data, error } = await supabaseClient
        .from("Feedback")
        .insert([{ name: name, message: feedbackText }]);

    if (error) {
        console.error("Error submitting feedback:", error.message);
        document.getElementById("message").textContent = "Error submitting feedback. Try again!";
    } else {
        document.getElementById("message").textContent = "Feedback submitted successfully!";
        document.getElementById("feedback-form").reset();
        fetchFeedback(); // Refresh feedback list
    }
});

// Fetch and display feedback
async function fetchFeedback() {
    const { data, error } = await supabaseClient
        .from("Feedback")
        .select("*")
        .order("id", { ascending: false });

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

// Fetch feedback when the page loads
document.addEventListener("DOMContentLoaded", fetchFeedback);


</script> 


