
# MiniShop v2 – UI testimise aruanne

Nimi: Dominik Bogdanov

## 1. Töö eesmärk

Selle töö eesmärk oli testida MiniShop v2 veebipoodi.
Kasutasin Playwrighti ja TypeScripti.

## 2. Testide hooldus

Kasutasin ShopPage klassi ja fixtures.ts faili.
See aitab teste lihtsamalt kirjutada ja muuta.

## 3. Uued testid

Kirjutasin testid UI-11 kuni UI-18.
Kontrollisin sorteerimist, ostukorvi koguseid,
sooduskoode ja e-posti aadresse.

UI-16 testis kasutasin test.step funktsiooni.
UI-18 testis kasutasin nelja erinevat e-posti aadressi.

## 4. Leitud vead

Leidsin kolm viga:

1. Hindade sorteerimine ei töötanud õigesti.
2. Ostukorvis sai määrata koguseks 0.
3. SAVE10 soodustus ei arvestanud kogu ostukorvi.

Parandasin need vead failis shop.js.

## 5. Ebastabiilne test

FLAKY-01 test kasutas alguses kindlat ooteaega.
Muutsin testi nii, et see ootab tellimuse kinnitust.

Pärast parandamist läbis test 6 kontrolli 6-st.

## 6. Mobiilitestid

Testisin veebipoodi arvutis ja mobiilivaates.

Tulemus: 44 testi läbis kontrolli.

## 7. GitHub Actions

Projektis on fail .github/workflows/ui-tests.yml.
See käivitab testid automaatselt GitHubis.

## 8. Kokkuvõte

Õppisin kirjutama ja parandama UI teste.
Sain teada, kuidas kasutada fixtures.ts faili,
test.step funktsiooni ja erinevaid testandmeid.

Järgmisena võiks lisada rohkem teste
ja kontrollida veebipoodi erinevates brauserites.
