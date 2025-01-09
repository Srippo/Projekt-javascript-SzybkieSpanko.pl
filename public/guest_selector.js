document.addEventListener("DOMContentLoaded", () => {

    const guestButton = document.getElementById("guestButton");
    const guestSelectorContainer = document.getElementById("guestSelectorContainer");
    const adultsCountElem = document.getElementById("adults");
    const childrenCountElem = document.getElementById("children");
    const readyButton = document.getElementById("readyButton");

    let adults = 1;
    let children = 0;
    const maxGuests = 10;

    function updateGuestButtonText() {
        let text = `${adults} dorosły`;
        if (adults > 1) text = `${adults} dorośli`;
        if (children > 0) {
            text += `, ${children} dziecko`;
            if (children > 1) text = `${adults} dorośli, ${children} dzieci`;
        }
        guestButton.textContent = text;
    }

    function showGuestSelector() {
        guestSelectorContainer.style.display = "block";
    }

    function hideGuestSelector() {
        guestSelectorContainer.style.display = "none";
    }

    function updateGuestCounts() {
        adultsCountElem.textContent = adults;
        childrenCountElem.textContent = children;
        updateGuestButtonText();
    }

    document.getElementById("adults-plus").addEventListener("click", () => {
        if (adults + children < maxGuests) {
            adults++;
            updateGuestCounts();
        }
    });

    document.getElementById("adults-minus").addEventListener("click", () => {
        if (adults > 1) {
            adults--;
            updateGuestCounts();
        }
    });

    document.getElementById("children-plus").addEventListener("click", () => {
        if (adults + children < maxGuests) {
            children++;
            updateGuestCounts();
        }
    });

    document.getElementById("children-minus").addEventListener("click", () => {
        if (children > 0) {
            children--;
            updateGuestCounts();
        }
    });

    guestButton.addEventListener("click", () => {
        if (guestSelectorContainer.style.display === "block") {
            hideGuestSelector();
        } else {
            showGuestSelector();
        }
    });

    readyButton.addEventListener("click", hideGuestSelector);

    window.addEventListener("click", (event) => {
        if (!event.target.closest(".guest-selector")) {
            hideGuestSelector();
        }
    });
});
