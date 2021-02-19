export {appelApi, showAllMeuble};
import {url} from '../script.js';
// création de la fonction : obtenir les meubles
//variable nouvelle promesse
let getAllMeuble;
function appelApi (){
    getAllMeuble = new Promise((resolve) => {
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
}
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