function getPluralForm(count, singular, plural, pluralGenitive) {
    if (count === 1) return `${count} ${singular}`; // np. "1 dziecko"
    if (count >= 2 && count <= 4) return `${count} ${plural}`; // np. "2 dzieci"
    return `${count} ${pluralGenitive}`; // np. "5 dzieci"
}

document.addEventListener("DOMContentLoaded", () => {
    // Referencje do elementów DOM
    const searchButton = document.getElementById("searchButton");
    const dateRangeInput = document.getElementById("dateRange");
    const input = document.getElementById("townDropdownInput");

    // Referencje do liczników dorosłych i dzieci
    const adultsCountElement = document.getElementById("adults");
    const childrenCountElement = document.getElementById("children");

    searchButton.addEventListener("click", () => {
        const city = input.value.trim();
        const dateRange = dateRangeInput.value.trim();

        // Pobierz aktualne liczby dorosłych i dzieci
        const adults = parseInt(adultsCountElement.textContent) || 1; // Dla <span>
        const children = parseInt(childrenCountElement.textContent) || 0; // Dla <span>

        if (!city || !dateRange) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        // Zbuduj poprawne teksty dla dorosłych i dzieci
        const adultsText = getPluralForm(adults, "dorosły", "dorosłych", "dorosłych");
        const childrenText = children > 0 ? `, ${getPluralForm(children, "dziecko", "dzieci", "dzieci")}` : "";

        // Wygeneruj URL z dynamicznymi wartościami
        const searchUrl = `results.html?city=${encodeURIComponent(city)}&dates=${encodeURIComponent(dateRange)}&adults=${adults}&children=${children}`;
        window.location.href = searchUrl;

        console.log(`Wyszukiwanie dla: ${adultsText}${childrenText}`);
    });
});
