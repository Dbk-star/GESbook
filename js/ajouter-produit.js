const form = document.getElementById("form-produit");

form.addEventListener("submit", function(e){

e.preventDefault();

let nom = document.getElementById("nom").value;
let categorie = document.getElementById("categorie").value;
let prix = document.getElementById("prix").value;
let stock = document.getElementById("stock").value;

let produits = JSON.parse(localStorage.getItem("produits")) || [];

let nouveauProduit = {
nom: nom,
categorie: categorie,
prix: Number(prix),
stock: Number(stock)
};

produits.push(nouveauProduit);

localStorage.setItem("produits", JSON.stringify(produits));

alert("Produit ajouté avec succès !");

form.reset();

});