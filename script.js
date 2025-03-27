document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedbackForm");
    
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            
            const feedback = {
                name,
                email,
                message,
                timestamp: new Date().toISOString()
            };
            
            try {
                const response = await fetch("https://your-supabase-url.supabase.co/rest/v1/feedback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": "your-anon-key",
                        "Authorization": "Bearer your-anon-key"
                    },
                    body: JSON.stringify(feedback)
                });
                
                if (response.ok) {
                    alert("Feedback submitted successfully!");
                    feedbackForm.reset();
                } else {
                    alert("Failed to submit feedback.");
                }
            } catch (error) {
                console.error("Error submitting feedback:", error);
            }
        });
    }
});
