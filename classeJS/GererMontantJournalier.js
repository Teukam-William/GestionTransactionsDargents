class GererMontantJournalier
{
    static btnOuvrirFenetreGestionMontantsJournalier = document.querySelector(".gererMontJr");

    // LA FENETRE DE GESTIONDES MONTANTS JOURNAIER
    static fenetreDeGestionDesMontantsJournalier = document.querySelector(".modaleGererMontant");
   
    // LES ELEMENTS DE LA FENETRE DE GESTION DES MONTANTS JURNALIER
    // LE BOUTON DE RETOUR A LA PAGE D'CCAUILE
    static btnRetourEnteteMontantJr = document.querySelector(".btnRetourEnteteMontantJr");
    // LA ZONE DE TEXTE QUI VA AFFICHER LE MONTANT DES DEPOT ORANGE AU FURE ET A MESURE QUE LES TRANSACTIONS S'EFFECTURONS DANS LA JOURNEES
    static valMonActDepOrange = document.querySelector(".valMonActDepOrange");
   
    // LA ZONE DE TEXTE QUI VA AFFICHER LE MONTANT DES DEPOT ORANGE AU FURE ET A MESURE QUE LES TRANSACTIONS S'EFFECTURONS DANS LA JOURNEES   
    static valMonActDepMtn = document.querySelector(".valMonActDepMtn");
   
    // LA ZONE DE TEXTE QUI VA AFFICHER LE MONTANT DE LA CAISSE AU FURE ET A MESURE QUE LES TRANSACTIONS S'EFFECTURONS DANS LA JOURNEES   
    static valMonActCaisse = document.querySelector(".valMonActCaisse");
   
    // LE BOUTON QUI SERVIR A OUVRIR LA FENETRE DE DEFINITION DES MONTANTS
    static btnDefMont = document.querySelector(".btnDefMont");

    // LA FENTRE POUR DEFINIR LES MONTANTS
    static fenetreDeDefinitionDesMontantsJounalier = document.querySelector(".defMontantDepot");
    
    // LES ELEMENTS DE LA FENETRE DE DEFIITION DES MONTANTS JURNALIERS
    // LE BOUTON DE RETOUR A A PAGE DE GESTION DES MONTANT JOURNALIERS
    static btnRetourDefMontantDepot = document.querySelector(".btnRdetourDefMontantDepot");
    
    //  LA LISTE DE SELECTION DES OPERATEURS
    static operateur = document.querySelector(".operateur");
    
    // LA LISTE DE SELECTION DU TYPE DE TRANSACTION
    static categorie = document.querySelector(".categorie");
    
    // LE CHMPS DE SAISIE DU MONTANT JOURNALIER
    static montant = document.querySelector(".montant");

    // LE BOUTON POUR ENREGISTRER LE MONTANT JOURNALIER SAISIE
    static ergMontJour = document.querySelector(".ergMontJour");

    constructor()
    {}
    
    ouvrir()
    {
        // ON RELIE LE BOUTON A LA FONCTION D'OUVERTURE
        GererMontantJournalier.btnOuvrirFenetreGestionMontantsJournalier.addEventListener("click", this.afficheFenetreGestionMontJr);
        
    }
    // FONCTION POUR AFFICHER LA FENETRE DE GESTION DE MONTANT JOURNALIER 
    afficheFenetreGestionMontJr()
    {
        GererMontantJournalier.fenetreDeGestionDesMontantsJournalier.style.visibility = "visible";
        GererMontantJournalier.montantAct();
    }
    fermer()
    {
        // ON RELIE L'ELEMENT DE FERMETURE A LA FONCTION DE FERMETURE
        GererMontantJournalier.btnRetourEnteteMontantJr.addEventListener("click", this.fermerFenetreGestionMontJr);
    }   
    fermerFenetreGestionMontJr()
    {
        GererMontantJournalier.fenetreDeGestionDesMontantsJournalier.style.visibility = "hidden";
    }

    ouvrirFenetreDefinitionMontants()
    {
        GererMontantJournalier.btnDefMont.addEventListener("click",this.ouvrirFenetreDefinitionMontantsJournalier);
    }
    ouvrirFenetreDefinitionMontantsJournalier()
    {
        GererMontantJournalier.fenetreDeDefinitionDesMontantsJounalier.style.visibility="visible";
    }
    
    fermerFenetreDefinitionMontants()
    {
        GererMontantJournalier.btnRetourDefMontantDepot.addEventListener("click",this.fermerFenetreDefinitionMontantsJournalier);
    }
    fermerFenetreDefinitionMontantsJournalier()
    {
        GererMontantJournalier.fenetreDeDefinitionDesMontantsJounalier.style.visibility="hidden";
        GererMontantJournalier.montantAct();
    }

    // LA FONCTION QUI SERA CHARGER DE RECUPER LES MONTANT ACTUEL DE LA CAISSE DES DEPOTMTN ET ORANGE
    static montantAct()
    {   
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/montActDepOrg.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('');
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {
                GererMontantJournalier.valMonActDepOrange.textContent = xhr.responseText;
            }
            else
            {
                GererMontantJournalier.valMonActDepOrange.textContent = '0 FCFA';
            }
        }
        
        var xhr2 = new XMLHttpRequest();
        xhr2.open('POST', '../requete/montActDepMtn.php');
        xhr2.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr2.send('');
        xhr2.onreadystatechange = function (e)
        {
            if(xhr2.readyState == 4 && xhr2.status == 200 && xhr2.responseText != '')
            {
                GererMontantJournalier.valMonActDepMtn.textContent = xhr2.responseText;
            }
            else
            {
                GererMontantJournalier.valMonActDepMtn.textContent = '0 FCFA';
            }
        }
        
        var xhr3 = new XMLHttpRequest();
        xhr3.open('POST', '../requete/montActCaisse.php');
        xhr3.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr3.send('');
        xhr3.onreadystatechange = function (e)
        {
            if(xhr3.readyState == 4 && xhr3.status == 200 && xhr3.responseText != '')
            {
                GererMontantJournalier.valMonActCaisse.textContent = xhr3.responseText;
            }
            else
            {
                GererMontantJournalier.valMonActCaisse.textContent = '0 FCFA'
            }
        }
    }

    enregistrerMontantJournalier()
    {
        GererMontantJournalier.ergMontJour.addEventListener("click", this.enregistrer);
    }
    enregistrer()
    {

        let operateur = GererMontantJournalier.operateur.options[GererMontantJournalier.operateur.selectedIndex].value;
        let montant = GererMontantJournalier.montant.value;
        let categorie = GererMontantJournalier.categorie.options[GererMontantJournalier.categorie.selectedIndex].value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/enregistrerMontantJr.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        operateur = encodeURIComponent(operateur);
        montant = encodeURIComponent(montant);
        categorie = encodeURIComponent(categorie);
        xhr.send('op='+operateur+'&montant='+montant+'&categorie='+categorie);
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {  
                if(xhr.responseText == "Deja Defini")
                {
                    if(confirm("VOUS AVEZ DEJA DEFINI LE MONTANT JOURNALIER POUR LES DEPOTS POUR : "+operateur+"\n\n\n CLIQUEZ SUR OK POUR CONFIRMER LA MODIFICATION") == true)
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
            let operateur = encodeURIComponent(GererMontantJournalier.operateur.options[GererMontantJournalier.operateur.selectedIndex].value);
            let montant = encodeURIComponent(GererMontantJournalier.montant.value);
            let categorie = encodeURIComponent(GererMontantJournalier.categorie.options[GererMontantJournalier.categorie.selectedIndex].value);
            xhr.send('mOp='+operateur+'&mMontant='+montant+'&mCategorie='+categorie);
            xhr.onreadystatechange = function (e)
            {
                if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                {  
                    alert(xhr.responseText);
                }
            }
        }

    }
    verification()
    {
        GererMontantJournalier.operateur.addEventListener("change", this.verifierLesChamps);
        GererMontantJournalier.categorie.addEventListener("change", this.verifierLesChampsC);
    }
    verifierLesChamps()
    {
        if( GererMontantJournalier.operateur.options[GererMontantJournalier.operateur.selectedIndex].value == "Caisse")
        {
            GererMontantJournalier.categorie.selectedIndex = 1;
        }
        else
        {
            GererMontantJournalier.categorie.selectedIndex = 0;
        }
    }
    
    verifierLesChampsC()
    {
        if( GererMontantJournalier.categorie.options[GererMontantJournalier.categorie.selectedIndex].value = "Retrait" )
        {
            GererMontantJournalier.operateur.selectedIndex = 2;
        }
        else
        {
            GererMontantJournalier.operateur.selectedIndex = 0;
        }
    }
}