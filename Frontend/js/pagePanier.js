export {ecouterBtnRecycle, onLoadFunction, getPanier, formValidity,postCommandeComplete  };
export let tableauItems;
import {url} from '../script.js';

let prixTotal = document.getElementById('prixTotal');
function ecouterBtnRecycle() {
    //création bouton recycler
    let recyclePanier = document.getElementById("btnRecycle");
    //déclenchement bouton recycle uniquement sur la page panier
    if (recyclePanier) {
        recyclePanier.addEventListener('click', () => {
            localStorage.clear();
            console.log("panier supprimé !");
            onLoadFunction();
        })
    }
};
// Verification du nombre d'oject dans le panier lors d'un reload de page
function onLoadFunction() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        document.querySelector('.cart span').textContent = 0;
    }
}

// fONCTION GetPanier(), on récupère les objets contenu dans le locale storage pour les afficher
function getPanier() { //construction du panier 
    //récupération du local Storatge
    let cartItems = JSON.parse(localStorage.getItem('articleInCart'));
    prixTotal = 0;
    //création du tableau avec les objets du local storage
    if (cartItems) {
        tableauItems = Object.keys(cartItems).map(function (key) { return cartItems[key]; });
        console.log(tableauItems, cartItems);
        // fonction affichage dans le panier des articles du local storage
        tableauItems.forEach((cartItems) => {
            //création de la div contenant toutes les informations d'un article
            let cardBodyPanier = document.createElement('div');
            cardBodyPanier.setAttribute('class', 'row justify-content-between border border-dark');
            document.getElementById('cardBodyPanier').insertBefore(cardBodyPanier, document.getElementById('divPrixTotal'));
            //création de la case Nom Meuble de l'article
            let nomMeubleItem = document.createElement("div");
            nomMeubleItem.setAttribute('class', 'nomMeuble col-6 border-right border-dark');
            cardBodyPanier.appendChild(nomMeubleItem);
            // mise en place du nom du meuble
            let textMeuble = document.createElement("div");
            nomMeubleItem.appendChild(textMeuble)
            textMeuble.textContent = cartItems.name + ' Vernis : ' + cartItems.selectVarnish;
            textMeuble.setAttribute("class", "align")
            // Mise en place de l'image
            let imgMeuble = document.createElement('img');
            nomMeubleItem.appendChild(imgMeuble);
            imgMeuble.setAttribute("src", cartItems.imageUrl);
            imgMeuble.setAttribute("alt", 'une Image de notre meuble : ' + cartItems.name);
            imgMeuble.setAttribute('class', "imagePanier")
            // mise en place de la quantité
            let quantiteMeubleItem = document.createElement('div');
            quantiteMeubleItem.setAttribute('class', 'quantite col-2 align border-right border-dark');
            cardBodyPanier.appendChild(quantiteMeubleItem);
            let moinsMeubleItem = document.createElement('div');
            quantiteMeubleItem.appendChild(moinsMeubleItem);
            moinsMeubleItem.setAttribute('class', 'quantityPanier fas fa-arrow-alt-circle-left moinsMeuble');
            moinsMeubleItem.setAttribute('id', 'moins' + cartItems.name + cartItems.selectVarnish);
            let textQuantiteMeubleItem = document.createElement('div');
            textQuantiteMeubleItem.setAttribute = ('class', "quantityPanier align quantity");
            quantiteMeubleItem.appendChild(textQuantiteMeubleItem);
            textQuantiteMeubleItem.textContent = cartItems.quantity;
            let plusMeubleItem = document.createElement('div');
            quantiteMeubleItem.appendChild(plusMeubleItem);
            plusMeubleItem.setAttribute('class', 'quantityPanier fas fa-arrow-alt-circle-right plusMeuble');
            plusMeubleItem.setAttribute('id', 'plus' + cartItems.name + cartItems.selectVarnish);
            let suppMeubleItem = document.createElement('div');
            quantiteMeubleItem.appendChild(suppMeubleItem);
            suppMeubleItem.setAttribute('class', 'quantityPanier fas fa-times-circle');
            suppMeubleItem.setAttribute('id', 'supp' + " " + cartItems.name + " " + cartItems.selectVarnish);
            //construction des boutons moins, plus, supp 
            //construction bouton supp
            let btnsuppMeubleItem = document.getElementById("supp" + " " + cartItems.name + " " + cartItems.selectVarnish);
            btnsuppMeubleItem.addEventListener('click', () => {
                let articleInCart = JSON.parse(localStorage.getItem('articleInCart'));
                let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
                delete articleInCart[cartItems.name + " " + cartItems.selectVarnish];
                localStorage.setItem('articleInCart', JSON.stringify(articleInCart));
                localStorage.setItem('cartNumbers', productNumbers - 1)
                document.location.reload();
            })
            //construction du bouton moins
            let btnMoinsMeubleItem = document.getElementById("moins" + cartItems.name + cartItems.selectVarnish);
            btnMoinsMeubleItem.addEventListener('click', () => {
                cartItems.quantity = parseInt(cartItems.quantity) - 1;
                textQuantiteMeubleItem.textContent = cartItems.quantity;
                let articleInCart = JSON.parse(localStorage.getItem('articleInCart'));
                articleInCart[cartItems.name + " " + cartItems.selectVarnish].quantity = cartItems.quantity;
                localStorage.setItem('articleInCart', JSON.stringify(articleInCart));
                document.location.reload();
            })
            //construction du bouton plus
            let btnPlusMeubleItem = document.getElementById("plus" + cartItems.name + cartItems.selectVarnish);
            btnPlusMeubleItem.addEventListener('click', () => {
                cartItems.quantity = parseInt(cartItems.quantity) + 1;
                console.log(cartItems.quantity, cartItems);
                textQuantiteMeubleItem.textContent = cartItems.quantity;
                let articleInCart = JSON.parse(localStorage.getItem('articleInCart'));
                articleInCart[cartItems.name + " " + cartItems.selectVarnish].quantity = cartItems.quantity;
                localStorage.setItem('articleInCart', JSON.stringify(articleInCart));
                document.location.reload();
            })
            // mise en place du prix
            let prixMeubleItem = document.createElement("div");
            prixMeubleItem.setAttribute("class", "quantite col-2 border-right align border-dark");
            prixMeubleItem.textContent = cartItems.price + ' €';
            cardBodyPanier.appendChild(prixMeubleItem);
            let coloneTotalMeuble = document.createElement('div');
            coloneTotalMeuble.setAttribute('class', 'quantite col-2 align totalMeuble');
            cardBodyPanier.appendChild(coloneTotalMeuble);
            let totalPrixMeuble = cartItems.price * cartItems.quantity;
            totalPrixMeuble = parseFloat(totalPrixMeuble).toFixed(2);
            coloneTotalMeuble.textContent = totalPrixMeuble + " €";
            prixTotal = parseFloat(prixTotal).toFixed(2);
            prixTotal = parseFloat(prixTotal) + parseFloat(totalPrixMeuble);
        });
    }
    let afficheTotal = document.getElementById('prixTotal');
    afficheTotal.textContent = prixTotal.toFixed(2) + ' €';
    sessionStorage.setItem('prixTotal', JSON.stringify(prixTotal.toFixed(2)));
}

export let mail, prenom, nom, ville, address; //déclaration variable pour créer l'élément contact
//fonction validation questionnaire
function formValidity() {
    let noNumbers = /[0-9]/;
    let mailCheck = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/);
    mail = document.getElementById('email').value;
    prenom = document.getElementById('prenom').value;
    nom = document.getElementById("nom").value;
    ville = document.getElementById("ville").value;
    address = document.getElementById("address").value;
    if (noNumbers.test(prenom) === true || prenom == ''
        || noNumbers.test(nom) === true || nom == ''
        || noNumbers.test(ville) === true || ville == '' || address == '') {
        console.log('les champs sont mal remplis');
        return false;
    } else if (mailCheck.test(mail) === false) {
        console.log("le mail est faux")
        return false;
    }
    else if (Array.isArray(tableauItems) == false || tableauItems == null) {
        console.log('le tableau est vide')
        return false;
    } else {
        return true;
    }
};
//Post la commande
function postCommandeComplete(commandeComplete) {
    fetch(url + "/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: commandeComplete
    }).then(response => {
        return response.json();
    }).then(r => {
        sessionStorage.setItem('contact', JSON.stringify(r.contact));
        sessionStorage.setItem('orderId', JSON.stringify(r.orderId));
        sessionStorage.setItem('tableauItem', JSON.stringify(tableauItems));
        window.location.replace("./commandeComplete.html")
    })
}
