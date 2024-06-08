# Pametni Asistent za Izbor Aparatov

Ta projekt je AI asistent, zasnovan za pomoč uporabnikom pri izbiri velikih in malih gospodinjskih aparatov glede na njihove specifične potrebe. Z uporabo nekaj osnovnih vprašanj asistent ustvari uporabniški profil in predlaga ustrezne aparate z spletne strani

<details>
  <summary>Kazalo</summary>
  <ol>
    <li>
    <a href="#opis-projekta">Opis projekta</a>
    </li>
    <li>
    <a href="#tehnologije">Tehnologije</a>
    </li>
    <li>
    <a href="#predpogoji">Predpogoji</a>
    </li>
    <li>
    <a href="#namestitev">Namestitev</a>
    </li>
    <li>
    <a href="#avtorji">Avtorji</a>
    </li>
  </ol>
</details>


## Opis Projekta

Uporabniki pogosto težko razlikujejo med različnimi modeli aparatov in razumejo, katere lastnosti so zanje resnično pomembne. Pametni pomočnik rešuje ta problem tako, da:
- Postavlja nekaj osnovnih vprašanj, da razume uporabnika.
- Prikazuje najbolj zanimive lastnosti prilagojene uporabnikovemu profilu.
- Priporoča 2-3 modele v različnih cenovnih razredih.

## Tehnologije

Za razvoj tega projekta uporabljamo naslednje tehnologije:

### Frontend

| HTML | CSS | JavaScript | Bootstrap |
| :--: | :-: | :--------: | :-------: |
| <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" title="HTML"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML" width="50px" height="50px"></a> | <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="CSS"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS" width="50px" height="50px"></a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a> | <a href="https://getbootstrap.com/" title="Bootstrap"><img src="https://github.com/get-icon/geticon/raw/master/icons/bootstrap.svg" alt="Bootstrap" width="50px" height="50px"></a> |

### Backend

| Node.js | Express.js |
| :-----: | :--------: |
| <a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="50px" height="50px"></a> | <a href="https://expressjs.com/" title="Express.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express.js" width="50px" height="50px"></a> |

## Predpogoji

Za razvoj tega projekta so potrebna naslednja orodja:

### <a href="https://nodejs.org/en" title="Node.js">Node.js</a>

### <a href="https://ollama.com" title="Ollama">Ollama</a>


## Namestitev

Sledite tem korakom, da namestite projekt lokalno:

1. **Klonirajte repozitorij:**

   Odprite terminal in zaženite naslednji ukaz:

   ```sh
   git clone https://github.com/kranjo4/Praktikum_II_ChatBot.git
   
2. **Pojdite v direktorij backend in namestite npm pakete**

   ```sh
   cd Praktikum_II_ChatBot/backend
   ```

   ```sh
   npm install
   ```
3. **Zaženite aplikacijo**

   ```sh
   npm run devStart
   ```
   Aplikacija bo na voljo na `http://localhost:3000`.

4. **Namestitev Ollama modela**

   4.1. Zaženite ollama strežnik

   ```sh
   ollama serve
   ```
   Strežnik bo na voljo na `http://localhost:11434`

   4.2. Pojdite v direktorij model in zaženite naslednji ukaz za namestitev modela:
   
   ```sh
   ollama create gorenjko -f Modelfile
   ```

## Avtorji

Projekt so razvili naslednji avtorji:

- **[Rok Krajnc](https://github.com/kranjo4)** - Frontend razvoj
- **[Luka Črešnar](https://github.com/LukaCresnar)** - Backend razvoj
- **[Mateja Đurić](https://github.com/matejadju)** - Razvoj modela
