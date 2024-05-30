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

                    <div class=stats_container>
                        <h2 class="fridge-name">${fridge.Ime_hladilnika} - ${fridge.Serijska_stevilka}</h2> 
                        <div class="fridge-specs">
                            Razred energijske učinkovitosti: ${fridge.Razred_energijske_učinkovitosti}, 
                            Način postavitve: ${fridge.Način_postavitve}, 
                            Širina izdelka: ${fridge.Širina_izdelka},
                            Višina izdelka: ${fridge.Višina_izdelka}
                        </div>
                    </div>

                </div>

                <div class=efficency-class>
                    <p>${fridge.Razred_energijske_učinkovitosti}</p>
                </div>

                <div class=bottom_row>
                    <div class=checkbox>
                        
                    </div>
                    <div class=stats_container>
                        <div class="price-old">€ ${fridge.Redna_Cena}</div>
                        <div class="price-new">€ ${fridge.Trenutna_Cena}</div>
                    </div>
                </div>
                
            </div>
              
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