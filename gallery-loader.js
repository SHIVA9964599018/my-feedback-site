function loadDynamic(file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById("dynamic-section");
      container.innerHTML = data;
      container.style.display = "block";
    })
    .catch(error => console.error("Error loading dynamic section:", error));
}

window.loadDynamic = loadDynamic;
