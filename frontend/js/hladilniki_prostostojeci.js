document.addEventListener("DOMContentLoaded", function () {
    fetch('http://127.0.0.1:5500/frontend/json/ProstostojeciHladilniki.json')
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
              <h2 class="fridge-name">${fridge.Ime_hladilnika}</h2>
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


// ------------------------------------------------------
// Ostale lastnosti hladilnikov če bomo kaj spreminjal
// ------------------------------------------------------

{/* <p>Družina izdelka: ${fridge.Družina_izdelka}</p>

<p>Razred energijske učinkovitosti: ${fridge.Razred_energijske_učinkovitosti}</p>
<p>Razred hrupa: ${fridge.Razred_hrupa}</p>
<p>Lokacija zamrzovalnega prostora: ${fridge.Lokacija_zamrzovalnega_prostora}</p>
<p>Barva izdelka: ${fridge.Barva_izdelka}</p>
<p>Barva vrat: ${fridge.Barva_vrat}</p>
<p>Material vrat: ${fridge.Material_vrat}</p>
<p>Odpiranje vrat: ${fridge.Odpiranje_vrat}</p>
<p>Izvedba podstavka: ${fridge.Izvedba_podstavka}</p>
<p>Klimatski razredi: ${fridge.Klimatski_razredi}</p>
<p>Skupna prostornina: ${fridge.Skupna_prostornina} l</p>
<p>Prostornina hladilnega prostora: ${fridge.Prostornina_hladilnega_prostora} l</p>
<p>Prostornina zamrzovalnega prostora: ${fridge.Prostornina_zamrzovalnega_prostora} l</p>
<p>Zmožnost zamrzovanja v 24 urah: ${fridge.Zmožnost_zamrzovanja_v_24_urah} kg/24h</p>
<p>Shranjevalni čas ob motnjah: ${fridge.Shranjevalni_čas_ob_motnjah} h</p>
<p>Ocenjena letna poraba energije: ${fridge.Ocenjena_letna_poraba_energije} kWh</p>
<p>Upravljanje: ${fridge.Upravljanje}</p>
<p>Nastavljivost temperature zamrzovalnega prostora: ${fridge.Nastavljivost_temperature_zamrzovalnega_prostora}</p>
<p>Način odtaljevanja hladilnega prostora: ${fridge.Način_odtaljevanja_hladilnega_prostora}</p>
<p>Način odtaljevanja zamrzovalnega prostora: ${fridge.Način_odtaljevanja_zamrzovalnega_prostora}</p>
<p>Regulator vlažnosti posode za zelenjavo: ${fridge.Regulator_vlažnosti_posode_za_zelenjavo}</p>
<p>Večnamenski prostor: ${fridge.Večnamenski_prostor}</p>
<p>Funkcija hitrega zamrzovanja FastFreeze: ${fridge.Funkcija_hitrega_zamrzovanja_FastFreeze}</p>
<p>NoFrost sistem: ${fridge.NoFrost}</p>
<p>Gibanje zraka: ${fridge.Gibanje_zraka}</p>
<p>Dozirnik vode: ${fridge.Dozirnik_vode}</p>
<p>Posode v vratih hladilnika: ${fridge.Posode_v_vratih_hladilnika}</p>
<p>Osvetlitev hladilnega prostora: ${fridge.Osvetlitev_hladilnega_prostora}</p>
<p>Število prestavljivih polic v hladilnem delu: ${fridge.Število_prestavljivih_polic_v_hladilnem_delu}</p>
<p>Število steklenih polic v hladilnem delu: ${fridge.Število_steklenih_polic_v_hladilnem_delu}</p>
<p>Posodica za jajca: ${fridge.Posodica_za_jajca}</p>
<p>Posodica za led: ${fridge.Posodica_za_led}</p>
<p>Poličke v vratih zamrzovalnika: ${fridge.Poličke_v_vratih_zamrzovalnika}</p>
<p>Zamrzovalni prostor: ${fridge.Zamrzovalni_prostor}</p>
<p>Osvetlitev zamrzovalnega prostora: ${fridge.Osvetlitev_zamrzovalnega_prostora}</p>
<p>Nivo hrupa (max): ${fridge.Nivo_hrupa_max} dB(A)</p>
<p>Število kompresorjev: ${fridge.Število_kompresorjev}</p>
<p>Vrsta hladilnega sredstva: ${fridge.Vrsta_hladilnega_sredstva}</p>
<p>Polaganje izdelka: ${fridge.Polaganje_izdelka}</p>
<p>Število neodvisnih hladilnih sistemov: ${fridge.Število_neodvisnih_hladilnih_sistemov}</p>
<p>Širina izdelka: ${fridge.Širina_izdelka} mm</p>
<p>Višina izdelka: ${fridge.Višina_izdelka} mm</p>
<p>Globina izdelka: ${fridge.Globina_izdelka} mm</p>
<p>Bruto teža: ${fridge.Bruto_teža} kg</p>
<p>Neto teža: ${fridge.Neto_teža} kg</p>
<p>Širina embaliranega izdelka: ${fridge.Širina_embaliranega_izdelka} mm</p>
<p>Višina embaliranega izdelka: ${fridge.Višina_embaliranega_izdelka} mm</p>
<p>Globina embaliranega izdelka: ${fridge.Globina_embaliranega_izdelka} mm</p>
<p>Napetost: ${fridge.Napetost} V</p>
<p>Frekvenca: ${fridge.Frekvenca} Hz</p>
<p>Priključna moč: ${fridge.Priključna_moč} W</p>
<p>Šifra: ${fridge.Šifra}</p>
<p>EAN koda: ${fridge.EAN_koda}</p> */}
