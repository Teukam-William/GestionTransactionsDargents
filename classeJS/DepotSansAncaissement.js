class DepotSansAncaissement
{
    // LE NUMERO DU CLIENT A QUI LE DEPOT EST FAIT SANS AOIR PRIS L'AGRGENT
    static numeroClient = document.querySelector(".inputNumeroClient");
    // LE MONTANT DU DEPOT EFFECTUER
    static montantDepot = document.querySelector(".inputMontantDepot");
    // L'OPERATEUR VIA LEQUEL LA TRANSACTION EST EFFECTUE
    static operateurDepot = document.querySelector(".selectOperateurDepot");
    // LE BOUTON POUR ENREGISTRER LE DEPOT SANS ANCAISSEMENT D'ARGENT
    static btnEnregistrer = document.querySelector(".btnEnregistrerDepotSansAncaissement");
    // LE BOUTON POUR RETOURNER A LA PAGE D'ACCCEUIL
    static btnRetour = document.querySelector(".btnRetourFenetreDepotSansAncaissement");
    // LE BOUTON POUR OUVRIR LE FENETRE D'ENREGISTREMENT DE DEPOT SANS ANCAISSEMENT
    static btnOuvrirFenetreDepotSansAncaissement = document.querySelector(".depotSansAncaissement");
    // LA FENETRE DE DEPOT SANS ANCAISSEMENT
    static fenetreDepotSansAncaissement = document.querySelector(".fenetreDepotSansAncaissement");
    
    constructor()
    {}

    ouvrirFenetreDepotSansAncaissement()
    {
        DepotSansAncaissement.btnOuvrirFenetreDepotSansAncaissement.addEventListener("click", this.ouvrir);
    }

    ouvrir()
    {
        DepotSansAncaissement.fenetreDepotSansAncaissement.style.visibility = "visible";
    }
    
    fermerFenetreDepotSansAncaissement()
    {
        DepotSansAncaissement.btnRetour.addEventListener("click", this.fermer);
    }

    fermer()
    {
        DepotSansAncaissement.fenetreDepotSansAncaissement.style.visibility = "hidden";
    }

    enregistrerDepot()
    {
        DepotSansAncaissement.btnEnregistrer.addEventListener("click", this.enregistrer);
    }

    enregistrer()
    {
        let numero = DepotSansAncaissement.numeroClient.value;
        let montant = DepotSansAncaissement.montantDepot.value;
        let operateur = DepotSansAncaissement.operateurDepot.options[DepotSansAncaissement.operateurDepot.selectedIndex].value;
        
        if( numero != '' && montant != '' && operateur != '' )
        {
            
           if(confirm("ENREGISTRER CE DEPOT DE "+montant+" SANS ANCAISSER LES "+montant+" FCFA ?"))
            { 
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '../requete/enregistrerTransaction.php');
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                numero = encodeURIComponent(numero);
                montant = encodeURIComponent(montant);
                operateur = encodeURIComponent(operateur);
                xhr.send('numero='+numero+'&montant='+montant+'&categorie='+'Depot'+'&operateur='+operateur+'&dette='+'dette');
                xhr.onreadystatechange = function (e)
                {
                    if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                    {
                        alert(xhr.responseText);  
                    }
                }
            }
        }
        else
        {
            alert("Remplisser correctement tous les champs");
        }
    }
}