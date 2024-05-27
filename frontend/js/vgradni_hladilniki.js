document.addEventListener("DOMContentLoaded", function () {
    fetch('../json/VgradniHladilniki.json')
        .then(response => response.json())
        .then(data => {
            const fridgeList = document.getElementById('fridge-list');
            let currentPosition = 0;

            function showFridges(startIndex, endIndex) {
                fridgeList.innerHTML = "";

                for (let i = startIndex; i < Math.min(endIndex, data.length); i++) {
                    const fridge = data[i];
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                    
                <div class=up_row>
                    <div class=img_container>
                        <a href="${fridge.Več_informacij}"><img src="${fridge.Slika}" alt="Slika hladilnika ${fridge.Ime_hladilnika}"></a>
                    </div>
                <h2 class="fridge-name">${fridge.Ime_hladilnika}</h2>
                </div>
                <p>Redna cena: ${fridge.Redna_Cena} €</p>
                <ul class="fridge-specs">
                    <li>Serijska številka: ${fridge.Serijska_stevilka}</li>
                    <li>Kategorija: ${fridge.Kategorija}</li>
                    <li>Način postavitve: ${fridge.Način_postavitve}</li>
                    <li>Trenutna cena: ${fridge.Trenutna_Cena} €</li>
                </ul>
              `;
                    fridgeList.appendChild(productElement);
                }
            }

            showFridges(currentPosition, currentPosition + 3);

            const prevButton = document.querySelector('.prev-button');
            const nextButton = document.querySelector('.next-button');

            prevButton.addEventListener('click', function () {
                if (currentPosition > 0) {
                    currentPosition -= 1;
                    showFridges(currentPosition, currentPosition + 3);
                }
            });

            nextButton.addEventListener('click', function () {
                if (currentPosition + 3 < data.length) {
                    currentPosition += 1;
                    showFridges(currentPosition, currentPosition + 3);
                }
            });
        })
        .catch(error => console.error('Error loading the data: ', error));
});