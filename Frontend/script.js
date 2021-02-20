import { appelApi, showAllMeuble } from './js/pageIndex.js';
import {afficherCommandeComplete} from './js/pageConfirmation.js'
import { appelApiUnMeuble, setItems } from './js/pageArticle.js';
import {ecouterBtnRecycle, onLoadFunction, getPanier, formValidity,postCommandeComplete  } from './js/pagePanier.js';
import {mail, prenom, nom, ville, address, tableauItems} from './js/pagePanier.js';
//création constant url pour plus de facilité à l'appeler
export const url = "http://localhost:3000/api/furniture";
export class meuble {
    constructor(name, price, imageUrl, selectVarnish, quantity, _id) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.selectVarnish = selectVarnish;
        this.quantity = quantity;
        this._id = _id;
    }
};
export class objetContact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};

let pageIndex = document.getElementById("article");

//création condition : charger les fonctions appelApi et showAllMeuble uniquement sur la page index.html
if (pageIndex) {
    appelApi();
    showAllMeuble();
};

//création condition : charger la fonction showOneMeuble uniquement sur la page article
let pageArticle = document.getElementById("produitMeuble");
if (pageArticle) {
    appelApiUnMeuble()
}

let pagePanier = document.getElementById("cardBodyPanier");
//appel des fonctions uniquement sur la page panier
if (pagePanier) {
    getPanier()
    ecouterBtnRecycle()
}

// Validation du questionnaire
let forms = document.querySelector(".needs-validation");
if (forms) {
    forms.addEventListener('submit', (event) => {
        event.preventDefault();
        if (formValidity(forms) === false) {
            event.stopPropagation();
            forms.classList.add('was-validated');
            console.log("le formulaire n'est pas envoyé")
            return
        }
        let contact = new objetContact(prenom, nom, address, ville, mail);
        //let cartItems = JSON.parse(localStorage.getItem("articleInCart"));
        let products = [];
        let commandeComplete = JSON.stringify({
            contact,
            products,
        });
        tableauItems.forEach((cartItems) => {
            products.push(cartItems._id)
        })
        postCommandeComplete(commandeComplete);
    })
}
onLoadFunction();
if (document.querySelector('.messageConfirmation')) {
    afficherCommandeComplete();
}
