let produits = JSON.parse(localStorage.getItem("produits")) || [];

let selectProduit = document.getElementById("produit");
let panierDiv = document.getElementById("panier");

let panier = [];

produits.forEach((p, index) => {

let option = document.createElement("option");

option.value = index;
option.textContent = `${p.nom} (stock : ${p.stock})`;

selectProduit.appendChild(option);

});

document.getElementById("ajouter-panier").addEventListener("click", () => {

let indexProduit = selectProduit.value;
let quantite = Number(document.getElementById("quantite").value);

if(!quantite){
alert("Entre une quantité");
return;
}

panier.push({
index: indexProduit,
nom: produits[indexProduit].nom,
quantite: quantite
});

afficherPanier();

});

function afficherPanier(){

panierDiv.innerHTML = "";

panier.forEach(item => {

let div = document.createElement("div");

div.classList.add("produit");

div.innerHTML = `
${item.nom} - Quantité : ${item.quantite}
`;

panierDiv.appendChild(div);

});

}

document.getElementById("valider-vente").addEventListener("click", () => {

let ventes = JSON.parse(localStorage.getItem("ventes")) || [];

panier.forEach(item => {

if(produits[item.index].stock < item.quantite){

alert(`Stock insuffisant pour ${item.nom}`);

return;

}

produits[item.index].stock -= item.quantite;

let maintenant = new Date();

let date = maintenant.toISOString().split("T")[0];

let heure = maintenant.toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit"
});

ventes.push({
produit: item.nom,
categorie: produits[item.index].categorie,
quantite: item.quantite,
date: date,
heure: heure
});

});

localStorage.setItem("produits", JSON.stringify(produits));
localStorage.setItem("ventes", JSON.stringify(ventes));

alert("Vente enregistrée !");

panier = [];

afficherPanier();

});