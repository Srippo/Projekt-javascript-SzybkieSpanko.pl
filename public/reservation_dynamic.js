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

    // Pobierz dane szczegółowe oferty i wyświetl podsumowanie
    fetch(`/reservation-details?id=${offerId}`)
        .then(response => response.json())
        .then(data => {
            const objectName = data.object_name || "Nieznany obiekt";
            const imageUrl = data.imageUrl || "placeholder.jpg";

            document.getElementById("reservation-summary-container").innerHTML = `
                <div class="reservation-summary">
                    <p><span class="bold">Obiekt:</span> ${objectName}</p>
                    <p><span class="bold">W terminie:</span> ${dates}</p>
                    <p><span class="bold">Goście:</span> ${adults} dorosłych, ${children} dzieci</p>
                </div>
                <img src="${imageUrl}" alt="Zdjęcie obiektu" style="width: 100%; max-width: 400px; margin-bottom: 20px;" />
            `;
        })
        .catch(error => {
            console.error("Błąd podczas pobierania danych oferty:", error);
            alert("Nie udało się pobrać danych oferty.");
        });

    // Obsługa formularza
    const form = document.getElementById("reservation-form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Pobranie danych z formularza
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries()); // Zamiana FormData na obiekt

        // Podział dat na zameldowanie i wymeldowanie
        const [data_zameldowania, data_wymeldowania] = dates.split(" to ");

        try {
            // Wysłanie danych do endpointa
            const response = await fetch('/rezerwacja', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    imie: userData.firstName, // Pole z formularza
                    nazwisko: userData.lastName, // Pole z formularza
                    email: userData.email, // Pole z formularza
                    telefon: userData.phone, // Pole z formularza
                    miasto: userData.miasto, // Możesz dodać pole w formularzu, jeśli jest wymagane
                    data_zameldowania,
                    data_wymeldowania,
                    liczba_doroslych: adults,
                    liczba_dzieci: children
                })
            });

            if (response.ok) {
                alert("Rezerwacja zakończona sukcesem!");
                window.location.href = "/success.html"; // Przekierowanie na stronę sukcesu
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
