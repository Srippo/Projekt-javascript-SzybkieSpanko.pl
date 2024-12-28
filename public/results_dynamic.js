document.addEventListener("DOMContentLoaded", function () {
    // Pobierz parametry z URL
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");

    if (!city) {
console.error("Brak parametru city w URL!");
return;
}

console.log("Miasto:", city);

fetch(`/results?city=${city}`)
.then(response => {
    console.log("Odpowiedź serwera:", response);
    return response.json();
})
.then(data => {
    console.log("Dane z serwera:", data);
})
.catch(error => {
    console.error("Błąd podczas ładowania danych:", error);
});

    // Wyświetl nazwę miasta na stronie
    document.getElementById("city-name").textContent = city;

    // Pobierz dane z serwera
    fetch(`/results?city=${city}`)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const listingContainer = document.getElementById("listing-container");

            // Wyświetl liczbę znalezionych obiektów
            document.getElementById("property-count").textContent = results.length;

            // Iteracja po wynikach i tworzenie elementów HTML
            results.forEach(result => {
                const listing = document.createElement("div");
                listing.classList.add("listing");

                listing.innerHTML = `
                    <div class="listing-img-container">
                        <img alt="${result.object_name}" src="${result.imageUrl}">
                    </div>
                    <div class="listing-details-container">
                        <div class="listing-details-top">
                            <h4>${result.object_name}</h4>
                            <div class="location-details-container">
                                <p>${result.address}</p>
                                <p>Pokaż na mapie</p>
                                <p>${result.distance} km od centrum</p>
                            </div>
                            <div class="distinct-attributes-container">
                                <p class="popup">${result.attribute1}
                                    <span class="tooltip-text">
                                        <span class="bold">${result.attribute1}<br></span>
                                        ${result.attribute1_description}
                                    </span>
                                </p>
                                <p class="popup">${result.attribute2}
                                    <span class="tooltip-text">
                                        <span class="bold">${result.attribute2}<br></span>
                                        ${result.attribute2_description}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="listing-details-bottom">
                            <div class="listing-details-bottom-left">
                                <h5>${result.roomDetails}</h5>
                                <p>${result.roomDetailsDescription}</p>
                                <h5><span class="urgent">${result.urgent}</span></h5>
                            </div>
                        </div>
                    </div>
                `;

                listingContainer.appendChild(listing);
            });
        })
        .catch(error => {
            console.error("Błąd podczas ładowania danych:", error);
        });
});