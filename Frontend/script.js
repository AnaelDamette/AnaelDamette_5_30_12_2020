//création constant url pour plus de facilité à l'appeler
const url = "http://localhost:3000/api/furniture";

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
getOneMeuble.then((produitMeuble) => { showOneMeuble(produitMeuble) });
//verification :Promise = objet
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

    //mise en place de l'option
    let optionVarnish = document.createElement('form');
    bodyProduitCard.appendChild(optionVarnish);
    let titleOption = document.createElement('h5');
    optionVarnish.appendChild(titleOption);
    optionVarnish.textContent = "Vernis";
    let optionVernis = document.createElement('select');
    optionVarnish.appendChild(optionVernis);
    optionVernis.setAttribute('id', 'vernis');
    optionVernis.setAttribute('name', 'varnish');

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
    let btnProduitCard = document.createElement("a")
    bodyProduitCard.appendChild(btnProduitCard);
    btnProduitCard.setAttribute('class', 'btn btn-primary')
    btnProduitCard.setAttribute('id', 'setLocalStorage')
    btnProduitCard.textContent = 'Mettre au panier';
};
 //cration bouton recycler
let recyclePanier = document.getElementById("btnRecycle");
console.log(recyclePanier);
//déclenchement bouton recycle uniquement sur la page panier
if (recyclePanier == true) {
    console.log("prêt a enlevé le panier !! ");
    recyclePanier.addEventListener('click', () => {
        localStorage.clear();
    })
}
//création bouton addtocart
let addToCart = document.getElementById('setLocalStorage');
//déclenchement bouton addtocart uniquement sur la page produit
if (addToCart == true) {
    console.log("le bouton existe");
    addToCart.addEventListener('click', () => {
        console.log("bouton add to cart")
    })
}