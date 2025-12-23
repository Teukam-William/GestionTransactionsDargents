class GererClient
{
    static btnGererClient = document.querySelector(".gererClient");
    
    //BOUTON ANNULER DE LA FENETRE DE MODIFICATION CLIENT
    static btnAnnuler = document.querySelector(".btnAnnuler");
   
    // BOUTON D'ENREGISTREMENT DES MODIFICATION DE LA FENETRE DE MODIFICATION
    static btnEnregistrer = document.querySelector(".btnEnregistrer");
    
    // CHAMPS DE RECHERCHE DES CLIENTS
    static rechercheClient = document.querySelector(".rechercheClient");
    
    static btnRetourGererClient = document.querySelector(".btnRetourGererClient");
   
    // FENETRE DE GESTION DES CLIENTS
    static fenetreGererClient = document.querySelector(".fenetreGererClient");
   
    // FENETRE DE MODIFICATION DES CLIENTS
    static fenetreModifierClient = document.querySelector(".fenetreModifierClient");
   
    // LISTE DES CLIENTS
    static listeClient = document.querySelector(".listeClient");
   
    // CHAMPS DE SAISIE DU NOM MODIFIER DU CLIENT
    static inputNomClient = document.querySelector(".nomClient");
   
    // CHAMPS DE SAISIE DU NUMERO MODIFIER DU CLIENT
    static inputNumeroClient = document.querySelector(".numeroClient");
   
    // L'ELEMENT DE RECHERCHE SAISIE PAR L'UTILISATEUR'
    static eltRech  = '';

    // NOM DU CLIENT DONT ON VEUT MODIFIER LES INFORMATIONS
    static nomClientAmodif
    // NUMERO DU CLIENT DONT ON VEUT MODIFIER LES INFORMATIONS
    static numeroClientAmodif

    constructor()
    {}
    ouvrirFenetreGestionClient()
    {
        GererClient.btnGererClient.addEventListener("click", this.ouvrir);
    }
    ouvrir()
    {
        GererClient.fenetreGererClient.style.visibility = "visible";
    }
    fermerFenetreGestionClient()
    {
        GererClient.btnRetourGererClient.addEventListener("click", this.fermer);
    }
    fermer()
    {
        GererClient.fenetreGererClient.style.visibility = "hidden";
    }
    // ON AJOUTE LA FONCTION DE RECHERCHE A L'INPUT
    rechercheClient()
    {
        // GererClient.eltRech += String.fromCharCode(e.keyCode);
        new GererClient().rechercher("keypress");
        GererClient.rechercheClient.addEventListener("keydown", this.supprimeCaractere);
        GererClient.rechercheClient.addEventListener("keypress", this.rechercher);
    }
    rechercher(e)
    {   
        if( ((e.keyCode) >= 48 && (e.keyCode) <= 57) || ((e.keyCode) >= 65 && (e.keyCode) <= 90) || ((e.keyCode) >= 97 && (e.keyCode) <= 122) || ((e.keyCode) >= 128 && (e.keyCode) <= 154) )
        {
            GererClient.eltRech += String.fromCharCode(e.keyCode);
        }
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', '../requete/rechercherClient.php');
        xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        // xhr2.setRequestHeader('content-type',  'text/xml');
        xhr2.withCredentials = true;
        xhr2.overrideMimeType('text/xml');
        let eltRecherche = encodeURIComponent(GererClient.eltRech);
        xhr2.send('eltRecherche='+eltRecherche);
        xhr2.onreadystatechange = function ()
        {
            if(xhr2.readyState == 4 && xhr2.status == 200)
            {
                let i = 0;
                GererClient.listeClient.innerHTML = xhr2.responseXML.querySelector('div').innerHTML;
                // alert(GererClient.listeClient.childNodes[0].innerHTML)
                for(i = 0; i < GererClient.listeClient.childNodes.length; i++)
                {
                    // alert(i);
                    // ON ATTRIBUT LES CLASS A CHAQUE ELEMENT POUR LE RENDU
                    GererClient.listeClient.childNodes[i].setAttribute("class","infosClient");
                    GererClient.listeClient.childNodes[i].childNodes[0].setAttribute("class","nomClient");
                    GererClient.listeClient.childNodes[i].childNodes[1].setAttribute("class", "numeroTel");

                    GererClient.listeClient.childNodes[i].childNodes[2].setAttribute("class", "imgModif");
                    GererClient.listeClient.childNodes[i].childNodes[2].addEventListener("click", new GererClient().ouvrirFenetreModificationClient);
                    GererClient.listeClient.childNodes[i].childNodes[2].childNodes[0].src = "../images/iconeDoptions/modifier.png";

                    GererClient.listeClient.childNodes[i].childNodes[3].setAttribute("class", "imgSuppr");
                    GererClient.listeClient.childNodes[i].childNodes[3].addEventListener("click", GererClient.supprimerClient);
                    GererClient.listeClient.childNodes[i].childNodes[3].childNodes[0].src = "../images/iconeDoptions/supprimer.png";


                }
            }
        }
    }

    supprimeCaractere(e)
    {
        // alert(e.keyCode);
        if(e.keyCode == 8)
        {
            GererClient.eltRech = GererClient.eltRech.substring(0, (GererClient.eltRech.length-1) );
            // alert(GererClient.eltRech);
            new GererClient().rechercher(e);
        }
    }

    static supprimerClient()
    {
        if(confirm('Supprimer le client '+this.parentNode.childNodes[0].textContent+' ?'))
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/supprimerClient.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            let nomClient = encodeURIComponent(this.parentNode.childNodes[0].textContent);
            let numeroClient = encodeURIComponent(this.parentNode.childNodes[1].textContent);
            xhr.send('nomClient='+nomClient+'&numeroClient='+numeroClient);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {
                    alert(xhr.responseText);
                    new GererClient().rechercher(e)

                }
            }
        }
    }

    ouvrirFenetreModificationClient()
    {
        GererClient.fenetreModifierClient.style.visibility = "visible";
        GererClient.inputNomClient.value = this.parentNode.childNodes[0].textContent;
        GererClient.nomClientAmodif = this.parentNode.childNodes[0].textContent;
        GererClient.inputNumeroClient.value = this.parentNode.childNodes[1].textContent;
        GererClient.numeroClientAmodif = this.parentNode.childNodes[1].textContent;
        GererClient.btnEnregistrer.addEventListener("click", new GererClient().enregistrerModifClient);
    }
    enregistrerModifClient()
    {
        if( GererClient.inputNomClient.value == GererClient.nomClientAmodif && GererClient.inputNumeroClient.value == GererClient.numeroClientAmodif )
        {
            alert("AUCUNE MODIFICATION APPORTER AUX INFORMATIONS DE CLIENT");
        }
        else
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/modifierClient.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            let nouveauNomClient = encodeURIComponent(GererClient.inputNomClient.value);
            let nouveauNumeroClient = encodeURIComponent(GererClient.inputNumeroClient.value);
            let ancienNomClient = encodeURIComponent(GererClient.nomClientAmodif);
            let ancienNumeroClient = encodeURIComponent(GererClient.numeroClientAmodif);
            xhr.send('ancienNomClient='+ancienNomClient+'&ancienNumeroClient='+ancienNumeroClient+'&nouveauNomClient='+nouveauNomClient+'&nouveauNumeroClient='+nouveauNumeroClient);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {
                    alert(xhr.responseText);
                    new GererClient().rechercher(e)
                    new GererClient().fermerFenetreModifClient()

                }
            }
        }

    }
    fermerFenetreModificationClient()
    {
        GererClient.btnAnnuler.addEventListener("click", this.fermerFenetreModifClient);
    }
    fermerFenetreModifClient()
    {
        GererClient.fenetreModifierClient.style.visibility = "hidden";
    }
    // fermerFenetreGestionClient
}