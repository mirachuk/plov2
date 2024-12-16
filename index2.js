let content = [];

async function getResponse() {
    try {
        let response = await fetch("shop.json");
        console.log("response:\n", response, "\n /response: \n");
        let data = await response.text();
        console.log("await response.text()\n", data);
        content = JSON.parse(data);
        content = content.slice(0, 9);
        console.log("content.slice(0, 9)", content);
        showingProducts(content);
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
}

function showingProducts(products) {
    let typesofplov = document.getElementById("typesofplov");
    if (typesofplov) {
        typesofplov.innerHTML = '';
        products.forEach(item => {
            typesofplov.innerHTML += `
                <li style="width: 210px" class="d-flex flex-column m-1 p-1 border bg-body">
                    <img style="width: 160px" class="align-self-center" src="${item.img}">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}.</p>
                    <p class="whatsmall">Цена ${item.price} р.</p>
                    <p>Заказать <input name="quantity" class="w-25" type="number"></p>
                    <input type="hidden" name="title" value="${item.title}">
                </li>
            `;
        });
    } else {
        console.error("Element with id 'typesofplov' not found");
    }
}

document.getElementById("searchInput").addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let filteredContent = content.filter(item =>
        item.title.toLowerCase().includes(searchValue)
    );
    showingProducts(filteredContent);
});

document.getElementById("sorting").addEventListener("change", function () {
    let sortValue = this.value;
    let sortedContent;
    switch (sortValue) {
        case "priceA":
            sortedContent = content.slice().sort((a, b) => a.price - b.price);
            break;
        case "priceD":
            sortedContent = content.slice().sort((a, b) => b.price - a.price);
            break;
        case "titleA":
            sortedContent = content.slice().sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            sortedContent = content;
    }
    showingProducts(sortedContent);
});

getResponse();