document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");
    const dateRange = urlParams.get("dates")?.split(" to ");
    const data_zameldowania = dateRange ? dateRange[0] : null;
    const data_wymeldowania = dateRange ? dateRange[1] : null;
    const adults = parseInt(urlParams.get("adults")) || 1;
    const children = parseInt(urlParams.get("children")) || 0;

    if (!city) {
        console.error("Brak parametru city w URL!");
        return;
    }

    async function fetchReservations(objectId) {
        const response = await fetch(`/api/reservations/${objectId}`);
        if (!response.ok) {
            console.error("Błąd podczas pobierania rezerwacji:", response.statusText);
            return [];
        }
        return response.json();
    }

    async function updateUIWithReservations(objectId, data_zameldowania, data_wymeldowania) {
        const reservations = await fetchReservations(objectId);
        const isReserved = reservations.some(reservation => {
            return (
                new Date(reservation.data_zameldowania) <= new Date(data_wymeldowania) &&
                new Date(reservation.data_wymeldowania) >= new Date(data_zameldowania)
            );
        });

        if (isReserved) {
            const objectElement = document.getElementById(`object-${objectId}`);
            if (objectElement) {
                objectElement.classList.add('reserved');
                const availabilityButton = objectElement.querySelector('.availability-button');
                if (availabilityButton) {
                    availabilityButton.textContent = 'Zarezerwowane';
                    availabilityButton.disabled = true;
                }
            }
        }
    }

    fetch(`/results?city=${city}`)
        .then(response => {
            console.log("Odpowiedź serwera:", response);
            return response.json();
        })
        .then(data => {
            const results = data.results;
            const listingContainer = document.getElementById("listing-container");

            document.getElementById("property-count").textContent = results.length;

            results.forEach(async result => {
                const listing = document.createElement("div");
                listing.classList.add("listing");
                listing.id = `object-${result.Id}`;

                const ratingDescription = getRatingDescription(result.rating);

                const { nights, totalPrice } = data_zameldowania && data_wymeldowania
                    ? calculatePrice(result.price, data_zameldowania, data_wymeldowania)
                    : { nights: 0, totalPrice: 0 };

                const adultsText = getPluralForm(adults, "dorosły", "dorosłych", "dorosłych");
                const childrenText = children > 0
                    ? `, ${getPluralForm(children, "dziecko", "dzieci", "dzieci")}`
                    : "";

                listing.innerHTML = `
                    <div class="listing-img-container">
                        <img alt="${result.object_name}" src="${result.imageUrl}">
                    </div>
                    <div class="listing-details-container">
                        <div class="listing-details-top">
                            <div class="data-container">
                                <h4>${result.object_name}</h4>
                                <div class="location-details-container">
                                    <p>
                                        ${result.address},&nbsp;&nbsp;&nbsp;
                                        <a href="/map.html?lat=${result.coords_lat}&lon=${result.coords_lon}" class="show-map-link">Pokaż na mapie</a>,&nbsp;&nbsp;&nbsp;
                                        ${result.distance} km od centrum
                                    </p>
                                </div>
                                <div class="distinct-attributes-container">
                                    <p class="popup">
                                        ${result.attribute1}
                                        <span class="tooltip-text">${result.attribute1_description}</span>
                                    </p>
                                    <p class="popup">
                                        ${result.attribute2}
                                        <span class="tooltip-text">${result.attribute2_description}</span>
                                    </p>
                                </div>
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

                await updateUIWithReservations(result.Id, data_zameldowania, data_wymeldowania);
            });
        })
        .catch(error => {
            console.error("Błąd podczas ładowania danych:", error);
        });

    document.getElementById("listing-container").addEventListener("click", function (event) {
        if (event.target.classList.contains("availability-button")) {
            const offerId = event.target.getAttribute("data-id");

            const dates = urlParams.get("dates");
            const adults = urlParams.get("adults") || 1;
            const children = urlParams.get("children") || 0;

            const url = `/offer.html?id=${offerId}&dates=${dates}&adults=${adults}&children=${children}`;
            window.location.href = url;
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

    function calculatePrice(price, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const totalPrice = nights * price;

        return { nights, totalPrice };
    }

    function getPluralForm(count, singular, plural, pluralGenitive) {
        if (count === 1) return `${count} ${singular}`;
        if (count >= 2 && count <= 4) return `${count} ${plural}`;
        return `${count} ${pluralGenitive}`;
    }
});
