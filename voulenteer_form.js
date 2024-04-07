document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("volunteer-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Collect form data
        const formData = new FormData(form);

        // Validate age
        const ageInput = formData.get("age");
        if (parseInt(ageInput) <= 18) {
            alert("Age must be greater than 18.");
            return;
        }

        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Handle a successful submission
                alert('Thank you for volunteering! Your form has been submitted.');

                // Generate and display QR code
                const qrCodeDiv = document.getElementById("qrcode");
                const qr = new QRCode(qrCodeDiv, {
                    text: 'Your Volunteer ID', // You can customize this text
                    width: 128,
                    height: 128,
                });

                // Create a download link for the QR code
                const downloadLink = document.createElement("a");
                downloadLink.href = qrCodeDiv.querySelector("canvas").toDataURL();
                downloadLink.download = "volunteer-id.png";
                downloadLink.innerHTML = "Download Volunteer ID";

                // Append the download link to the page
                qrCodeDiv.appendChild(downloadLink);

                // Reset the form
                form.reset();
            } else {
                // Handle errors or failed submission
                alert('There was an error submitting your form. Please try again later.');
            }
        })
        .catch(error => {
            // Handle network errors
            alert('There was a network error. Please try again later.');
        });
    });
});
