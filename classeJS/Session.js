class Session
{
    // ON RECUPERE LES BOTONS PRICIPAUX DE LA PAGE D'ACCEUILLE POUR LA GESTION DES TRANSFERT
    static btnFinSession = document.querySelector(".btnFinSession");
    // LE CONSTRUCTEUR RESTE VIDE
    constructor()
    {}

    enregistrerTransaction()
    {
        let E = new EnregistrerTransaction();
        E.ouvrir();
        E.fermer();
    }
    // FONCTION POUR GERER LES MONTANTS JOURNALIERS CETTE FONCTION REGROUPE TOUTE LES SOUS ACTION NESSECAIRE A LA GESTION DE CE MODULE
    gererLesMontantsJournaliers(e)
    {
        let M = new GererMontantJournalier();
        M.ouvrir() 
        M.fermer();
        M.ouvrirFenetreDefinitionMontants();
        M.fermerFenetreDefinitionMontants();
        GererMontantJournalier.montantAct();
        M.enregistrerMontantJournalier();
        M.verification();
        // M.montantActuel();
    }
    gererLesClients()
    {
        let C = new GererClient();
        C.ouvrirFenetreGestionClient();
        C.fermerFenetreGestionClient();
        C.rechercheClient();
        C.fermerFenetreModificationClient();
    }
    depotSansAncaissement()
    {
        let D = new DepotSansAncaissement();
        D.ouvrirFenetreDepotSansAncaissement();

        D.fermerFenetreDepotSansAncaissement();
        D.enregistrerDepot();
    }
    transactionsJournaliere()
    {
        let T = new TransactionJournaliere();
        T.ouvrirFenetreTransactionJournaliere();
        T.fermerFenetreTransactionJournaliere();
        T.rechercheTransaction();
    }

    suivitTransaction()
    {
        let S = new SuivitTransaction();
        S.annulerTransaction();
        S.enregisterRetrait();
    }

    deconnexion()
    {
        Session.btnFinSession.addEventListener('click', this.deconnecter);
    }
    deconnecter()
    {
        if(confirm("VOULEZ VOUS FERMER LA SESSION ?\n\n\nCLIQUEZ SUR 'OK' POUR FERMER LA SESSION"))
        {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../requete/finSession.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send('');
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {
                    alert(xhr.responseText);
                    window.location.replace('../Vrf/');
                }
            }
        }

    }

}