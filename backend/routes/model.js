const express = require('express')
const axios = require('axios')
const router = express.Router()

const getChat = async (question) => {
    if (!question) return;
    const payload = {
        model: "testNeuralChat",
        prompt: question,
        stream: false
    };
    try {
        const response = await axios.post("http://127.0.0.1:11434/api/generate", payload);
        console.log('API response:', response);
        return response?.data;
    } catch (error){
        console.log("error", error)
        return "";
    }
}

router.post("/generate", async (req, res) => {
    const {question} = req.body;
    const answer = await getChat(question);
    res.json({answer});
})

const testAPI = async () => {
    const testQuestion = [
        {
            "Ime_hladilnika": "NoFrost Plus",
            "Serijska_stevilka": "NRM918EUX",
            "Kategorija": "Štirivratni hladilnik",
            "Redna_Cena": "1.749.90",
            "Trenutna_Cena": "1299.9",
            "Družina_izdelka": "Štirivratni hladilnik",
            "Način_postavitve": "Samostojni",
            "Razred_energijske_učinkovitosti": "E",
            "Razred_hrupa": "C",
            "Lokacija_zamrzovalnega_prostora": "Spodaj",
            "Barva_izdelka": "Siva",
            "Barva_vrat": "Siva",
            "Material_vrat": "Kolaminirana pločevina",
            "Odpiranje_vrat": "Drugo",
            "Izvedba_podstavka": "4 kolesa/2 nastavljivi nogici",
            "Število_zvezdic": "Sveža hrana",
            "Klimatski_razredi": "Normal",
            "Skupna_prostornina": "609 l",
            "Prostornina_hladilnega_prostora": "393 l",
            "Prostornina predelka z 2-zvezdicama": "108 l",
            "Prostornina_zamrzovalnega_prostora": "95 l",
            "Prostornina_predelka_z_2-zvezdicama_na_vratih_zamrzovalnika": "13 l",
            "Zmožnost_zamrzovanja_v_24_urah": "7 kg",
            "Shranjevalni_čas_ob_motnjah": "10 h",
            "Ocenjena_letna_poraba_energije": "320 kWh",
            "Vrsta_prikazovalnika": "LED prikazovalnik",
            "Upravljanje": "Elektronsko za vrati",
            "Nastavljivost_temperature_zamrzovalnega_prostora": "Da",
            "Način_odtaljevanja_hladilnega_prostora": "Avtomatsko",
            "Način_odtaljevanja_zamrzovalnega_prostora": "Avtomatsko",
            "Regulator_vlažnosti_posode_za_zelenjavo": "CrispZone predal s HumidityControl",
            "Večnamenski_prostor": "ConvertZone",
            "Funkcija_hitrega_zamrzovanja_FastFreeze": "Da",
            "NoFrost": "NoFrost Plus",
            "Gibanje_zraka": "MultiFlow hlajenje v hladilniku",
            "Dozirnik_vode": "Ne",
            "Posode_v_vratih_hladilnika": "6 navadnih posod",
            "Osvetlitev_hladilnega_prostora": "LED osvetlitev na stropu",
            "Število_prestavljivih_polic_v_hladilnem_delu": "2 kos",
            "Število_steklenih_polic_v_hladilnem_delu": "4 kos",
            "Posodica_za_jajca": "2/6",
            "Posodica_za_led": "1 klasična",
            "Poličke_v_vratih_zamrzovalnika": "6 kos",
            "Zamrzovalni_prostor": "4 predali",
            "Osvetlitev_zamrzovalnega_prostora": "LED osvetlitev zgoraj",
            "Nivo_hrupa_max": "37 dB(A)",
            "Število_kompresorjev": "1 inverterski kompresor",
            "Vrsta_hladilnega_sredstva": "R600A",
            "Število_neodvisnih_hladilnih_sistemov": "1",
            "Širina_izdelka": "912 mm",
            "Višina_izdelka": "1785 mm",
            "Globina_izdelka": "725 mm",
            "Neto_teža": "129 kg",
            "Napetost": "220-240 V",
            "Frekvenca": "50 Hz",
            "Priključna_moč": "200 W",
        },
        {
            "Ime_hladilnika": "NoFrost Plus",
            "Serijska_stevilka": "NRK6182PW4",
            "Kategorija": "Hladilnik z zamrzovalnikom",
            "Redna_Cena": "559.90",
            "Trenutna_Cena": "439.9",
            "Družina_izdelka": "Hladilnik z zamrzovalnikom",
            "Način_postavitve": "Samostojni",
            "Razred_energijske_učinkovitosti": "E",
            "Razred_hrupa": "C",
            "Lokacija_zamrzovalnega_prostora": "Spodaj",
            "Barva_izdelka": "Bela",
            "Barva_vrat": "Bela",
            "Material_vrat": "Predlakirana pločevina",
            "Odpiranje_vrat": "Desno menljivo",
            "Število vrat": "2",
            "Izvedba_podstavka": "2 kolesci/2 nastavljivi nogici",
            "Število_zvezdic": "4 zvezdice",
            "Klimatski_razredi": "Subnormal",
            "Skupna_prostornina": "292 l",
            "Prostornina_hladilnega_prostora": "207 l",
            "Prostornina_zamrzovalnega_prostora": "85 l",
            "Zmožnost_zamrzovanja_v_24_urah": "5 kg",
            "Shranjevalni_čas_ob_motnjah": "10 h",
            "Ocenjena_letna_poraba_energije": "235 kWh",
            "Vrsta_prikazovalnika": "LED prikazovalnik",
            "Upravljanje": "Elektronsko za vrati",
            "Indikator za odprta vrata": "Nima alarma ali glasovnega sporočila",
            "Način_odtaljevanja_hladilnega_prostora": "Avtomatsko",
            "Način_odtaljevanja_zamrzovalnega_prostora": "Avtomatsko",
            "NoFrost": "NoFrost Plus",
            "Gibanje_zraka": "MultiFlow hlajenje v hladilniku",
            "Posoda za steklenice v vratih": "1 enojna posoda brez varovala",
            "Posode_v_vratih_hladilnika": "2 navadni posodi",
            "Osvetlitev_hladilnega_prostora": "LED osvetlitev na stropu",
            "Število_prestavljivih_polic_v_hladilnem_delu": "3 kos",
            "Število_steklenih_polic_v_hladilnem_delu": "4 kos",
            "Posodica_za_jajca": "2/12",
            "Posodica_za_led": "1 klasična",
            "Zamrzovalni_prostor": "3 predali",
            "Osvetlitev_zamrzovalnega_prostora": "Nima osvetlitve",
            "Nivo_hrupa_max": "39 dB(A)",
            "Število_kompresorjev": "1 kompresor",
            "Vrsta_hladilnega_sredstva": "R600A",
            "Polaganje_izdelka": "Dovoljeno",
            "Število_neodvisnih_hladilnih_sistemov": "1",
            "Širina_izdelka": "595 mm",
            "Višina_izdelka": "1785 mm",
            "Globina_izdelka": "590 mm",
            "Bruto_teža": "62 kg",
            "Neto_teža": "57 kg",
            "Širina_embaliranega_izdelka": "645 mm",
            "Višina_embaliranega_izdelka": "1860 mm",
            "Globina_embaliranega_izdelka": "628 mm",
            "Napetost": "220-240 V",
            "Frekvenca": "50 Hz",
            "Priključna_moč": "100 W",
        },
        {
            "Ime_hladilnika": "NoFrost Plus",
            "Serijska_stevilka": "NRK418EES4",
            "Kategorija": "Hladilnik z zamrzovalnikom",
            "Redna_Cena": "519.90",
            "Trenutna_Cena": "399.9",
            "Družina_izdelka": "Hladilnik z zamrzovalnikom",
            "Način_postavitve": "Samostojni",
            "Razred_energijske_učinkovitosti": "E",
            "Razred_hrupa": "C",
            "Lokacija_zamrzovalnega_prostora": "Spodaj",
            "Barva_izdelka": "Siva",
            "Barva_vrat": "Siva",
            "Material_vrat": "Predlakirana pločevina",
            "Odpiranje_vrat": "Desno menljivo",
            "Število vrat": "2",
            "Izvedba_podstavka": "2 kolesci/2 nastavljivi nogici",
            "Število_zvezdic": "Sveža hrana",
            "Klimatski_razredi": "Subnormal",
            "Skupna_prostornina": "255 l",
            "Prostornina_hladilnega_prostora": "188 l",
            "Prostornina_zamrzovalnega_prostora": "67 l",
            "Zmožnost_zamrzovanja_v_24_urah": "4 kg",
            "Shranjevalni_čas_ob_motnjah": "10 h",
            "Ocenjena_letna_poraba_energije": "215 kWh",
            "Upravljanje": "Elektronsko",
            "Indikator za odprta vrata": "Nima alarma ali glasovnega sporočila",
            "Način_odtaljevanja_hladilnega_prostora": "Avtomatsko",
            "Način_odtaljevanja_zamrzovalnega_prostora": "Avtomatsko",
            "NoFrost": "NoFrost Plus",
            "Gibanje_zraka": "Multiflow 360°: Večtočkovno 3D vpihovanje zraka",
            "Posoda za steklenice v vratih": "1 enojna posoda brez varovala",
            "Posode_v_vratih_hladilnika": "3 navadne posode",
            "Osvetlitev_hladilnega_prostora": "LED osvetlitev na stropu",
            "Število_prestavljivih_polic_v_hladilnem_delu": "3 kos",
            "Število_steklenih_polic_v_hladilnem_delu": "4 kos",
            "Posodica_za_jajca": "2/12",
            "Posodica_za_led": "1 klasična",
            "Zamrzovalni_prostor": "3 predali",
            "Osvetlitev_zamrzovalnega_prostora": "Nima osvetlitve",
            "Nivo_hrupa_max": "38 dB(A)",
            "Število_kompresorjev": "1 kompresor",
            "Vrsta_hladilnega_sredstva": "R600A",
            "Število_neodvisnih_hladilnih_sistemov": "1",
            "Širina_izdelka": "550 mm",
            "Višina_izdelka": "1797 mm",
            "Globina_izdelka": "563 mm",
            "Neto_teža": "55 kg",
            "Napetost": "220-240 V",
            "Frekvenca": "50 Hz",
            "Priključna_moč": "125 W",
        }
    ]

    const stringQuestion = JSON.stringify(testQuestion)
    const answer = await getChat(stringQuestion)
    console.log(`Question: ${stringQuestion}`)
    console.log(`Answer: ${answer}`)
}



module.exports = router;
module.exports.testAPI = testAPI;
