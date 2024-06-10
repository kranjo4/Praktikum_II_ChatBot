function loadResponse() {
    document.getElementById("con-ai-diff").style.display = "block"
    let con = document.getElementById("ai-diff-response")
    con.innerText = "Prosim počakajte med tem ko se ustvarja odgovor"

    const score = JSON.parse(window.sessionStorage.getItem("score"));
    const sortedScores = score.sort((a, b) => a.score - b.score);
    const items = JSON.parse(window.sessionStorage.getItem("items"));
    const topThreeScores = sortedScores.slice(0, 3)



    const topThreeProducts = topThreeScores.map(scoreItem => {
        const product = items.find(item => item.Serijska_stevilka === scoreItem.Serijska_stevilka);
        if (product) {
            const {
                Ime_hladilnika,
                Serijska_stevilka,
                Kategorija,
                Dozirnik_vode,
                Funkcija_hitrega_zamrzovanja_FastFreeze,
                Gibanje_zraka,
                Nastavljivost_temperature_zamrzovalnega_prostora,
                Način_odtaljevanja_hladilnega_prostora,
                Način_odtaljevanja_zamrzovalnega_prostora,
                Neto_teža,
                NoFrost,
                Ocenjena_letna_poraba_energije,
                Poličke_v_vratih_zamrzovalnika,
                Posode_v_vratih_hladilnika,
                Posodica_za_jajca,
                Posodica_za_led,
                Prostornina_hladilnega_prostora,
                Prostornina_zamrzovalnega_prostora,
                Razred_energijske_učinkovitosti,
                Razred_hrupa,
                Redna_Cena,
                Trenutna_Cena,
                Skupna_prostornina,
                Višina_izdelka,
                Širina_izdelka,
                Število_neodvisnih_hladilnih_sistemov,
                Število_prestavljivih_polic_v_hladilnem_delu,
                Število_steklenih_polic_v_hladilnem_delu
            } = product
            return {
                Ime_hladilnika,
                Serijska_stevilka,
                Kategorija,
                Dozirnik_vode,
                Funkcija_hitrega_zamrzovanja_FastFreeze,
                Gibanje_zraka,
                Nastavljivost_temperature_zamrzovalnega_prostora,
                Način_odtaljevanja_hladilnega_prostora,
                Način_odtaljevanja_zamrzovalnega_prostora,
                Neto_teža,
                NoFrost,
                Ocenjena_letna_poraba_energije,
                Poličke_v_vratih_zamrzovalnika,
                Posode_v_vratih_hladilnika,
                Posodica_za_jajca,
                Posodica_za_led,
                Prostornina_hladilnega_prostora,
                Prostornina_zamrzovalnega_prostora,
                Razred_energijske_učinkovitosti,
                Razred_hrupa,
                Redna_Cena,
                Trenutna_Cena,
                Skupna_prostornina,
                Višina_izdelka,
                Širina_izdelka,
                Število_neodvisnih_hladilnih_sistemov,
                Število_prestavljivih_polic_v_hladilnem_delu,
                Število_steklenih_polic_v_hladilnem_delu
            };
        }
        return null
    }).filter(product => product !== null)

    if (topThreeProducts.length > 0) {
        document.getElementById("product1").textContent = `${topThreeProducts[0].Serijska_stevilka}`;
    }
    if (topThreeProducts.length > 1) {
        document.getElementById("product2").textContent = `${topThreeProducts[1].Serijska_stevilka}`;
    }
    if (topThreeProducts.length > 2) {
        document.getElementById("product3").textContent = `${topThreeProducts[2].Serijska_stevilka}`;
    }

    let productsForSend = JSON.stringify(topThreeProducts)

    const payload = {
        products: productsForSend
    }

    fetch("http://localhost:3000/model/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((chatResult) => {
            console.log("Generated answer:", chatResult);
            con.innerText = chatResult;
        })
        .catch((error) => {
            console.log("Error", error);
        })

}