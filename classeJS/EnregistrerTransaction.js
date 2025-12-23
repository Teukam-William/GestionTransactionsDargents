class EnregistrerTransaction
{
    // LE BOUTON POUR OUVRIR LA FENETRE D'ENREGISTREMENT DES TRANSACTIONS
    static btnEnrgTransc = document.querySelector(".enrgTransc");

    // BOUTON POUR FERMER LA FENETRE D'ENREGISTREME?T DES TRRANSACTIONS
    static btnRetourEnteteEnrgTrans = document.querySelector(".btnRetourEnteteEnrgTrans");

    // LA FENETRE D'ENREGISTREMENT DES TRANSACTIONS
    static fenetreEnrgTransc = document.querySelector(".fenetreEnrgTransc");

    constructor()
    {}

    ouvrir()
    {
        // ON RELIE LE BOUTON A LA FONCTION D'OUVERTURE
        EnregistrerTransaction.btnEnrgTransc.addEventListener("click", this.afficheFenetreEnrgTrans);
        
    }
    // FONCTION POUR AFFICHER LA FENETRE DE GESTION DE MONTANT JOURNALIER 
    afficheFenetreEnrgTrans()
    {
        EnregistrerTransaction.fenetreEnrgTransc.style.visibility = "visible";
    }
    fermer()
    {
        // ON RELIE L'ELEMENT DE FERMETURE A LA FONCTION DE FERMETURE
        EnregistrerTransaction.btnRetourEnteteEnrgTrans.addEventListener("click", this.fermerFenetreEnrgTrans);
    }   
    fermerFenetreEnrgTrans()
    {
        EnregistrerTransaction.fenetreEnrgTransc.style.visibility = "hidden";
    }

}