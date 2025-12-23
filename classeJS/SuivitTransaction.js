class SuivitTransaction
{
    // ON RECUPERE LES ELEMENTS DE LA BOITES ALERTE RETRAIT
    
    // LA FENETRE D'ALERTE POUR LE RETRAIT
    static fenetreAlerteRetrait = document.querySelector(".fenetreAlerteRetrait");
    // LE H1 POUR AFFICHER NOM DE L'OPERATEUR POUR LE RETRAIT
    static titreTransactionRetrait = document.querySelector(".titreTransactionRetrait");
    // LE H2 POUR AFFICHEER LE NUMERO DU CLIENT
    static numeroTelClient = document.querySelector(".numeroTelClient");
    // LE H2 POUR AFFICHEER LE MONTANT
    static montant = document.querySelector(".montantR");
    // LE BOUTON POUR DIIRE QUE LE RETRAIT A ETE EFFECTUER
    static btnRetraitEff = document.querySelector(".btnRetraitEff");
    // LE BOUTON POUR ANNULER LA TRANSACTION
    static btnAnnuler = document.querySelector(".btnAnnulerR");

/*****************************************************************************/
    
    // ON RECUPERE LES ELEMENTS DE LA BOITES ALERTE DEPOT

    // LA FENETRE D'ALERTE POUR LE DEPOT
    static fenetreAlerteDepot = document.querySelector(".fenetreAlerteDepot");
    // LE H1 POUR AFFICHER NOM DE L'OPERATEUR POUR LE DEPOT
    static titreTransactionDepot = document.querySelector(".titreTransactionDepot");
    // LE H2 POUR AFFICHEER LE NUMERO DU CLIENT
    static numeroTelClientD = document.querySelector(".numeroTelClientD");
    // LE H2 POUR AFFICHEER LE MONTANT
    static montantD = document.querySelector(".montantD");
    // LE BOUTON POUR DIIRE QUE LE RETRAIT A ETE EFFECTUER
    static btnDebTransc = document.querySelector(".btnDebTransc");
    // LE BOUTON POUR ANNULER LA TRANSACTION
    static btnAnnulerD = document.querySelector(".btnAnnulerD");

    constructor()
    {}

    annulerTransaction()
    {
        SuivitTransaction.btnAnnuler.addEventListener('click', this.annulerTranscR);
        SuivitTransaction.btnAnnulerD.addEventListener('click', this.annulerTranscD);
    }
    annulerTranscR()
    {
        let operateur = SuivitTransaction.titreTransactionRetrait.textContent;
        let numClient = SuivitTransaction.numeroTelClient.textContent;
        let montant = SuivitTransaction.montant.textContent.substring(0 , SuivitTransaction.montant.textContent.length-5);

        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/annulerTransaction.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('numero='+numClient+'&montant='+montant+'&categorie='+'Retrait'+'&operateur='+operateur);
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {
                SuivitTransaction.fenetreAlerteRetrait.style.visibility = "hidden";
                var xhr2 = new XMLHttpRequest();
                xhr2.open('POST', '../requete/finSession.php');
                xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr2.send('');
                xhr2.onreadystatechange = function (e)
                {
                    if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseText == 'Fermeture de la session')
                    {
                        window.location.reload();
                    }
                }
            }
        }
    }
    annulerTranscD()
    {
        let operateur = SuivitTransaction.titreTransactionDepot.textContent;
        let numClient = SuivitTransaction.numeroTelClientD.textContent;
        let montant = SuivitTransaction.montantD.textContent.substring(0 , SuivitTransaction.montantD.textContent.length-5);

        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/annulerTransaction.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('numero='+numClient+'&montant='+montant+'&categorie='+'Depot'+'&operateur='+operateur);
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {
                SuivitTransaction.fenetreAlerteDepot.style.visibility = "hidden";
                var xhr2 = new XMLHttpRequest();
                    xhr2.open('POST', '../requete/finSession.php');
                    xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    xhr2.send('');
                    xhr2.onreadystatechange = function (e)
                    {
                        if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseText == 'Fermeture de la session')
                        {
                            window.location.reload();
                        }
                    }
            }
        }
    }

    enregisterRetrait()
    {
        SuivitTransaction.btnRetraitEff.addEventListener("click", new SuivitTransaction().enregisterR);
        SuivitTransaction.btnDebTransc.addEventListener("click", new SuivitTransaction().enregisterD);
    }

    enregisterR()
    {
        let operateur = SuivitTransaction.titreTransactionRetrait.textContent;
        let numero = SuivitTransaction.numeroTelClient.textContent;
        let montant = SuivitTransaction.montant.textContent.substring(0 , SuivitTransaction.montant.textContent.length-5);
        if(confirm("ENREGISTRER CE RETRAIT "+operateur+" DE "+montant+" FCFA ?"))
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/enregistrerTransaction.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send('numero='+numero+'&montant='+montant+'&categorie='+'Retrait'+'&operateur='+operateur);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {
                    alert(xhr.responseText);
                    SuivitTransaction.fenetreAlerteRetrait.style.visibility = "hidden";
                    var xhr2 = new XMLHttpRequest();
                    xhr2.open('POST', '../requete/finSession.php');
                    xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    xhr2.send('');
                    xhr2.onreadystatechange = function (e)
                    {
                        if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseText == 'Fermeture de la session')
                        {
                            window.location.reload();
                        }
                    }
                }
            }
        }
    }
    
    enregisterD()
    {
        let operateur = SuivitTransaction.titreTransactionDepot.textContent;
        let numero = SuivitTransaction.numeroTelClientD.textContent;
        let montant = SuivitTransaction.montantD.textContent.substring(0 , SuivitTransaction.montantD.textContent.length-5);
        if(confirm("ENREGISTRER CE DEPOT "+operateur+" DE "+montant+" FCFA ?"))
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/enregistrerTransaction.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send('numero='+numero+'&montant='+montant+'&categorie='+'Depot'+'&operateur='+operateur);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {
                    alert(xhr.responseText);
                    SuivitTransaction.fenetreAlerteDepot.style.visibility = "hidden";
                    var xhr2 = new XMLHttpRequest();
                    xhr2.open('POST', '../requete/finSession.php');
                    xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    xhr2.send('');
                    xhr2.onreadystatechange = function (e)
                    {
                        if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseText == 'Fermeture de la session')
                        {
                            window.location.reload();
                        }
                    }
                    
                }
            }
        }
    }

    static demarrerTransaction()
    {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/initierTransaction.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('');
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {
                let infosTransaction = xhr.responseText.split('*');
                if(infosTransaction[0] == 'EN_COURS' && infosTransaction[1] == 'Retrait')
                {
                    SuivitTransaction.titreTransactionRetrait.textContent = infosTransaction[2];
                    SuivitTransaction.numeroTelClient.textContent = infosTransaction[3];
                    SuivitTransaction.montant.textContent = infosTransaction[4];
                    SuivitTransaction.fenetreAlerteRetrait.style.visibility = "visible";
                }
                else if(infosTransaction[0] == 'EN_COURS' && infosTransaction[1] == 'Depot')
                {
                    SuivitTransaction.titreTransactionDepot.textContent = infosTransaction[2];
                    SuivitTransaction.numeroTelClientD.textContent = infosTransaction[3];
                    SuivitTransaction.montantD.textContent = infosTransaction[4];
                    SuivitTransaction.fenetreAlerteDepot.style.visibility = "visible";
                }
            }
        }
    }
}