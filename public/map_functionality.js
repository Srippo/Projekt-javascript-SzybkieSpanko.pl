document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get("city");

    if (city) {
        fetch(`/city-coordinates?city=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    const map = L.map('map').setView([data.latitude, data.longitude], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);

                    // Dodaj marker dla wybranego miasta
                    L.marker([data.latitude, data.longitude]).addTo(map)
                        .bindPopup(`${city}`)
                        .openPopup();
                } else {
                    console.error('Brak danych geograficznych dla miasta');
                }
            })
            .catch(error => {
                console.error('Błąd podczas pobierania współrzędnych:', error);
            });
    }
});
