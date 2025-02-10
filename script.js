document.addEventListener("DOMContentLoaded", function() {
    const importFileInput = document.getElementById("import-file-input");
    const mediaFileInput = document.getElementById("media-upload");
    const mediaModal = document.getElementById("media-modal");
    const mediaUploadButton = document.getElementById("upload-media");
    const themeToggle = document.getElementById("theme-toggle");
    const fab = document.getElementById("fab");
    
    // Toggle Dark Mode
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
    });

    // Feature Box Click Events
    document.getElementById("create-edit").addEventListener("click", function() {
        alert("Create/Edit functionality is activated.");
    });

    document.getElementById("search-feature").addEventListener("click", function() {
        alert("Search Notes functionality is activated.");
    });

    document.getElementById("export-feature").addEventListener("click", function() {
        exportNotes();
    });

    document.getElementById("import-feature").addEventListener("click", function() {
        importFileInput.click();
    });

    document.getElementById("media-feature").addEventListener("click", function() {
        mediaModal.style.display = "flex";
    });

    // Handle file import (accepts images, videos, audio, or JSON)
    importFileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const importedNotes = JSON.parse(e.target.result);
                    localStorage.setItem("notes", JSON.stringify(importedNotes));
                    alert("Notes imported successfully.");
                };
                reader.readAsText(file);
            } else {
                alert("Imported file is not a valid format.");
            }
        }
    });

    // Handle media upload (image, audio, or video)
    mediaUploadButton.addEventListener("click", function() {
        const mediaFile = mediaFileInput.files[0];
        if (mediaFile) {
            alert("Media file uploaded successfully: " + mediaFile.name);
            mediaModal.style.display = "none";
        }
    });

    // Function to export notes as JSON
    function exportNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "notes.json";
        link.click();
    }
});