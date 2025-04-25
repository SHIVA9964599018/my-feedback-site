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
        container.innerHTML = data;

        // Hide all other sections
        const allSections = document.querySelectorAll("section");
        console.log("All sections found:", allSections);

        allSections.forEach(sec => {
          if (sec.id !== "dynamic-section") sec.style.display = "none";
        });

        // Show the dynamic section
        container.style.display = "block";
        console.log("Dynamic section displayed.");
      } else {
        console.error("Container with ID 'dynamic-section' not found.");
      }
    })
    .catch(error => {
      console.error("Error loading dynamic section:", error);
    });
}

window.loadDynamic = loadDynamic;
