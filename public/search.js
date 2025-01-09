function getPluralForm(count, singular, plural, pluralGenitive) {
    if (count === 1) return `${count} ${singular}`;
    if (count >= 2 && count <= 4) return `${count} ${plural}`;
    return `${count} ${pluralGenitive}`;
}

document.addEventListener("DOMContentLoaded", () => {

    const searchButton = document.getElementById("searchButton");
    const dateRangeInput = document.getElementById("dateRange");
    const input = document.getElementById("townDropdownInput");

    const adultsCountElement = document.getElementById("adults");
    const childrenCountElement = document.getElementById("children");

    searchButton.addEventListener("click", () => {
        const city = input.value.trim();
        const dateRange = dateRangeInput.value.trim();

        const adults = parseInt(adultsCountElement.textContent) || 1;
        const children = parseInt(childrenCountElement.textContent) || 0;

        if (!city || !dateRange) {
            alert("Proszę wypełnić wszystkie pola.");
            return;
        }

        const adultsText = getPluralForm(adults, "dorosły", "dorosłych", "dorosłych");
        const childrenText = children > 0 ? `, ${getPluralForm(children, "dziecko", "dzieci", "dzieci")}` : "";

        const searchUrl = `results.html?city=${encodeURIComponent(city)}&dates=${encodeURIComponent(dateRange)}&adults=${adults}&children=${children}`;
        window.location.href = searchUrl;

        console.log(`Wyszukiwanie dla: ${adultsText}${childrenText}`);
    });
});