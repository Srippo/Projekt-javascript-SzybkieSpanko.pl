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
