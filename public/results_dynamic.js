document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");
    const dateRange = urlParams.get("dates")?.split(" to ");
    const startDate = dateRange ? dateRange[0] : null;
    const endDate = dateRange ? dateRange[1] : null;
    const adults = parseInt(urlParams.get("adults")) || 1;
    const children = parseInt(urlParams.get("children")) || 0;

    if (!city) {
        console.error("Brak parametru city w URL!");
        return;
    }

    fetch(`/results?city=${city}`)
        .then(response => {
            console.log("Odpowiedź serwera:", response);
            return response.json();
        })
        .then(data => {
            const results = data.results;
            const listingContainer = document.getElementById("listing-container");

            // Wyświetl liczbę znalezionych obiektów
            document.getElementById("property-count").textContent = results.length;

            // Iteracja po wynikach i tworzenie elementów HTML
            results.forEach(result => {
                const listing = document.createElement("div");
                listing.classList.add("listing");

                const ratingDescription = getRatingDescription(result.rating);

                // Oblicz liczbę nocy i cenę
                const { nights, totalPrice } = startDate && endDate
                    ? calculatePrice(result.price, startDate, endDate) // Zmieniono na `result.price`
                    : { nights: 0, totalPrice: 0 };

                // Zbuduj poprawne teksty dla dorosłych i dzieci
                const adultsText = getPluralForm(adults, "dorosły", "dorosłych", "dorosłych");
                const childrenText = children > 0 ? `, ${getPluralForm(children, "dziecko", "dzieci", "dzieci")}` : "";

                listing.innerHTML = `
                    <div class="listing-img-container">
                        <img alt="${result.object_name}" src="${result.imageUrl}">
                    </div>
                    <div class="listing-details-container">
                        <div class="listing-details-top">
                            <div class="data-container">
                                <h4>${result.object_name}</h4>
                                <div class="location-details-container">
                                    <p>${result.address},&nbsp;&nbsp;&nbsp;Pokaż na mapie,&nbsp;&nbsp;&nbsp;${result.distance} km od centrum</p>
                                </div>
                                <div class="distinct-attributes-container">
                                    <p class="popup">${result.attribute1}</p>
                                    <p class="popup">${result.attribute2}</p>
                                </div>
                            </div>
                            <div class="rating-container">
                                <div class="review-count-container">
                                    <span class="rating-description">${ratingDescription}</span>
                                    <span>${result.reviews_count} opinii</span>
                                </div>
                                <span class="rating">${result.rating}</span>
                            </div>
                        </div>
                        <div class="listing-details-bottom">
                            <div class="listing-details-bottom-left">
                                <h5>${result.roomDetails}</h5>
                                <p>${result.roomDetailsDescription}</p>
                                <h5><span class="urgent">${result.urgent}</span></h5>
                            </div>
                            <div class="pricing-container">
                                <p>${nights} nocy, ${adultsText}${childrenText}</p>
                                <h3>${totalPrice.toLocaleString()} zł</h3>
                                <p>Zawiera opłaty i podatki</p>
                                <button class="availability-button" data-id="${result.Id}">Zobacz dostępność</button>
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

    // Delegacja zdarzeń
    document.getElementById("listing-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("availability-button")) {
            const offerId = event.target.getAttribute("data-id");
            window.location.href = `/offer.html?id=${offerId}`;
        }
    });

    function getRatingDescription(rating) {
        if (rating >= 9) return "Fantastyczny";
        if (rating >= 8) return "Bardzo dobry";
        if (rating >= 7) return "Dobry";
        if (rating >= 6) return "Przyzwoity";
        if (rating >= 5) return "Znośny";
        return "Niska ocena";
    }

    function calculatePrice(price, startDate, endDate) { // Zmieniono `pricePerNight` na `price`
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Oblicz liczbę nocy
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        // Oblicz łączną cenę
        const totalPrice = nights * price;

        return { nights, totalPrice };
    }

    function getPluralForm(count, singular, plural, pluralGenitive) {
        if (count === 1) return `${count} ${singular}`;
        if (count >= 2 && count <= 4) return `${count} ${plural}`;
        return `${count} ${pluralGenitive}`;
    }
});
