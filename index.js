const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT";

async function fetchParties() {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();
    return data.data;
}

function renderParties(parties) {
    const partyList = document.getElementById("party-list");
    partyList.innerHTML = "";

    for (let party of parties) {
        const listItem = document.createElement("li");
        listItem.textContent = `${party.name} on ${new Date(party.date).toLocaleString()} at ${party.location}. Description: ${party.description}`;
        partyList.appendChild(listItem);
    }
}

async function addParty(event) {
    event.preventDefault();

    const name = document.getElementById("party-name").value;
    const description = document.getElementById("party-description").value;
    const date = document.getElementById("party-date").value;
    const location = document.getElementById("party-location").value;

    const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
            date,
            location,
        }),
    });

    const data = await response.json();

    if (data.success) {
        const parties = await fetchParties();
        renderParties(parties);
    } else {
        alert(`Error: ${data.error.message}`);
    }
}

document.getElementById("add-party-form").addEventListener("submit", addParty);

// Initial load of parties
(async function initialize() {
    const parties = await fetchParties();
    renderParties(parties);
})();
