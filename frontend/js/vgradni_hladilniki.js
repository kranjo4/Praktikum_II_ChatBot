document.addEventListener("DOMContentLoaded", function () {
    fetch('../json/VgradniHladilniki.json')
        .then(response => response.json())
        .then(data => {
            const fridgeList = document.getElementById('fridge-list');
            let currentPosition = 0;

            function showFridges(startIndex, endIndex) {
                isEventListenersAdded = false;
                fridgeList.innerHTML = "";

                const existingProducts = Array.from(fridgeList.querySelectorAll('.product'));
                const numExisting = existingProducts.length;
                const numNew = endIndex - startIndex;
    
                existingProducts.forEach(product => {
                    product.classList.add('exit');
                    setTimeout(() => fridgeList.removeChild(product), 500); 
                });

                if (window.matchMedia("(max-width: 767px)").matches) {
                    // Display all items on small screens
                    startIndex = 0;
                    endIndex = data.length;
                } else {
                    // Ensure endIndex does not exceed the data length
                    endIndex = Math.min(endIndex, data.length);
                }

                for (let i = startIndex; i < endIndex; i++) {
                    const fridge = data[i];
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.className = 'product enter';

                    let featureIconHTML = '';
                    let fridgeName = '';

                    if ('Smart_SuperCool' in fridge && fridge.Smart_SuperCool === 'Da') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/0/2/026fe26fb4db785f98d828508c353bf7_123258_fp.jpg" alt="Smart_SuperCool">
                                                </div>
                                                <div class="icon-text">    
                                                    <p class="text">Smart SuperCool</p>
                                                </div>
                                                <span class="feature-description">Ko v hladilnik zložimo večjo količino živil, pametni senzorji prepoznajo nenaden dvig temperature in aktivirajo funkcijo Smart SuperCool. Hladilni sistem nato deluje na najvišji stopnji, vse dokler ne doseže prednastavljene temperature, ki zagotavlja optimalne pogoje za shranjevanje hrano.</span>
                                            </div>`;
                    }

                    if ('NoFrost' in fridge) {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/d/5/d5c8eb0a1d64c315f84f80f02b2120b4_102649_fp.jpg" alt="NoFrostDualAdvance">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">NoFrost</p>
                                                </div>
                                                <span class="feature-description">Intenzivno kroženje hladnega zraka v prostoru zamrzovalnika znižuje raven vlažnosti in preprečuje nabiranje zmrzali na živilih ter ledu na stenah zamrzovalnika. V prostoru hladilnika zagotavlja optimalne pogoje za shranjevanje živil. Zagotovljeno je optimalno upravljanje hlajenja in zamrzovanja, ker sta to dva samostojna postopka v dveh ločenih delih aparata.</span>
                                            </div>`;
                    }

                    if ('IonAir_s_hlajenjem_DynamiCooling' in fridge && fridge.IonAir_s_hlajenjem_DynamiCooling === 'Da') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/4/5/455f0316c2ed0c5cf38a622b89bc9dea_104156_fp.jpg" alt="IonAir_s_hlajenjem_DynamiCooling">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">IonAir Dynamic Cooling</p>
                                                </div>
                                                <span class="feature-description">Napreden ventilatorski sistem z dinamičnim hlajenjem skrbi zaenakomerno razporejenost ioniziranega zraka in temperature pocelotnem hladilniku. Z dodatnimi negativnimi ioni obogaten zrakposnema naravno mikroklimo, zato sveža živila ostanejo svežadlje časa. Prav tako je hrano mogoče postaviti na katerokolipolico v hladilniku, saj ni temperaturnih razlik.</span>
                                            </div>`;
                    }

                    if ('Nosilec_za_steklenice' in fridge) {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/2/0/2083d52cad8ce8792e203b8947f8def9_102634_fp.jpg" alt="Nosilec za steklenice">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">Nosilec za steklenice</p>
                                                </div>
                                                <span class="feature-description">V hladilnikih Gorenje steklenice ne odvzemajo prostora drugim živilom na steklenih policah, saj je zanje predviden prav poseben nosilec. Z njim je izraba prostora za shranjevanje optimalna.</span>
                                            </div>`;
                    }

                    if ('Razred_energijske_učinkovitosti' in fridge) {
                        let iconUrl = "";
                        let efficencyClass = "";
                        switch (fridge.Razred_energijske_učinkovitosti) {
                            case 'E':
                                iconUrl = "https://static14.gorenje.com/mabagor/imagelib/icon-spec/b/a/bab12d346d02e3548fc4edf51321ff9d_176625_2.jpg";
                                efficencyClass = "E";

                                break;
                            case 'F':
                                iconUrl = "https://static14.gorenje.com/mabagor/imagelib/icon-spec/1/a/1a65ea250fd50023f9b963893f9ac894_176626_2.jpg";
                                efficencyClass = "F";
                                break;
                        }
                        if (iconUrl !== "") {
                            featureIconHTML += `<div class="feature-icon">
                                                    <div class="icon-img">
                                                        <img src="${iconUrl}" alt="Energijski razred ${fridge.Razred_energijske_učinkovitosti}">
                                                    </div>
                                                    <div class="icon-text">
                                                        <p class="text">${efficencyClass}</p>
                                                    </div>
                                                    <span class="feature-description">Gospodinjski aparati, stari 15 let ali več, porabijo do trikrat več energije kot novi. Novi modeli Gorenja imajo odlično toplotno izolacijo, se ponašajo z izboljšanim tesnjenjem vrat, vrhunskimi komponentami hladilnega sistema in elektronsko regulacijo, ki porabo energije zmanjša na minimum.</span>
                                                </div>`;
                        }
                    }

                    if ('Funkcija_hitrega_zamrzovanja_FastFreeze' in fridge && fridge.Funkcija_hitrega_zamrzovanja_FastFreeze === 'Da') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/0/c/0caf0dcf50512a1959b6a9852b96c9b0_102503_fp.jpg" alt="Funkcija_hitrega_zamrzovanja_FastFreeze">
                                                </div>
                                                <div class="icon-text">
                                                    <p>FastFreeze</p>
                                                </div>
                                                <span class="feature-description">Funkcija FastFreeze je primerna za hitro in učinkovito zamrzovanje hrane ob večjih nakupih. Deluje intenzivno na izjemno nizki temperaturi –24 °C. Ob vklopu deluje 50 ur inohranja konstantno temperaturo, nato se samodejno naravna na normalno temperaturo zamrzovalnika –18 °C .</span>
                                            </div>`;
                    }

                    if ('Tečaj_vrat' in fridge) {
                        let iconUrl = "";
                        let doorType = "";
                        let doorTypeDescription = "";
                        switch (fridge.Tečaj_vrat) {
                            case 'Škarjasti tečaj':
                                iconUrl = "https://static14.gorenje.com/mabagor/imagelib/icon-spec/8/c/8c6a10ff89895459266e0fe38c6f06af_102618_fp.jpg";
                                doorType = "Škarjasti tečaj";
                                doorTypeDescription = "Poseben škarjasti tečaj zaradi svoje vzdržljivosti dovoljuje visoko stopnjo obremenitve vrat aparata in omogoča udobno odpiranje do kota 115°. Na ta način je zagotovljena večja preglednost nad živili, lažje pa je tudi poseganje v notranjost, ker vrata vselej obstanejo na mestu. V primeru, da jih ne zaprete do konca oziroma ostanejo odprta do kota 20°, ta tečaj poskrbi, da se zaprejo samodejno. Na ta način ohranjate primerno temperaturo in učinkoviteje varčujete z električno energijo.";
                                break;
                            case 'Drsni tečaj':
                                iconUrl = "https://static14.gorenje.com/mabagor/imagelib/icon-spec/8/c/8c6a10ff89895459266e0fe38c6f06af_102618_fp.jpg";
                                doorType = "Drsni tečaj";
                                doorTypeDescription = "Trpežni tečaj omogoča shranjevanje težjih predmetov v predalih na vratih ter odpiranje vrat pod kotom 115°. To omogoča boljši pogled na notranjost in olajša nalaganje hladilnika ter jemanje hrane iz njega, saj se vrata ne bodo samodejno zapirala. Če so vrata odprta, jih bo tečaj v celoti zaprl, da bo prihranil energijo.";
                                break;
                        }
                        if (iconUrl !== "") {
                            featureIconHTML += `<div class="feature-icon">
                                                    <div class="icon-img">
                                                        <img src="${iconUrl}" alt="Tečaj vrat ${fridge.Tečaj_vrat}">
                                                    </div>
                                                    <div class="icon-text">
                                                        <p class="text">${doorType}</p>
                                                    </div>
                                                    <span class="feature-description">${doorTypeDescription}</span>
                                                </div>`;
                        }
                    }

                    if ('Število_kompresorjev' in fridge && fridge.Število_kompresorjev === '1 inverterski kompresor') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/e/b/ebd473a2d7205da468d4b310e4083c9b_102486_fp.jpg" alt="Invertni kompresor">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">Invertni kompresor</p>
                                                </div>
                                                <span class="feature-description">Inverterski kompresorji so tišji, bolj vzdržljivi in porabijo manj energije v primerjavi z običajnimi kompresorji. Bolje in hitreje se prilagajajo temperaturnim spremembam v notranjosti hladilnika, na primer ob odpiranju vrat, kar pomeni manj temperaturnih nihanj in boljše pogoje za shranjevanje hrane.</span>
                                            </div>`;
                    }

                    if ('Število_kompresorjev' in fridge && fridge.Število_kompresorjev === '1 inverterski kompresor z ventilom') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/e/b/ebd473a2d7205da468d4b310e4083c9b_102486_fp.jpg" alt="Kompresor z ventilom">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">Kompresor z ventilom</p>
                                                </div>
                                                <span class="feature-description">Modeli enojnih kompresorjev z ventilom se ponašajo z opazno prednostjo pred tradicionalnimi kombiniranimi hladilniki z enim kompresorjem: pri takih napravah so nastavitve temperature v hladilniku in zamrzovalnem predelu popolnoma neodvisne. Tako se lahko hladilni prostor izklopi, medtem ko zamrzovalni del ostane v normalnem delovanju. To bo zagotovilo dodatne prihranke, ko vas dalj časa ne bo, npr. ko ste na dopustu.</span>
                                            </div>`;
                    }

                    if ('MultiAdjust_nastavljive_police' in fridge && fridge.MultiAdjust_nastavljive_police === 'Da') {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/3/c/3cfc73cad649c088c23c27c36d328dec_102905_fp.jpg" alt="MultiAdjust_nastavljive_police">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">MultiAdjust nastavljive police</p>
                                                </div>
                                                <span class="feature-description">Te močne steklene police lahko zelo preprosto prestavite, vstavite ali vzamete iz aparata, kar vam daje vso svobodo ureditve notranjosti v skladu z vašimi potrebami. Police iz kaljenega stekla so zelo trpežne in varno nosijo tudi večje količine hrane.</span>
                                            </div>`;
                    }

                    if ('Osvetlitev_hladilnega_prostora' in fridge) {
                        featureIconHTML += `<div class="feature-icon">
                                                <div class="icon-img">
                                                    <img src="https://static14.gorenje.com/mabagor/imagelib/icon-spec/a/c/ac12ebd62ae248806334a5a5211fc5e5_102497_fp.jpg" alt="Osvetlitev_hladilnega_prostora">
                                                </div>
                                                <div class="icon-text">
                                                    <p class="text">Osvetlitev hladilnega prostora</p>
                                                </div>
                                                <span class="feature-description">Ta tehnologija preprečuje nastajanje ledu v zamrzovalniku, kar zmanjšuje potrebo po ročnem odmrzovanju.</span>
                                            </div>`;
                    }

                  

                    if ('Ime_hladilnika' in fridge && fridge.Ime_hladilnika === "NoFrost DualAdvance") {
                        fridgeName += `<h1>${fridge.Ime_hladilnika}</h1>`;
                    }


                    productElement.innerHTML = `
                    
                    <div class=up_row>

                            <div class="img_container">
                                <img src="${fridge.Slika}" alt="Slika hladilnika ${fridge.Ime_hladilnika}">
                            </div>

                            <div class="stats_container">
                                <div>${fridgeName}</div>
                                <div class="fridge-name">${fridge.Kategorija} - ${fridge.Serijska_stevilka}</div> 
                                <div class="fridge-specs">
                                    Razred energijske učinkovitosti: ${fridge.Razred_energijske_učinkovitosti}, 
                                    Način postavitve: ${fridge.Način_postavitve}, 
                                    Širina izdelka: ${fridge.Širina_izdelka},
                                    Višina izdelka: ${fridge.Višina_izdelka}
                                </div>
                            </div>
                        </div>

                        <div class="features-container">
                            <div class="features-prev" role="button" aria-label="Previous">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <image
                                        xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAB7CAMAAAD3/6a/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAASFBMVEX////KztDm6OnGysy3vL+8wcTn6eq9wsXq7Oy+wsXs7u/Lz9HHy83Hy87l5+i6v8K5v8Le4OLi5OXJzc/Izc/JztC3vL////+xEWpUAAAAFnRSTlMAdyuCqJ0mmCGYG3J9fSujo0E2d313Q8SL6wAAAAFiS0dEAIgFHUgAAAAHdElNRQfoBgcKGCsHZBqZAAAAdElEQVRo3u3XtxGAQBBD0TtYvHfbf6nAHBUgIuYrUKaXKwQlMZPmV3IrSlVwr2pVcG9aVXDrZCEiICAgICAgICAgICAgIHwo9Enw4bUQxikR84KBgYGBgYGBgYGBgYGB8QNjVQ3b3gvJsF0RbsOEp/8Yx90nzBdJEHlXelIAAAAASUVORK5CYII=" />
                                </svg>
                            </div>
                                <div class="features">
                                    ${featureIconHTML}
                                </div>
                            <div class="features-next" role="button" aria-label="Next">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <image
                                        xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAB7CAMAAAD3/6a/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAASFBMVEX////JztDl5+jHy863vL+6v8LIzc/Jzc/i5OW5v8Le4OLHy83KztDGyszLz9Hs7u++wsXq7Oy9wsXn6eq8wcTm6Om3vL////+K/scdAAAAFnRSTlMAdyt9qKN9dzajQX13gnIbmCGYJp0r+uIRzAAAAAFiS0dEAIgFHUgAAAAHdElNRQfoBgcKGAilA2vrAAAAbklEQVRo3u3MyQ2AMADEwAXCHW5I/6WClA5YXsj+e6SnopRZFWrTaEJKntE+gmd0fUquMWBgYGBgYGBgYGBgYGBg/MCoMhHG10IMWZgQEBAQEBAQEBAQEBAQED4UZlvQsrqCtO2uIB2nK0hXtPYbVUlFlTVyyXsAAAAASUVORK5CYII=" />
                                </svg>
                            </div>
                        </div>
                    

                        <div class="bottom_row">
                            <div class=checkbox>
                                
                            </div>
                            <div class="stats_container">
                                <div class="price-old">€ ${fridge.Redna_Cena}</div>
                                <div class="price-new">€ ${fridge.Trenutna_Cena}</div>
                            </div>
                        </div>
                        
                    </div>
              
                    `;
                    fridgeList.appendChild(productElement);
                    setTimeout(() => {
                        productElement.classList.remove('enter');
                        productElement.style.opacity = '1';
                        productElement.style.transform = 'translateX(0)';
                    }, 10);
                }
                setTimeout(setupFeatureNavigation, 0);
                setupFeatureNavigation();
            }


            function setupFeatureNavigation() {
                const featureContainers = document.querySelectorAll('.features');

                featureContainers.forEach(container => {


                    const featureCount = container.querySelectorAll('.feature-icon').length;


                    const iconWidth = container.querySelector('.feature-icon').offsetWidth;
                    const margin = parseFloat(window.getComputedStyle(container.querySelector('.feature-icon')).marginRight);
                    const scrollAmount = iconWidth + margin;


                    if (featureCount > 3) {
                        const prevButton = container.parentNode.querySelector('.features-prev');
                        const nextButton = container.parentNode.querySelector('.features-next');


                        prevButton.style.display = 'block';
                        nextButton.style.display = 'block';


                        prevButton.addEventListener('click', () => {
                            container.scrollLeft -= scrollAmount;
                        });

                        nextButton.addEventListener('click', () => {
                            container.scrollLeft += scrollAmount;
                        });
                    } else {

                        container.parentNode.querySelector('.features-prev').style.display = 'none';
                        container.parentNode.querySelector('.features-next').style.display = 'none';
                    }
                });
            }

            const featureIcons = document.querySelectorAll('.feature-icon');

            featureIcons.forEach((featureIcon) => {
                featureIcon.addEventListener('mouseover', (event) => {
                    const hoveredIcon = event.target;
                    const description = hoveredIcon.querySelector('.feature-description');

                    const top = hoveredIcon.offsetHeight + 5;

                    description.style.transform = `translateY(-${top}px)`;
                });

                featureIcon.addEventListener('mouseout', () => {
                    const description = featureIcon.querySelector('.feature-description');
                    description.style.transform = 'translateY(-100%)';
                });
            });


            showFridges(currentPosition, currentPosition + 3);
            document.querySelector('.prev-button').addEventListener('click', () => {
                if (currentPosition > 0) {
                    currentPosition--;
                    showFridges(currentPosition, currentPosition + 3);
                }
            });
            
            document.querySelector('.next-button').addEventListener('click', () => {
                if (currentPosition + 3 < data.length) {
                    currentPosition++;
                    showFridges(currentPosition, currentPosition + 3);
                }
            });
            
            // Re-render products on resize to switch between carousel and full list
            window.addEventListener('resize', () => {
                showFridges(currentPosition, currentPosition + 3);
            });

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



