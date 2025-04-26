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
      } else {
        console.error("Container with ID 'dynamic-section' not found.");
      }
    })
    .catch(error => {
      console.error("Error loading dynamic section:", error);
    });
}

window.loadDynamic = loadDynamic;
