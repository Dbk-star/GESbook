let produits = JSON.parse(localStorage.getItem("produits")) || [];

const liste = document.getElementById("liste-produits");
const search = document.getElementById("search");

function afficherProduits(filtre = "") {

liste.innerHTML = "";

let produitsFiltres = produits.filter(p =>
p.nom.toLowerCase().includes(filtre.toLowerCase())
);

produitsFiltres.forEach((p, index) => {

let div = document.createElement("div");

div.classList.add("produit");

div.innerHTML = `
<h3>${p.nom}</h3>
<p>Catégorie : ${p.categorie}</p>
<p>Prix : ${p.prix} €</p>
<p>Stock : ${p.stock}</p>

<button onclick="modifierProduit(${index})">✏ Modifier</button>
<button onclick="supprimerProduit(${index})">🗑 Supprimer</button>
`;

liste.appendChild(div);

});

}

function supprimerProduit(index){

if(confirm("Supprimer ce produit ?")){

produits.splice(index,1);

localStorage.setItem("produits", JSON.stringify(produits));

afficherProduits();

}

}

function modifierProduit(index){

let nouveauPrix = prompt("Nouveau prix :", produits[index].prix);

let nouveauStock = prompt("Nouveau stock :", produits[index].stock);

produits[index].prix = Number(nouveauPrix);
produits[index].stock = Number(nouveauStock);

localStorage.setItem("produits", JSON.stringify(produits));

afficherProduits();

}

search.addEventListener("input", (e)=>{
afficherProduits(e.target.value);
});

afficherProduits();