import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Initialize Supabase Client
const supabaseClient = createClient(
    "https://wzgchcvyzskespcfrjvi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6Z2NoY3Z5enNrZXNwY2ZyanZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjQwNDEsImV4cCI6MjA1NzQ0MDA0MX0.UuAgu4quD9Vg80tOUSkfGJ4doOT0CUFEUeoHsiyeNZQ"
);

window.currentImageIndex = 0;
window.images = [];

window.openLightbox = function(index) {
    window.images = Array.from(document.querySelectorAll(".gallery-card img"));
    window.currentImageIndex = index;

    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    if (lightbox && lightboxImg) {
        lightboxImg.src = window.images[index].src;
        lightbox.style.display = "flex";
    }
};

window.closeLightbox = function() {
    let lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
    }
};

window.nextImage = function() {
    if (window.images.length === 0) return;

    window.currentImageIndex = (window.currentImageIndex + 1) % window.images.length;
    document.getElementById("lightbox-img").src = window.images[window.currentImageIndex].src;
};

window.prevImage = function() {
    if (window.images.length === 0) return;

    window.currentImageIndex = (window.currentImageIndex - 1 + window.images.length) % window.images.length;
    document.getElementById("lightbox-img").src = window.images[window.currentImageIndex].src;
};

// Attach event listeners to all images
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".gallery-card img").forEach((img, index) => {
        img.addEventListener("click", function() {
            openLightbox(index);
        });
    });
});



// Automatically show the 'home' section when the page loads
document.addEventListener("DOMContentLoaded", () => {
  showSection("home"); // Change this to 'bike-summary' if you prefer that
});

window.showSection = function (sectionId) {
  console.log(`Switching to Section: ${sectionId}`);

  // Hide all sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });

  // Show the selected section
  let targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
    console.log(`Showing: ${targetSection.id}`);

    // Extra handling for gallery
    if (sectionId === "gallery") {
      let dropdownMenu = document.querySelector(".dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.style.display = "block";
      }
    }

    // Load bike data only when bike-summary is shown
    if (sectionId === "bike-summary") {
      loadBikeSummary();
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

    // ✅ Ensure the main gallery section is visible
    const gallerySection = document.getElementById("gallery");
    if (!gallerySection) {
        console.error("Gallery section not found!");
        return;
    }
    gallerySection.style.display = "block";

    // ✅ Hide only inner gallery sections
    document.querySelectorAll(".gallery-section").forEach((section) => {
        section.style.display = "none";
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = "block";
        console.log(`Showing: ${sectionId}`);

        // ✅ Re-bind lightbox click handlers when new section is shown
        bindLightboxClickHandlers();
    } else {
        console.error(`Section ${sectionId} not found`);
    }

    // Hide dropdown if applicable
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) dropdownMenu.style.display = "none";
};

window.showGalleryDropdown = function (show) {
  var dropdown = document.getElementById("gallery-dropdown");
  dropdown.style.display = show ? "block" : "none";
}




function bindLightboxClickHandlers() {
    window.images = Array.from(document.querySelectorAll(".gallery-card img"));
    window.images.forEach((img, index) => {
        img.onclick = () => openLightbox(index);
    });
}

// Call once on DOM load
document.addEventListener("DOMContentLoaded", () => {
    bindLightboxClickHandlers();
});









document.addEventListener("DOMContentLoaded", () => {
  let dropdownToggle = document.querySelector(".dropdown-toggle");
  let dropdownMenu = document.querySelector(".dropdown-menu");

  if (dropdownToggle && dropdownMenu) {
    // ✅ Toggle dropdown on click
    dropdownToggle.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // ✅ Hide dropdown on outside click
    document.addEventListener("click", function (event) {
      if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });

    // ✅ Handle submenu clicks using data attributes
    dropdownMenu.querySelectorAll("a").forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();

        const subId = item.getAttribute("data-sub");
        const loadType = item.getAttribute("data-load");

        if (subId) {
          showSection("utilities");
          showUtilitySubSection(subId);

          if (loadType === "food-facts") {
            loadFoodFacts(); // Only run if required
          }
        }

        dropdownMenu.style.display = "none"; // Close menu after click
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
async function loadBikeSummary() {
  const summaryUrl = "https://my-feedback-site.onrender.com/api/bike-summary";
  const expensesUrl = "https://my-feedback-site.onrender.com/api/bike-expenses";

  const loadingOverlay = document.getElementById("loading-overlay");
  if (loadingOverlay) loadingOverlay.style.display = "flex";

  try {
    // Fetch both summary and expenses in parallel
    const [summaryResponse, expenseResponse] = await Promise.all([
      fetch(summaryUrl),
      fetch(expensesUrl),
    ]);

    const summaryData = await summaryResponse.json();
    const expenseData = await expenseResponse.json();

    // Populate summary data
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("total-distance", summaryData.total_distance_km);
    setText("total-fuel", summaryData.total_fuel_liters);
    setText("mileage", summaryData.mileage_kmpl);
    setText("total-expense", summaryData.total_expense);
    setText("monthly-expense", summaryData.monthly_expense);
    setText("weekly-expense", summaryData.weekly_expense);

    // Render expense breakdowns
    if (expenseData?.monthly_expenses && expenseData?.weekly_expenses) {
      renderMonthlyExpenses(expenseData.monthly_expenses);
      renderWeeklyExpenses(expenseData.weekly_expenses);
    } else {
      console.warn("Missing expense breakdown data", expenseData);
    }

  } catch (err) {
    console.error("Failed to load bike data:", err);
  } finally {
    // ✅ Always hide overlay no matter what
    if (loadingOverlay) loadingOverlay.style.display = "none";
  }
}




function renderMonthlyExpenses(monthlyData) {
    const container = document.getElementById("monthly-expenses-container");
    container.innerHTML = ""; // Clear previous content

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    Object.entries(monthlyData).forEach(([year, months]) => {
        const yearDiv = document.createElement("div");
        const yearHeader = document.createElement("h4");
        yearHeader.textContent = `${year}`;
        yearHeader.style.cursor = "pointer";

        const monthsList = document.createElement("ul");
        monthsList.style.display = "none";

        // Convert object to array and sort by our monthOrder
        const sortedMonths = Object.entries(months).sort((a, b) => {
            return monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]);
        });

        sortedMonths.forEach(([month, data]) => {
            const li = document.createElement("li");
            li.textContent = `${month}: ₹${data.amount}, Distance: ${data.distance} km`;
            monthsList.appendChild(li);
        });

        yearHeader.addEventListener("click", () => {
            monthsList.style.display = monthsList.style.display === "none" ? "block" : "none";
        });

        yearDiv.appendChild(yearHeader);
        yearDiv.appendChild(monthsList);
        container.appendChild(yearDiv);
    });
}



function renderWeeklyExpenses(weeklyData) {
    const container = document.getElementById("weekly-expenses-container");
    container.innerHTML = "";

    const monthGroups = {};

    Object.entries(weeklyData).forEach(([dateStr, amount]) => {
        const date = new Date(dateStr);
        const label = `${date.getFullYear()}-${date.toLocaleString("default", { month: "short" })}`;
        if (!monthGroups[label]) monthGroups[label] = [];
        monthGroups[label].push({ date: dateStr, amount });
    });

    Object.entries(monthGroups).forEach(([monthLabel, weeks]) => {
        const monthDiv = document.createElement("div");

        const monthHeader = document.createElement("div");
        monthHeader.textContent = monthLabel;
        monthHeader.className = "section-header"; // unified styling

        const weeksList = document.createElement("ul");
        weeksList.style.display = "none";

        weeks.forEach(week => {
            const li = document.createElement("li");
            li.textContent = `${week.date}: ₹${week.amount}`;
            weeksList.appendChild(li);
        });

        monthHeader.addEventListener("click", () => {
            weeksList.style.display = weeksList.style.display === "none" ? "block" : "none";
        });

        monthDiv.appendChild(monthHeader);
        monthDiv.appendChild(weeksList);
        container.appendChild(monthDiv);
    });
}

function loadDynamic(file) {
  console.log(`Attempting to load dynamic content from: ${file}`);

  fetch(file)
    .then(response => {
      if (!response.ok) {
        console.error(`Failed to load file: ${file}, Status: ${response.status}`);
        throw new Error(`Failed to load file: ${file}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Dynamic content successfully loaded.");

      const container = document.getElementById("dynamic-section");
      console.log("Container found:", container);

      if (container) {
        // Hide all other sections
        const allSections = document.querySelectorAll("section");
        allSections.forEach(sec => {
          sec.style.display = "none";
        });

        // Load the content and show the dynamic section
        container.innerHTML = data;
        container.style.display = "block";

        console.log("Dynamic section displayed with new content.");

        // Reattach lightbox event listeners if gallery.html was loaded
        if (file.includes("gallery.html")) {
          console.log("Reattaching gallery image click listeners...");
          const galleryImages = container.querySelectorAll(".gallery-card img");
          galleryImages.forEach((img, index) => {
            img.addEventListener("click", function () {
              openLightbox(index);
            });
          });
        }

      } else {
        console.error("Container with ID 'dynamic-section' not found.");
      }
    })
    .catch(error => {
      console.error("Error loading dynamic section:", error);
    });
}


window.loadDynamic = loadDynamic;


// ✅ Handle Utilities Dish Nutrition Form Submission
document.addEventListener("DOMContentLoaded", function () {
    const nutritionForm = document.getElementById("nutrition-form");

    if (nutritionForm) {
        nutritionForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Get form values
            const dishName = document.getElementById("dish_name").value.trim();
            const calorie = parseFloat(document.getElementById("calorie").value);
            const protein = parseFloat(document.getElementById("protein").value);
            const carbs = parseFloat(document.getElementById("carbs").value);
            const fibre = parseFloat(document.getElementById("fibre").value);
            const fats = parseFloat(document.getElementById("fats").value);

            // Basic validation
            if (!dishName || isNaN(calorie) || isNaN(protein) || isNaN(carbs) || isNaN(fibre) || isNaN(fats)) {
                alert("Please enter all fields properly.");
                return;
            }

            // Save to Supabase
            const { data, error } = await supabaseClient
                .from("food_items")
                .insert([
                    {
                        dish_name: dishName,
                        calorie_per_100gm: calorie,
                        protein_per_100gm: protein,
                        carbs_per_100gm: carbs,
                        fibre_per_100gm: fibre,
                        fats_per_100gm: fats
                    }
                ]);

            const messageEl = document.getElementById("nutrition-message");
            if (error) {
                console.error("Error saving dish:", error.message);
                messageEl.textContent = "Error saving dish.";
            } else {
                messageEl.textContent = "Dish saved successfully!";
                nutritionForm.reset();
            }
        });
    }
});

window.showUtilitySubSection = function (subSectionId) {
  // Hide all sub divs inside utilities
  document.querySelectorAll("#utilities > div").forEach(div => {
    div.style.display = "none";
  });

  // Show the selected sub-section
  let target = document.getElementById(subSectionId);
  if (target) {
    target.style.display = "block";
    console.log(`Showing Utility Sub-section: ${subSectionId}`);
  } else {
    console.error(`Utility Sub-section ${subSectionId} not found.`);
  }
};



window.addEventListener("load", function ()  {

    let dropdown = document.querySelector(".dropdown");
    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdown && dropdownToggle && dropdownMenu) {

        // ✅ On Click (mobile)
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation(); // do not bubble up
            dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
        });

        // ✅ On Hover (desktop)
        dropdown.addEventListener("mouseenter", function () {
            dropdownMenu.style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function () {
            dropdownMenu.style.display = "none";
        });

        // ✅ On clicking outside anywhere on document
        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });

        // ✅ On clicking menu item → hide dropdown
        dropdownMenu.querySelectorAll("a").forEach((item) => {
            item.addEventListener("click", function () {
                dropdownMenu.style.display = "none";
            });
        });
    }

});


let dishNames = [];

// ✅ Fetch dish names once and cache
window.loadDishNames = async function () {
  const { data, error } = await supabaseClient.from("food_items").select("dish_name");
  if (!error && data) {
    dishNames = data.map((d) => d.dish_name);
  }
};

// ✅ Autocomplete setup
window.setupAutocomplete = function (input) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("autocomplete-wrapper");
  input.parentElement.appendChild(wrapper);

  input.addEventListener("input", function () {
    const val = input.value.trim().toLowerCase();
    wrapper.innerHTML = "";
    if (!val) return;

    const matches = dishNames.filter((d) => d.toLowerCase().includes(val));
    matches.forEach((match) => {
      const div = document.createElement("div");
      div.textContent = match;
      div.classList.add("suggestion-item");
      div.addEventListener("click", () => {
        input.value = match;
        wrapper.innerHTML = "";
      });
      wrapper.appendChild(div);
    });
  });

  document.addEventListener("click", function (e) {
    if (!wrapper.contains(e.target) && e.target !== input) {
      wrapper.innerHTML = "";
    }
  });
};

// ✅ Add new dish row for a meal
window.addDishRow = function (meal) {
  const container = document.getElementById(`${meal}-container`);
  const row = document.createElement("div");
  row.className = "dish-row";

  row.innerHTML = `
    <div style="position: relative;">
      <input type="text" class="dish-name" placeholder="Dish Name" autocomplete="off" />
    </div>
    <input type="number" class="dish-grams" placeholder="Grams" />
    <button type="button" onclick="this.parentElement.remove()">❌</button>
  `;

  container.appendChild(row);
  const input = row.querySelector(".dish-name");
  setupAutocomplete(input);
};

// ✅ Fetch nutrient data from Supabase
window.getDishInfo = async function (dishName) {
  const { data, error } = await supabaseClient
    .from("food_items")
    .select("*")
    .ilike("dish_name", dishName.trim());

  if (error || !data || data.length === 0) return null;
  return data[0];
};

// ✅ Calculate totals
window.calculateCalories = async function () {
  const meals = ["breakfast", "lunch", "dinner"];
  let totals = { calories: 0, protein: 0, carbs: 0, fibre: 0, fats: 0 };

  for (const meal of meals) {
    const container = document.getElementById(`${meal}-container`);
    const rows = container.querySelectorAll(".dish-row");

    for (const row of rows) {
      const name = row.querySelector(".dish-name").value;
      const grams = parseFloat(row.querySelector(".dish-grams").value);
      if (!name || isNaN(grams)) continue;

      const info = await getDishInfo(name);
      if (!info) continue;

      totals.calories += (info.calorie_per_100gm || 0) * grams / 100;
      totals.protein += (info.protein_per_100gm || 0) * grams / 100;
      totals.carbs += (info.carbs_per_100gm || 0) * grams / 100;
      totals.fibre += (info.fibre_per_100gm || 0) * grams / 100;
      totals.fats += (info.fats_per_100gm || 0) * grams / 100;
    }
  }

  document.getElementById("calorie-result").innerHTML = `
    <strong>Total for Today:</strong><br>
    Calories: ${totals.calories.toFixed(2)} kcal<br>
    Protein: ${totals.protein.toFixed(2)} g<br>
    Carbs: ${totals.carbs.toFixed(2)} g<br>
    Fibre: ${totals.fibre.toFixed(2)} g<br>
    Fats: ${totals.fats.toFixed(2)} g
  `;
};

// ✅ On DOM Load
window.loadFoodFacts = async function () {
  const { data, error } = await supabaseClient.from("food_items").select("*");

  if (error || !data) {
    console.error("Failed to load food facts:", error);
    return;
  }

  const tbody = document.querySelector("#food-facts-table tbody");
  tbody.innerHTML = "";

  data.forEach(dish => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${dish.dish_name}</td>
      <td>${dish.calorie_per_100gm || 0}</td>
      <td>${dish.protein_per_100gm || 0}</td>
      <td>${dish.carbs_per_100gm || 0}</td>
      <td>${dish.fibre_per_100gm || 0}</td>
      <td>${dish.fats_per_100gm || 0}</td>
    `;
    tbody.appendChild(row);
  });

  // ✅ Call sorting after table is filled
  enableTableSorting();
};



// ✅ Enable sortable table headers
window.enableTableSorting = function () {
  const table = document.getElementById("food-facts-table");
  const headers = table.querySelectorAll("th");
  const tbody = table.querySelector("tbody");

  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const isAsc = header.classList.contains("asc");
      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();

        // Detect number vs string
        const aVal = parseFloat(aText);
        const bVal = parseFloat(bText);

        if (!isNaN(aVal) && !isNaN(bVal)) {
          return isAsc ? bVal - aVal : aVal - bVal;
        } else {
          return isAsc ? bText.localeCompare(aText) : aText.localeCompare(bText);
        }
      });

      // Clear previous sort state
      headers.forEach(h => h.classList.remove("asc", "desc"));
      header.classList.add(isAsc ? "desc" : "asc");

      // Re-append sorted rows
      rows.forEach(row => tbody.appendChild(row));
    });
  });
};
