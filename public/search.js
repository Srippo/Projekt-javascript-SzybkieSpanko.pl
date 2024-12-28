document.addEventListener("DOMContentLoaded", () => {
    // Referencje do elementów DOM
    const searchButton = document.getElementById("searchButton");
    const dateRangeInput = document.getElementById("dateRange");
    const input = document.getElementById("townDropdownInput"); // Dodano definicję input
    const adults = 1; // Jeśli liczba dorosłych jest ustawiana dynamicznie, wstaw tutaj odpowiedni kod
    const children = 0; // Jeśli liczba dzieci jest ustawiana dynamicznie, wstaw tutaj odpowiedni kod

    searchButton.addEventListener("click", () => {
        const city = input.value.trim();
        const dateRange = dateRangeInput.value.trim();

        if (!city || !dateRange) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        const searchUrl = `results.html?city=${encodeURIComponent(city)}&dates=${encodeURIComponent(dateRange)}&adults=${adults}&children=${children}`;
        window.location.href = searchUrl;
    });
});
