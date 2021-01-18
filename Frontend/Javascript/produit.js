
//création constant url pour plus de facilité à l'appeler
const url = "http://localhost:3000/api/furniture";

function produit() {
    //récupération de l'id de l'objet selectionné
    let id = location.search.substring(1);
    console.log('lid est :' + id)
    var urlMeuble = url + "/" + id;
    console.log(urlMeuble)
    //récupération de l'objet par l'api
    let getOneMeuble = new Promise((resolve, reject) => {
        //initialisation lien server
        var lienServer = new XMLHttpRequest()
        //fonction récupération 
        lienServer.onload = function () {
            if (this.readyState = XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText))
            } else {
                reject = console.log('erreur dans le chargement de la page')
                return
            }
        }
        //Ouvre ce qu'il y a dans url
        lienServer.open("GET", urlMeuble);
        // Envois au client ce qu'il y a dans url
        lienServer.send();

    });
    getOneMeuble.then((produitMeuble) => { showOneMeuble(produitMeuble) });


    //verification :Promise = objet
    console.log(getOneMeuble);

    function showOneMeuble(produitMeuble) { //fonction Montre un Meuble affiche l'objet getOneMeuble


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

        // // //mise en pace du prix
        let prixProduitCard = document.createElement('p');
        bodyProduitCard.appendChild(prixProduitCard);
        prixProduitCard.setAttribute('class', 'card-text text-justify');
        prixProduitCard.textContent = produitMeuble.price / 1000 + "€";

        //mise en place du bouton
        let btnProduitCard = document.createElement("a")
        bodyProduitCard.appendChild(btnProduitCard);
        btnProduitCard.setAttribute('class', 'btn btn-primary')
        btnProduitCard.textContent = 'Mettre au panier';


    };
};
export { produit };