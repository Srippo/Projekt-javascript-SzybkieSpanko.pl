document.addEventListener("DOMContentLoaded", () => {
    // Lista miast
    const cities = [
        "Warszawa",
        "Kraków",
        "Wrocław",
        "Gdańsk",
        "Poznań",
        "Łódź",
        "Szczecin",
        "Słupsk"
    ];

    // Referencje do elementów DOM
    const input = document.getElementById("townDropdownInput");
    const dropdown = document.getElementById("townDropdownContainer");

    // Funkcja aktualizująca dropdown na podstawie wpisanego tekstu
    function town_search() {
        const query = input.value.toLowerCase();
        dropdown.innerHTML = ""; // Czyść poprzednie wyniki

        if (query === "") {
            dropdown.style.display = "none";
            return;
        }

        const matchingCities = cities.filter(city =>
            city.toLowerCase().includes(query)
        );

        if (matchingCities.length > 0) {
            matchingCities.forEach(city => {
                const cityElement = document.createElement("li");
                cityElement.textContent = city;
                cityElement.classList.add("city");

                // Ustawienie kliknięcia na miasto
                cityElement.addEventListener("click", () => {
                    input.value = city;
                    dropdown.style.display = "none";
                });

                dropdown.appendChild(cityElement);
            });
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    // Event listener dla pola input
    input.addEventListener("input", town_search);

    // Event listener dla zamknięcia dropdown po kliknięciu poza nim
    document.addEventListener("click", event => {
        if (!event.target.closest(".input-container")) {
            dropdown.style.display = "none";
        }
    });

    // Inicjalizacja Flatpickr dla zakresu dat

    flatpickr("#dateRange", {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: "pl",
        onClose: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const startDate = selectedDates[0];
                const endDate = selectedDates[1];
    
                // Sprawdź, czy daty są takie same
                if (startDate.toDateString() === endDate.toDateString()) {
                    alert("Data przyjazdu i wyjazdu nie mogą być takie same.");
                    instance.clear(); // Wyczyść wybór dat
                }
            }
        }
    });    
});
