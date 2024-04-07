// Sample data for dynamic content
const motivationalContent = [
    "You are capable of great things!",
    "Believe in yourself and your abilities.",
    "Empowerment begins with awareness."
];

const articles = [
    { title: "Safety Tips for College Students", content: "Here are some safety tips to keep in mind while on campus..." },
    { title: "Know Your Rights", content: "Understanding your rights is essential for personal safety..." },
];



// Function to dynamically populate motivational content
function populateMotivationalContent() {
    const motivationContentDiv = document.getElementById("motivation-content");

    motivationalContent.forEach((content) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = content;
        motivationContentDiv.appendChild(paragraph);
    });
}

// Function to dynamically populate articles
function populateArticles() {
    const articleList = document.getElementById("article-list");

    articles.forEach((article) => {
        const articleCard = document.createElement("div");
        articleCard.classList.add("article-card");

        const title = document.createElement("h3");
        title.textContent = article.title;

        const content = document.createElement("p");
        content.textContent = article.content;

        articleCard.appendChild(title);
        articleCard.appendChild(content);

        articleList.appendChild(articleCard);
    });
}

// Sample data for dynamic content
// Sample data for dynamic content
const events = [
    { 
        name: "Self-Defense Workshop", 
        date: "April 15, 2023", 
        time: "10:00 AM - 12:00 PM", 
        place: "Campus Gymnasium",
        host: "Self-Defense Club",
        contactPerson: "John Doe",
        contactEmail: "john.doe@example.com"
    },
    { 
        name: "Awareness Seminar", 
        date: "May 10, 2023", 
        time: "2:00 PM - 4:00 PM", 
        place: "Campus Auditorium",
        host: "Campus Safety Team",
        contactPerson: "Jane Smith",
        contactEmail: "jane.smith@example.com"
    },
    { 
        name: "Safety Fair", 
        date: "June 5, 2023", 
        time: "11:00 AM - 3:00 PM", 
        place: "Campus Courtyard",
        host: "Student Council",
        contactPerson: "Michael Johnson",
        contactEmail: "michael.johnson@example.com"
    },
];

// Function to dynamically populate events
function populateEvents() {
    const eventContainer = document.getElementById("event-container");

    events.forEach((event) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        const eventName = document.createElement("h3");
        eventName.textContent = event.name;

        const eventDate = document.createElement("p");
        eventDate.textContent = `Date: ${event.date}`;

        const eventTime = document.createElement("p");
        eventTime.textContent = `Time: ${event.time}`;

        const eventPlace = document.createElement("p");
        eventPlace.textContent = `Place: ${event.place}`;

        const eventHost = document.createElement("p");
        eventHost.textContent = `Host: ${event.host}`;

        const contactPerson = document.createElement("p");
        contactPerson.textContent = `Contact Person: ${event.contactPerson}`;

        const contactEmail = document.createElement("p");
        contactEmail.textContent = `Contact Email: ${event.contactEmail}`;

        eventCard.appendChild(eventName);
        eventCard.appendChild(eventDate);
        eventCard.appendChild(eventTime);
        eventCard.appendChild(eventPlace);
        eventCard.appendChild(eventHost);
        eventCard.appendChild(contactPerson);
        eventCard.appendChild(contactEmail);

        eventContainer.appendChild(eventCard);
    });
}

// Automatically cycle through event cards
let currentIndex = 0;

function slideEvents() {
    const eventContainer = document.getElementById("event-container");
    const eventCards = eventContainer.getElementsByClassName("event-card");
    eventCards[currentIndex].style.transform = "translateX(-100%)";
    currentIndex = (currentIndex + 1) % eventCards.length;
    eventCards[currentIndex].style.transform = "translateX(0)";
    setTimeout(slideEvents, 3000); // Change event every 3 seconds
}

// Call functions to populate dynamic content and start the slider



populateMotivationalContent();
populateArticles();
populateEvents();
slideEvents();