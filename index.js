// URL of the API endpoint
const apiEndpoint = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF/recipes';

// Sample data (you might replace this with data retrieved from the server)
let parties = [];

// Function to display parties in the party-list div
function displayParties() {
    const partyListDiv = document.getElementById('party-list');
    partyListDiv.innerHTML = '';

    parties.forEach(party => {
        const partyDiv = document.createElement('div');
        partyDiv.innerHTML = `
            <p><strong>${party.name}</strong> - ${party.date} ${party.time}</p>
            <p><em>${party.location}</em></p>
            <p>${party.description}</p>
            <button onclick="deleteParty('${party.name}')">Delete</button>
            <hr>
        `;
        partyListDiv.appendChild(partyDiv);
    });
}

// Function to fetch parties from the server and display them
async function fetchAndDisplayParties() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        // Update the parties array with data from the server
        parties = data;

        // Display the updated list of parties
        displayParties();
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
}

// Function to add a new party to the server
async function addParty() {
    // ... (unchanged code)

    try {
        // Make a POST request to add the new party
        await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: partyName,
                date: partyDate,
                time: partyTime,
                location: partyLocation,
                description: partyDescription,
            }),
        });

        // Fetch and display the updated list of parties
        fetchAndDisplayParties();
    } catch (error) {
        console.error('Error adding party:', error);
    }
}

// Function to delete a party from the server
async function deleteParty(partyName) {
    // ... (unchanged code)

    try {
        // Make a DELETE request to remove the party
        await fetch(`${apiEndpoint}/${partyName}`, {
            method: 'DELETE',
        });

        // Fetch and display the updated list of parties
        fetchAndDisplayParties();
    } catch (error) {
        console.error('Error deleting party:', error);
    }
}

// Initial display of parties when the page loads
fetchAndDisplayParties();