document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get("id");
    const dates = urlParams.get("dates");
    const adults = urlParams.get("adults") || 1;
    const children = urlParams.get("children") || 0;

    if (!offerId) {
        console.error("Brak identyfikatora oferty w URL!");
        return;
    }

    // Pobierz dane szczegółowe oferty z backendu
    fetch(`/offer-details?id=${offerId}`)
        .then(response => response.json())
        .then(data => {
            console.log("Dane oferty:", data);
            renderOfferDetails(data);
            initializeMap(data.coords_lat, data.coords_lon);
            renderFacilities(data.facilities); // Dodaj udogodnienia
            setupMapLink(data.coords_lat, data.coords_lon); // Obsługa "Pokaż na mapie"
        })
        .catch(error => {
            console.error("Błąd podczas ładowania szczegółów oferty:", error);
        });

    // Funkcja do renderowania danych oferty
    function renderOfferDetails(data) {

        // Jeśli descriptionLong nie istnieje, przypisz pusty string
        const descriptionLong = data.descriptionLong || "";

        // Podział opisu na paragrafy
        const descriptionParagraphs = descriptionLong
            .split("\n") // Dzieli tekst na paragrafy na podstawie nowej linii
            .map(paragraph => `<p>${paragraph.trim()}</p>`) // Tworzy elementy <p>
            .join(""); // Łączy wszystko w jeden ciąg HTML

        // Opis oceny na podstawie ratingu
        const ratingDescription = getRatingDescription(data.rating);

        // Renderowanie podstawowej struktury
        document.querySelector(".dynamic-listing").innerHTML = `
            <div class="offer-top-container">
                <div class="offer-name-container">
                    <h2>${data.object_name}</h2>
                </div>
                <div class="reservation-button-container">
                    <button class="availability-button" id="reservationButton" data-object-id="${data.id}">Zarezerwuj teraz</button>
                </div>
            </div>
            <div class="offer-address-container">
                <p>
                    <i class="fa-solid fa-location-pin show-map-link" data-lat="${data.coords_lat}" data-lon="${data.coords_lon}"></i>
                    ${data.address_line},&nbsp;&nbsp;${data.address},&nbsp;&nbsp;${data.postal_code},&nbsp;&nbsp;${data.country},&nbsp;&nbsp;
                    <a href="#" class="show-map-link" data-lat="${data.coords_lat}" data-lon="${data.coords_lon}">Pokaż mapę</a>
                </p>
            </div>
            <div class="middle-container">
                <div class="parent">
                    <div class="div1"></div>
                    <div class="div2"></div>
                    <div class="div3"></div>
                    <div class="div4"></div>
                    <div class="div5"></div>
                    <div class="div6"></div>
                    <div class="div7"></div>
                    <div class="div8"></div>
                </div>
                <div class="middle-side-container">
                    <div class="rating-container">
                        <div class="review-count-container">
                            <span class="rating-description">${ratingDescription}</span>
                            <span>${data.reviews_count} opinii</span>
                        </div>
                        <span class="rating">${data.rating}</span>
                    </div>
                    <div class="map-container" id="map"></div>
                </div>
            </div>
            <div class="lower-container">
                <div class="facilities-container"></div>
                <div class="long-description-container">
                    ${descriptionParagraphs}
                </div>
            </div>
        `;

        // Dodawanie zdjęć do gridu
        const photos = data.photos || [];
        const gridChildren = document.querySelectorAll(".parent > div");

        photos.slice(0, gridChildren.length).forEach((photoUrl, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = photoUrl;
            imgElement.alt = `${data.object_name} - Zdjęcie ${index + 1}`;
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "cover";

            gridChildren[index].appendChild(imgElement);
        });

        // Dodaj obsługę przycisku rezerwacji
        setupReservationButton();
    }

    // Funkcja do obsługi kliknięcia w przycisk rezerwacji
    function setupReservationButton() {
        const reservationButton = document.getElementById("reservationButton");
        if (!reservationButton) return;

        reservationButton.addEventListener("click", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const objectId = urlParams.get("id");
            const dates = urlParams.get("dates");
            const adults = urlParams.get("adults") || 1;
            const children = urlParams.get("children") || 0;

            if (!objectId || !dates) {
                alert("Proszę uzupełnić wymagane dane przed kontynuowaniem.");
                return;
            }

            // Tworzenie URL z parametrami
            const url = `/reservation.html?id=${objectId}&dates=${dates}&adults=${adults}&children=${children}`;

            // Przekierowanie na stronę rezerwacji
            window.location.href = url;
        });
    }

    // Funkcja do obsługi linku "Pokaż na mapie"
    function setupMapLink(lat, lon) {
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("show-map-link")) {
                event.preventDefault();
                window.location.href = `/map.html?lat=${lat}&lon=${lon}`;
            }
        });
    }

    // Funkcja do renderowania udogodnień
    function renderFacilities(facilities) {
        const facilitiesContainer = document.querySelector(".facilities-container");

        facilities.forEach(facility => {
            const facilityElement = document.createElement("div");
            facilityElement.className = "facility";
            facilityElement.innerHTML = `
                <i class="${facility.icon}"></i>
                <span>${facility.name}</span>
            `;
            facilitiesContainer.appendChild(facilityElement);
        });
    }

    // Funkcja do inicjalizacji mapy Leaflet
    function initializeMap(lat, lon) {
        const map = L.map("map").setView([lat, lon], 13);

        // Dodanie warstwy mapy
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Dodanie markera
        L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Lokalizacja: " + lat + ", " + lon)
            .openPopup();
    }

    // Funkcja do generowania opisu oceny
    function getRatingDescription(rating) {
        if (rating >= 9) return "Fantastyczny";
        if (rating >= 8) return "Bardzo dobry";
        if (rating >= 7) return "Dobry";
        if (rating >= 6) return "Przyzwoity";
        if (rating >= 5) return "Znośny";
        return "Niska ocena";
    }
});
