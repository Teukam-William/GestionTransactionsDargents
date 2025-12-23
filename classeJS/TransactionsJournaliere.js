class TransactionJournaliere
{
    static btnTransactionJournaliere = document.querySelector(".transactionJournaliere");
  
    // CHAMPS DE RECHERCHE DES CLIENTS
    static rechercheTransaction = document.querySelector(".rechercheTransaction");
    // LA DATE POUR AVOIR UNIQUEMENT LES TRANSACTIONS D'UNE JOURNEE
    static dateJour = document.querySelector(".dateJourR");
    
    static btnRetourFenetreTransactionJournaliere = document.querySelector(".btnRetourFenetreTransactionJournaliere");
   
    // FENETRE DE GESTION DES CLIENTS
    static fenetreTransactionJournaliere = document.querySelector(".fenetreTransactionsJournaliere");
   
    // LISTE DES CLIENTS
    static listeTransactions = document.querySelector(".listeTransactions");
   
    // L'ELEMENT DE RECHERCHE SAISIE PAR L'UTILISATEUR'
    static eltRech  = '';


    constructor()
    {}
    ouvrirFenetreTransactionJournaliere()
    {
        TransactionJournaliere.btnTransactionJournaliere.addEventListener("click", this.ouvrir);
    }
    ouvrir()
    {
        new TransactionJournaliere().rechercher("keypress");
        TransactionJournaliere.fenetreTransactionJournaliere.style.visibility = "visible";
    }
    fermerFenetreTransactionJournaliere()
    {
        TransactionJournaliere.btnRetourFenetreTransactionJournaliere.addEventListener("click", this.fermer);
    }
    fermer()
    {
        TransactionJournaliere.fenetreTransactionJournaliere.style.visibility = "hidden";
    }
    // ON AJOUTE LA FONCTION DE RECHERCHE A L'INPUT
    rechercheTransaction()
    {
        // TransactionJournaliere.eltRech += String.fromCharCode(e.keyCode);
        new TransactionJournaliere().rechercher("keypress");
        TransactionJournaliere.dateJour.addEventListener("change", this.rechercher);
        TransactionJournaliere.rechercheTransaction.addEventListener("keydown", this.supprimeCaractere);
        TransactionJournaliere.rechercheTransaction.addEventListener("keypress", this.rechercher);
    }
    rechercher(e)
    {   
        if( ((e.keyCode) >= 48 && (e.keyCode) <= 57) || ((e.keyCode) >= 65 && (e.keyCode) <= 90) || ((e.keyCode) >= 97 && (e.keyCode) <= 122) || ((e.keyCode) >= 128 && (e.keyCode) <= 154) )
        {
            TransactionJournaliere.eltRech += String.fromCharCode(e.keyCode);
        }
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', '../requete/rechercherTransaction.php');
        xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        // xhr2.setRequestHeader('content-type',  'text/xml');
        xhr2.withCredentials = true;
        xhr2.overrideMimeType('text/xml');
        let dateJour =  encodeURIComponent(TransactionJournaliere.dateJour.value);
        let eltRecherche = encodeURIComponent(TransactionJournaliere.eltRech);
        xhr2.send('eltRecherche='+eltRecherche+'&dateJour='+dateJour);
        xhr2.onreadystatechange = function ()
        {
            if(xhr2.readyState == 4 && xhr2.status == 200)
            {
                let i = 0;
                TransactionJournaliere.listeTransactions.innerHTML = xhr2.responseXML.querySelector('div').innerHTML;
                // alert(TransactionJournaliere.listeTransactions.childNodes[0].innerHTML)
                for(i = 0; i < TransactionJournaliere.listeTransactions.childNodes.length; i++)
                {
                    // alert(i);
                    // ON ATTRIBUT LES CLASS A CHAQUE ELEMENT POUR LE RENDU
                    TransactionJournaliere.listeTransactions.childNodes[i].setAttribute("class","infosTransaction");

                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[0].setAttribute("class","categorieOperateur");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[0].childNodes[0].setAttribute("class", "categorie");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[0].childNodes[1].setAttribute("class", "operateur");
                    
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[1].setAttribute("class","clientNumero");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[1].childNodes[0].setAttribute("class", "client");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[1].childNodes[1].setAttribute("class", "numero");
                    
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[2].setAttribute("class","montantDate");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[2].childNodes[0].setAttribute("class", "montant");
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[2].childNodes[1].setAttribute("class", "date");
                    
                    // ON DETERMINE SI ON C'EST UNE TRANSACTION NON SOLDER (NS) OU SOLDER (S) EN FONCTION DE LA VALEUR DU DERNIER ELEMENT
                    TransactionJournaliere.listeTransactions.childNodes[i].childNodes[3].setAttribute("class","etatPayement");
                    if(TransactionJournaliere.listeTransactions.childNodes[i].childNodes[3].textContent == "NS")
                    {
                        TransactionJournaliere.listeTransactions.childNodes[i].childNodes[3].addEventListener("click", new TransactionJournaliere().solderTransaction);
                        TransactionJournaliere.listeTransactions.childNodes[i].childNodes[3].parentNode.style.backgroundColor =  'red';
                        TransactionJournaliere.listeTransactions.childNodes[i].childNodes[3].parentNode.style.color =  'white';
                    }
                }
            }
        }

        
    }

    supprimeCaractere(e)
    {
        // alert(e.keyCode);
        if(e.keyCode == 8)
        {
            TransactionJournaliere.eltRech = TransactionJournaliere.eltRech.substring(0, (TransactionJournaliere.eltRech.length-1) );
            // alert(TransactionJournaliere.eltRech);
            new TransactionJournaliere().rechercher(e);
        }
    }
    
    // CETTE FONCTION SERA UTILISER POUR MODIFIER L'ETAT DE PAYEMENT D'UNE TRANSATION
    solderTransaction(e)
    {
        if(confirm('AVEZ VOUS RECU LA SOMME DE '+ this.parentNode.childNodes[2].childNodes[0].textContent +' FCFA ?\n\nAPPUYER SUR OKAY POUR MARQUER CETTE TRANSACTION SOLDER'))
        {
            var xhr = new XMLHttpRequest();

            let categorie = encodeURIComponent(this.parentNode.childNodes[0].childNodes[0].textContent);
            let operateur = encodeURIComponent(this.parentNode.childNodes[0].childNodes[1].textContent);
            
            let nomClient = encodeURIComponent(this.parentNode.childNodes[1].childNodes[0].textContent);
            let numeroClient = encodeURIComponent(this.parentNode.childNodes[1].childNodes[1].textContent);
            
            let montant = encodeURIComponent(this.parentNode.childNodes[2].childNodes[0].textContent.substring(0, (this.parentNode.childNodes[2].childNodes[0].textContent.length-4) ) );
            let date = encodeURIComponent(this.parentNode.childNodes[2].childNodes[1].textContent);
            xhr.open('POST', '../requete/solderTransaction.php');
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send('categorie='+categorie+'&operateur='+operateur+'&nomClient='+nomClient+'&numeroClient='+numeroClient+'&montant='+montant+'&date='+date);
            xhr.onreadystatechange = function(e)
            {
                if(xhr.readyState == 4 && xhr.status == 200)
                {
                    alert(xhr.responseText);
                    new TransactionJournaliere().rechercher(e);
                }
            }
        }
    }
}