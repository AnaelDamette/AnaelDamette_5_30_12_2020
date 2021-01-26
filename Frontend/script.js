//création constant url pour plus de facilité à l'appeler
const url = "http://localhost:3000/api/furniture";
class meuble {
    constructor(name, price, imageUrl, selectVarnish, quantity) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.selectVarnish = selectVarnish;
        this.quantity = quantity;
    }
}
let article;
// création de la fonction : obtenir les meubles
//variable nouvelle promesse
let getAllMeuble = new Promise((resolve, reject) => {
    //initialisation lien server
    var lienServer = new XMLHttpRequest()
    //fonction récupération 
    lienServer.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(JSON.parse(this.responseText))
        } else {
            reject = console.log('erreur dans le chargement de la page')
            return
        }
    }
    //Ouvre ce qu'il y a dans url
    lienServer.open("GET", url);
    // Envois au client ce qu'il y a dans url
    lienServer.send();

});
getAllMeuble.then((data) => { console.log(data) });
//verification :Promise : array (5)

//création condition : charger la fonction showAllMeuble uniquement sur la page index.html grâce à l'id article
let pageIndex = document.getElementById("article");
if (pageIndex) {
    async function showAllMeuble() {
        const meubles = await getAllMeuble;
        meubles.forEach(meuble => {

            // construction carte pour les meubles
            let cardMeuble = document.createElement("div");
            cardMeuble.setAttribute('class', 'card col-md-5 p-2 m-2 col-xs-12');
            document.getElementById("article").appendChild(cardMeuble);

            // mise en place de l'image dans la carte
            let imageCard = document.createElement('img');
            cardMeuble.appendChild(imageCard);
            imageCard.setAttribute('src', meuble.imageUrl);
            imageCard.setAttribute('class', "card-img-top");
            imageCard.setAttribute('alt', 'Une image de notre meuble');

            // Mise en place du texte sous l'image dans la carte
            let bodyCard = document.createElement('div');
            cardMeuble.appendChild(bodyCard);
            bodyCard.setAttribute('class', 'cord-body');

            // mise en place du titre
            let titleCard = document.createElement('h5');
            bodyCard.appendChild(titleCard);
            titleCard.setAttribute('class', 'card-title')
            titleCard.textContent = meuble.name;
            //mise en place du bouton    
            let btnCard = document.createElement("a")
            bodyCard.appendChild(btnCard);
            btnCard.setAttribute('class', 'btn btn-primary btn-produitMeuble')
            btnCard.textContent = 'Voir ' + meuble.name;
            btnCard.setAttribute('href', 'article.html?' + meuble._id)


        })
    };
    showAllMeuble();
}

//récupération de l'id de l'objet selectionné
let id = location.search.substring(1);
var urlMeuble = url + "/" + id;
//récupération de l'objet par l'api
let getOneMeuble = new Promise((resolve, reject) => {
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

//création condition : charger la fonction showOneMeuble uniquement sur la page article
let pageArticle = document.getElementById("produitMeuble");
if (pageArticle) {
    getOneMeuble.then((produitMeuble) => { showOneMeuble(produitMeuble) });

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
        formulaire.appendChild(quantiteProduit);
        let titleQuantiteProduit = document.createElement('label');
        quantiteProduit.appendChild(titleQuantiteProduit);
        titleQuantiteProduit.textContent = 'Quantité';
        let NbQuantiteProduit = document.createElement("input");
        quantiteProduit.appendChild(NbQuantiteProduit);
        NbQuantiteProduit.setAttribute('id', 'quantiteProduit');
        NbQuantiteProduit.setAttribute('class', 'formulaireProduit');
        NbQuantiteProduit.setAttribute('type', 'number');
        NbQuantiteProduit.setAttribute('min', '1');
        NbQuantiteProduit.setAttribute('step', '1');

        //rajouter une fonction pour prendre la valeurQantiteProduit directement après la saisis de l'utilisateur!
        let valeurQuantiteProduit;
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
                article = new meuble(produitMeuble.name, produitMeuble.price / 1000, produitMeuble.imageUrl, vernis, 0);
                console.log(Number.isInteger(valeurQuantiteProduit));
                console.log(valeurQuantiteProduit);
                console.log(valeurQuantiteProduit > 0);
                if (Number.isInteger(valeurQuantiteProduit) == true && valeurQuantiteProduit > 0) {
                    setItems(article);
                } else { alert("votre quantité doit être supérieur à zéro et être entière.") }
            });
        }
    }
}

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
// Verification du nombre d'oject dans le panier lors d'un reload de page
function onLoadFunction() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        document.querySelector('.cart span').textContent = 0;
    }
}
// Fonction : mettres les articles dans le local storage
function setItems(article) {
    let cartItems = localStorage.getItem('articleInCart');
    let NbQuantiteProduit = document.getElementById('quantiteProduit').value;
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
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

// fONCTION GetPanier(), on récupère les objets contenu dans le locale storage pour les afficher
let pagePanier = document.getElementById("cardBodyPanier");
if (pagePanier) { getPanier() } //appel de la fonction uniquement sur la page panier

function getPanier() { //construction du panier 
    //récupération du local Storatge
    let cartItems = localStorage.getItem('articleInCart');
    cartItems = JSON.parse(cartItems);
    
    //création du tableau avec les objets du local storage
    var tableauItems = Object.keys(cartItems).map(function(key) { return cartItems[key];});
    let prixTotal = 0;
    console.log(prixTotal);
    

    // fonction affichage dans le panier des articles du local storage
    tableauItems.forEach(cartItems => {
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
        textMeuble.textContent = cartItems.name + ' Vernis : '+ cartItems.selectVarnish;
        textMeuble.setAttribute("class" , "align")
        
        // Mise en place de l'image
        let imgMeuble = document.createElement('img');
        nomMeubleItem.appendChild(imgMeuble);
        imgMeuble.setAttribute("src", cartItems.imageUrl);
        imgMeuble.setAttribute("alt", 'une Image de notre meuble : ' + cartItems.name);
        imgMeuble.setAttribute('class', "imagePanier")

        // mise en place de la quantité
        let supprimerMeubleItem = document.createElement('div');
        supprimerMeubleItem.setAttribute('class', 'quantite col-2 align border-right border-dark');
        supprimerMeubleItem.innerHTML = '<i class="quantityPanier fas fa-arrow-alt-circle-left"></i>' + cartItems.quantity+ '<i class="quantityPanier fas fa-arrow-alt-circle-right"></i>' + '<i class="quantityPanier fas fa-times-circle"></i>';
        cardBodyPanier.appendChild(supprimerMeubleItem);

        // mise en place du prix
        let prixMeubleItem = document.createElement("div");
        prixMeubleItem.setAttribute("class", "quantite col-2 border-right align border-dark");
        prixMeubleItem.textContent = cartItems.price + ' €';
        cardBodyPanier.appendChild(prixMeubleItem);      
        
        let coloneTotalMeuble = document.createElement('div');
        coloneTotalMeuble.setAttribute('class', 'quantite col-2 align totalMeuble');
        cardBodyPanier.appendChild(coloneTotalMeuble);
        let totalPrixMeuble = cartItems.price * cartItems.quantity;
        totalPrixMeuble = parseFloat(totalPrixMeuble).toFixed(1);
        coloneTotalMeuble.textContent = totalPrixMeuble + " €";    
        prixTotal = parseFloat(prixTotal) + parseFloat(totalPrixMeuble);
        
    });
    let afficheTotal = document.getElementById('prixTotal');
    afficheTotal.textContent = prixTotal+ ' €'; 
}

let prixTotal = document.getElementsByClassName('totalMeuble');
console.log(typeof(prixTotal.value));
onLoadFunction()