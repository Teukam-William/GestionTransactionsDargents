class DefinirMontant
{
    static operateur = document.getElementsByName("operateur");
    static categorieDeTransaction = document.querySelector(".categorieDeTransaction");
    static mont = document.querySelector(".inputDefMont");
    static boutonEnrg = document.querySelector(".btnEnrgMontDepot");
    constructor()
    {

    }

    enregisterMontant()
    {
        DefinirMontant.boutonEnrg.addEventListener("click", this.enregistrer);
    }
    enregistrer()
    {

        let op;
        let montant = DefinirMontant.mont;
        let categorie = DefinirMontant.categorieDeTransaction.options[DefinirMontant.categorieDeTransaction.selectedIndex];
        if(DefinirMontant.operateur[0].checked == true)
        {
            op = "Orange";
        }
        else if(DefinirMontant.operateur[1].checked == true)
        {
            op = "MTN";
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/enregistrerMontantJr.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        op = encodeURIComponent(op);
        montant = encodeURIComponent(montant.value);
        categorie = encodeURIComponent(categorie.value);
        xhr.send('op='+op+'&montant='+montant+'&categorie='+categorie);
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {  
                if(xhr.responseText == "Deja Defini")
                {
                    if(confirm("VOUS AVEZ DEJA DEFINI LE MONTANT JOURNALIER POUR LES DEPOTS POUR CETTE OPERATEUR: "+op+"\n\n\n CLIQUEZ SUR OK POUR CONFIRMER LA MODIFICATION") == true)
                    {
                        modifierMontantJournalier();
                    }
                    else
                    {
                        alert('ANNULER');
                    }
                }
                else
                {
                    alert(xhr.responseText);
                }
            }
        }                                                                                                                                                     
        function modifierMontantJournalier()
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/enregistrerMontantJr.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            op = encodeURIComponent(op);
            montant = encodeURIComponent(DefinirMontant.mont.value);
            categorie = encodeURIComponent(DefinirMontant.categorieDeTransaction.options[DefinirMontant.categorieDeTransaction.selectedIndex].value);
            xhr.send('mOp='+op+'&mMontant='+montant+'&mCategorie='+categorie);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {  
                    alert(xhr.responseText);
                }
            }
        }

    }
}