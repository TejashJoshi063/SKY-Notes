const notesContainer = document.querySelector(".notes_container");
const createBtn = document.querySelector(".btn");

// Function to update notes in localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to create a new note
createBtn.addEventListener("click", () => {
    // Create a new div to hold the note
    const newNote = document.createElement("div");
    newNote.classList.add("input-box");

    // Add content to the new note
    newNote.innerHTML = `
        <textarea placeholder="Write your note here..."></textarea>
        <button class="submit-btn">Submit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Append the new note to the notes container
    notesContainer.appendChild(newNote);

    // Update localStorage with the new note
    updateStorage();

    // Add functionality for the submit button
    const submitBtn = newNote.querySelector(".submit-btn");
    submitBtn.addEventListener("click", () => {
        const textarea = newNote.querySelector("textarea");

        if (textarea.value.trim() !== "") {
            textarea.setAttribute("readonly", "true"); // Make the note read-only after submitting
            submitBtn.style.display = "none"; // Hide the submit button after it's clicked
        } else {
            alert("Please write something in the note before submitting.");
        }

        // Update localStorage after submission
        updateStorage();
    });

    // Add delete functionality to the new note
    const deleteBtn = newNote.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        newNote.remove(); // Remove the note
        updateStorage(); // Update localStorage
    });
});

// Function to load saved notes from localStorage when the page loads
window.addEventListener("load", () => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes; // Restore saved notes

        // Add submit functionality to restored notes
        document.querySelectorAll(".submit-btn").forEach((submitBtn) => {
            submitBtn.addEventListener("click", (e) => {
                const newNote = e.target.closest(".input-box");
                const textarea = newNote.querySelector("textarea");

                if (textarea.value.trim() !== "") {
                    textarea.setAttribute("readonly", "true"); // Make the note read-only after submitting
                    submitBtn.style.display = "none"; // Hide the submit button after it's clicked
                } else {
                    alert("Please write something in the note before submitting.");
                }

                // Update localStorage after submission
                updateStorage();
            });
        });

        // Add delete functionality to restored notes
        document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.target.parentElement.remove(); // Remove note
                updateStorage(); // Update localStorage
            });
        });
    }
});