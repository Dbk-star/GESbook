let ventes = JSON.parse(localStorage.getItem("ventes")) || [];

let liste = document.getElementById("liste-ventes");
let filtreDate = document.getElementById("filtre-date");
let filtreCategorie = document.getElementById("filtre-categorie");
let resetBtn = document.getElementById("reset-filtre");

function afficherVentes(data){

liste.innerHTML="";

data.forEach(v => {

let div = document.createElement("div");

div.classList.add("produit");

div.innerHTML = `
<h3>${v.produit}</h3>
<p>Catégorie : ${v.categorie}</p>
<p>Quantité : ${v.quantite}</p>
<p>Date : ${v.date}</p>
<p>Heure : ${v.heure}</p>
`;

liste.appendChild(div);

});

}

function filtrer(){

let dateChoisie = filtreDate.value;
let categorieChoisie = filtreCategorie.value;

let ventesFiltrees = ventes.filter(v => {

let matchDate = !dateChoisie || v.date.startsWith(dateChoisie);
let matchCategorie = !categorieChoisie || v.categorie === categorieChoisie;

return matchDate && matchCategorie;

});

afficherVentes(ventesFiltrees.reverse());

}

filtreDate.addEventListener("change", filtrer);
filtreCategorie.addEventListener("change", filtrer);

resetBtn.addEventListener("click", () => {

filtreDate.value="";
filtreCategorie.value="";

afficherVentes([...ventes].reverse());

});

afficherVentes([...ventes].reverse());