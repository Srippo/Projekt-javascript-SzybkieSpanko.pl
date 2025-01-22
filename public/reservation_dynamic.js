document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get("id");
    const dates = urlParams.get("dates");
    const adults = urlParams.get("adults") || 1;
    const children = urlParams.get("children") || 0;

    if (!offerId || !dates) {
        alert("Brakuje danych rezerwacji.");
        return;
    }

<<<<<<< HEAD
=======
    async function validateReservation(objectId, startDate, endDate) {
        const reservations = await fetchReservations(objectId);
        return !reservations.some(reservation => {
            return (
                new Date(reservation.startDate) <= new Date(endDate) &&
                new Date(reservation.endDate) >= new Date(startDate)
            );
        });
    }
    
    async function handleReservation(event) {
        event.preventDefault();
        const objectId = getSelectedObjectId();
        const startDate = getStartDate();
        const endDate = getEndDate();
    
        const isAvailable = await validateReservation(objectId, startDate, endDate);
        if (!isAvailable) {
            alert('Obiekt jest już zarezerwowany w tym terminie');
            return;
        }
    
        // Kontynuuj proces rezerwacji
    }
    

>>>>>>> d56d80071315e05997802fa41ee3b0063f41f833
    fetch(`/reservation-details?id=${offerId}`)
        .then(response => response.json())
        .then(data => {
            const objectName = data.object_name || "Nieznany obiekt";
            const imageUrl = data.imageUrl || "placeholder.jpg";
            const pricePerNight = data.price || 0;
            const [startDate, endDate] = dates.split(" to ");
            const nights = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
            const totalPrice = pricePerNight * nights;
            document.getElementById("reservation-summary-container").innerHTML = `
                <div class="reservation-summary">
                    <p><span class="bold">Obiekt:</span> ${objectName}</p>
                    <p><span class="bold">W terminie:</span> ${dates}</p>
                    <p><span class="bold">Goście:</span> ${adults} dorosłych, ${children} dzieci</p>
                    <p><span class="bold">Cena za pobyt:</span> ${totalPrice} PLN (${pricePerNight} PLN za noc)</p>
                </div>
                <img src="${imageUrl}" alt="Zdjęcie obiektu" style="width: 100%; max-width: 400px; margin-bottom: 20px;" />
            `;
        })
        .catch(error => {
            console.error("Błąd podczas pobierania danych oferty:", error);
            alert("Nie udało się pobrać danych oferty.");
        });

    const form = document.getElementById("reservation-form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        const [data_zameldowania, data_wymeldowania] = dates.split(" to ");

        try {
            const response = await fetch('/rezerwacja', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imie: userData.firstName,
                    nazwisko: userData.lastName,
                    email: userData.email,
                    telefon: userData.phone,
                    miasto: userData.miasto,
                    data_zameldowania,
                    data_wymeldowania,
                    liczba_doroslych: adults,
                    liczba_dzieci: children,
                    object_id: offerId
                })
            });

            if (response.ok) {
                alert("Rezerwacja zakończona sukcesem!");
                window.location.href = "/success.html";
            } else {
                const errorData = await response.text();
                alert(`Błąd: ${errorData}`);
            }
        } catch (error) {
            console.error("Błąd podczas wysyłania danych:", error);
            alert("Wystąpił problem z połączeniem. Spróbuj ponownie później.");
        }
    });
});
