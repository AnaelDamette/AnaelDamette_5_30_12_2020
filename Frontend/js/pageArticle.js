export { appelApiUnMeuble, showOneMeuble, setItems };
import {meuble} from '../script.js';
const url = "http://localhost:3000/api/furniture";

let getOneMeuble;
function appelApiUnMeuble() {
    //récupération de l'id de l'objet selectionné
    let id = location.search.substring(1);
    var urlMeuble = url + "/" + id;
    //récupération de l'objet par l'api
    getOneMeuble = new Promise((resolve, reject) => {
        //initialisation lien server
        var lienServerObjet = new XMLHttpRequest()
        //fonction récupération 
        lienServerObjet.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText))
            } else {
                reject = console.log('erreur dans le chargement de la page')
                return
            }
        }
        //Ouvre ce qu'il y a dans url
        lienServerObjet.open("GET", urlMeuble);
        // Envois au client ce qu'il y a dans url
        lienServerObjet.send();
    });
    
    getOneMeuble.then((produitMeuble) => { showOneMeuble(produitMeuble) });
}

function showOneMeuble(produitMeuble) {
    // construction carte pour le produit meuble
    let cardProduitMeuble = document.createElement("div");
    cardProduitMeuble.setAttribute('class', 'card col-12 p-2 m-2');
    document.getElementById("produitMeuble").appendChild(cardProduitMeuble);
    //mise en place de l'image dans la carte
    let imageProduitCard = document.createElement('img');
    cardProduitMeuble.appendChild(imageProduitCard);
    imageProduitCard.setAttribute('src', produitMeuble.imageUrl);
    imageProduitCard.setAttribute("class", 'card-img-top');
    imageProduitCard.setAttribute('alt', 'Une Image de notre meuble : ' + produitMeuble.name);
    //mise en place du texte sous l'image
    let bodyProduitCard = document.createElement('div');
    cardProduitMeuble.appendChild(bodyProduitCard);
    bodyProduitCard.setAttribute("class", 'cord-body');
    //mise en place du titre
    let titleProduitCard = document.createElement('h5');
    bodyProduitCard.appendChild(titleProduitCard);
    titleProduitCard.setAttribute('class', 'cord-title');
    titleProduitCard.textContent = produitMeuble.name;
    //mise en place de la description
    let descriptionProduitCard = document.createElement('p');
    bodyProduitCard.appendChild(descriptionProduitCard);
    descriptionProduitCard.setAttribute('class', 'card-text text-justify');
    descriptionProduitCard.textContent = produitMeuble.description;
    //mise en pace du prix
    let prixProduitCard = document.createElement('p');
    bodyProduitCard.appendChild(prixProduitCard);
    prixProduitCard.setAttribute('class', 'card-text text-justify');
    prixProduitCard.textContent = produitMeuble.price / 1000 + "€";
    //mise en place du formulaire
    let formulaire = document.createElement('form');
    bodyProduitCard.appendChild(formulaire);
    //mise en place de l'option
    let optionVarnish = document.createElement('div');
    formulaire.appendChild(optionVarnish);
    let titleOption = document.createElement('h5');
    optionVarnish.appendChild(titleOption);
    optionVarnish.textContent = "Vernis";
    let optionVernis = document.createElement('select');
    optionVarnish.appendChild(optionVernis);
    optionVernis.setAttribute('id', 'vernis');
    optionVernis.setAttribute('class', 'formulaireProduit');
    optionVernis.setAttribute('name', 'varnish');
    // mise en place de la quantité à mettre dans le panier 
    let quantiteProduit = document.createElement('div');
    quantiteProduit.setAttribute('class', "mt-2")
    formulaire.appendChild(quantiteProduit);
    let titleQuantiteProduit = document.createElement('label');
    quantiteProduit.appendChild(titleQuantiteProduit);
    titleQuantiteProduit.textContent = 'Quantité';
    let moinsMeubleItem = document.createElement('div');
    quantiteProduit.appendChild(moinsMeubleItem);
    moinsMeubleItem.setAttribute('class', 'quantityPanier fas fa-arrow-alt-circle-left moinsMeuble formulaireProduit');
    let NbQuantiteProduit = document.createElement("input");
    quantiteProduit.appendChild(NbQuantiteProduit);
    NbQuantiteProduit.setAttribute('id', 'quantiteProduit');
    NbQuantiteProduit.setAttribute('class', 'formulaireProduit quantity');
    NbQuantiteProduit.setAttribute('type', 'number');
    NbQuantiteProduit.setAttribute('min', '1');
    NbQuantiteProduit.setAttribute('value', 1)
    NbQuantiteProduit.setAttribute('step', '1');
    NbQuantiteProduit.quantiteProduit = 1;
    let plusMeubleItem = document.createElement('div');
    quantiteProduit.appendChild(plusMeubleItem);
    plusMeubleItem.setAttribute('class', 'quantityPanier fas fa-arrow-alt-circle-right plusMeuble formulaireProduit');
    //construction du bouton moins
    let btnMoinsMeubleItem = document.querySelector('.moinsMeuble');
    btnMoinsMeubleItem.addEventListener('click', () => {
        NbQuantiteProduit.value = parseInt(NbQuantiteProduit.value, 10) - 1;
        NbQuantiteProduit.textContent = parseInt(NbQuantiteProduit.value, 10);
        console.log(typeof (NbQuantiteProduit.value))
    })
    //construction du bouton plus
    let btnPlusMeubleItem = document.querySelector('.plusMeuble');
    btnPlusMeubleItem.addEventListener('click', () => {
        NbQuantiteProduit.value = parseInt(NbQuantiteProduit.value, 10) + 1;
        NbQuantiteProduit.textContent = parseInt(NbQuantiteProduit.value, 10);
    })
    //rajouter une fonction pour prendre la valeurQantiteProduit directement après la saisis de l'utilisateur!
    let valeurQuantiteProduit = 1;
    NbQuantiteProduit.addEventListener("input", (e) => {
        valeurQuantiteProduit = e.target.value;
        valeurQuantiteProduit = parseFloat(valeurQuantiteProduit);
        console.log(valeurQuantiteProduit, typeof (valeurQuantiteProduit));
    });
    //création de la boucle foreach
    let selectionVernis = produitMeuble.varnish;
    selectionVernis.forEach(colorVernis => {
        //pour chaque colorVernis on créer l'élément option
        let couleurVernis = document.createElement("option");
        //On le place en enfant de optionVernis
        optionVernis.appendChild(couleurVernis);
        //on lui attribus la value = colorVernis
        couleurVernis.setAttribute('value', colorVernis);
        couleurVernis.textContent = colorVernis;
    });
    //mise en place du bouton
    let btnProduitCard = document.createElement("button")
    formulaire.appendChild(btnProduitCard);
    btnProduitCard.setAttribute('class', 'btn btn-primary');
    btnProduitCard.setAttribute('id', 'setLocalStorage');
    btnProduitCard.setAttribute('type', 'submit');
    btnProduitCard.textContent = 'Mettre au panier';
    //création bouton addtocart
    let addToCart = document.getElementById('setLocalStorage');
    //déclenchement bouton addtocart uniquement sur la page produit
    if (addToCart) {
        addToCart.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("le bouton existe");
            let vernis = document.getElementById("vernis").value;
            console.log("bouton add to cart")
            let article = new meuble(produitMeuble.name, produitMeuble.price / 1000, produitMeuble.imageUrl, vernis, 0, produitMeuble._id);
            console.log(Number.isInteger(valeurQuantiteProduit));
            console.log(valeurQuantiteProduit);
            console.log(valeurQuantiteProduit > 0);
            if (Number.isInteger(valeurQuantiteProduit) == true && valeurQuantiteProduit > 0) {
                setItems(article);
            } else { alert("votre quantité doit être supérieur à zéro et être entière.") }
        });
    }
}
// Fonction : mettres les articles dans le local storage
function setItems(article) {
    let cartItems = localStorage.getItem('articleInCart');
    let NbQuantiteProduit = document.getElementById('quantiteProduit').value;
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    NbQuantiteProduit = parseInt(NbQuantiteProduit);
    cartItems = JSON.parse(cartItems); // récupération de ce qu'il y a dans articleInCart (notre panier)
    if (cartItems != null) { // Si le panier n'est pas vide on le remplis
        if (cartItems[article.name + ' ' + article.selectVarnish] == undefined) { // Si le nom de l'objet mis dans le panier est différent de celui déjà ajouté on rajoute le nouvel objet
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
            cartItems = {
                ...cartItems,
                [article.name + ' ' + article.selectVarnish]: article
            }
        }
        cartItems[article.name + ' ' + article.selectVarnish].quantity += NbQuantiteProduit; // on ajoute la nouvelle quantité à l'objet
    } else { //on défini notre panier avec l'objet et la quantité à 1
        article.quantity = NbQuantiteProduit;
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
        cartItems = {
            [article.name + ' ' + article.selectVarnish]: article
        }
    }
    //on ajoute au local storage notre nouvel articleInCart
    localStorage.setItem('articleInCart', JSON.stringify(cartItems));
}