// Récupérer les produits depuis le LocalStorage
let produits = JSON.parse(localStorage.getItem("produits")) || [];

// Fonction pour mettre à jour les statistiques
function updateDashboard() {

let totalProduits = produits.length;

let stockFaibleProduits = produits.filter(p => p.stock > 0 && p.stock <= 5);

let ruptureProduits = produits.filter(p => p.stock === 0);

// Mettre à jour l'interface
document.getElementById("total").textContent = totalProduits;
document.getElementById("low").textContent = stockFaibleProduits.length;
document.getElementById("out").textContent = ruptureProduits.length;

afficherAlertes(stockFaibleProduits);

}

function afficherAlertes(produitsFaibles){

const zoneAlertes = document.getElementById("alertes-stock");

zoneAlertes.innerHTML = "";

produitsFaibles.forEach(p => {

let div = document.createElement("div");

div.classList.add("alert");

div.innerHTML = `
<span>⚠ Stock faible : ${p.nom} (${p.stock} restants)</span>
<button class="close-alert">✖</button>
`;

div.querySelector(".close-alert").addEventListener("click", () => {
div.remove();
});

zoneAlertes.appendChild(div);

});

}

// Lancer au chargement de la page
updateDashboard();


/*installation du service worker pour le mode hors ligne(comme pour une apk mobile)*/
if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("/service-worker.js")
.then(() => console.log("Service Worker enregistré"))
.catch(err => console.log("Erreur SW :", err));
}