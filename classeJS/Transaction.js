class Transaction
{
    // ON RECUPERE LES ELEMENTS DONT ON AURA BESOIN 
    static numeroTel = document.querySelector(".numeroTel");
    static montant = document.querySelector(".montant");
    static operateur = document.getElementsByName("operateur");
    static depotRetrait = document.getElementsByName("depotRetrait");
    static boiteDepot = document.querySelector(".boiteDepot");
    static boiteRetrait = document.querySelector(".boiteRetrait");
    static boiteOrange = document.querySelector(".boiteOrange");
    static boiteMtn = document.querySelector(".boiteMtn");
    static btnDemarrer = document.querySelector(".btnDemarrer");
    static modalEtatTransaction = document.querySelector(".modalEtatTransaction");
    static modalTransactionImpossible = document.querySelector(".modalTransactionImpossible");
    static fenetreAlerteDepotTerm = document.querySelector(".fenetreAlerteDepotTerm");
    static fenetreAlerteDepotAnnuler = document.querySelector(".fenetreAlerteDepotAnnuler");
    static btnOKNouvMont = document.querySelector(".btnOKNouvMont");
    constructor()
    {}

    // CETTE FONCTION EST POUR DEBUTTER LA TRANSACTION ELLE VA FAIRE UNE SORTE DE DEMANDE EN ENVOYANT LES INFORMATION DE LA TRANSACTION AU RESPONSABLE DES TRANSACTIONS
    demarrerTransaction()
    {
        Transaction.btnDemarrer.addEventListener("click", this.demarrer);
    }
    // DANS CETTE FONCTION ON VA DEMARER LA DEMANDE ET PUIS ON VA CONTROLER L'EVOLUTION AVEC UNE FONCTION QUI VA SE REPETER INFINIMENT JUSQU'A TROUVER DEUX ALTERNATIVES SOIT LE RETRAIT EST POSSIBLE SOIT LE RETRAIT EST ANNULER
    demarrer()
    {
        let numero = Transaction.numeroTel.value;
        let opNum = parseInt(numero.substring(0, numero.length-6));
        let montant = Transaction.montant.value;
        let categorie;
        for(let i = 0; i < Transaction.depotRetrait.length; i++)
        {
            if(Transaction.depotRetrait[i].checked == true)
            {
                categorie = Transaction.depotRetrait[i].value;   
            }
        }
        let operateur;
        for(let i = 0; i < Transaction.operateur.length; i++)
        {
            if(Transaction.operateur[i].checked == true)
            {
                operateur = Transaction.operateur[i].value;   
            }
        }
        if(numero != ""  && montant != "" && categorie != "" && operateur != "")
        {
            if( ( ( opNum >= 690 && opNum <= 699 ) && operateur == 'MTN') || ( ( opNum >= 655 && opNum <= 659 ) && operateur == 'MTN')   )
            {
                alert('CE NUMERO N\'EST PAS CELUI D\'UN OPERATEUR MTN');
            }
            else if( ( ( opNum > 669 && opNum < 680 ) && operateur == 'Orange') || ( ( opNum > 649 && opNum < 655 ) && operateur == 'Orange')   )
            {
                alert("CE NUMERO N'EST PAS CELUI D'UN OPERATEUR ORANGE");
            }
            else if(numero.length > 9 )
            {
                alert("NUMERO INVALIDE !!!");
            }
            else
            {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '../requete/demarrerTransaction.php');
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.send('numero='+numero+'&montant='+montant+'&categorie='+categorie+'&operateur='+operateur);
                xhr.onreadystatechange = function (e)
                {
                    if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
                    {
                        // SI LA REPONSE EST "en cours" ALORS LA TRANSACTION A ETE PRISE EN COMPTE A CE MOMENT ON COMMENCE A SUIVRE L'EVOLUTION
                        // ON AVISE LE CLIENT POUR LUI DIRE QUE SA TRANSACTION EST EN COURS PUIS ON DEMARRE LA BOUCLE QUI VA SUIVRE L'EVOLUTON DE LA TRANSACTION
                        if(xhr.responseText == "en cours")
                        {
                            Transaction.modalEtatTransaction.style.visibility = "visible";
                            //ON CONTROLE L'EVOLUTION DE LA TRANSACTION AVEC UNE BOUCLE INFINI
                            let controlEvolution = window.setTimeout(function ctrEvl(){
                                
                                var xhrC = new XMLHttpRequest();
                                xhrC.open('POST', '../requete/controlEvolTrans.php');
                                xhrC.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                                xhrC.send('numero='+numero+'&montant='+montant+'&categorie='+categorie+'&operateur='+operateur);
                                xhrC.onreadystatechange = function (e)
                                {
                                    if(xhrC.readyState == 4 && xhrC.status == 200 && xhrC.responseText != '')
                                    {
                                        if(xhrC.responseText == 'ANNULER')
                                        {
                                            // SI LA DEMANDE A ETE ANNULER ON SUPPRIME LA TRANSACTION PUIS ON AFFICHE LE MESSAGE POUR NOTIFIER AU CLIENT QUE LA TRANSACTION EST ANNULER PUIS ON ACTUALISE LA PAGE DU CLIENT
                                            var xhrA = new XMLHttpRequest();
                                            xhrA.open('POST', '../requete/suppTrans.php');
                                            xhrA.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                                            xhrA.send('numero='+numero+'&montant='+montant+'&categorie='+categorie+'&operateur='+operateur);
                                            xhrA.onreadystatechange = function (e)
                                            {
                                                if(xhrA.readyState == 4 && xhrA.status == 200 && xhrA.responseText == 'ANNULER')
                                                {
                                                    // ON ARRETE LA BOUCLE 
                                                    clearTimeout(controlEvolution);
                                                    // DES QUE LA TRANSACTION EST SUPPRIMER ON  AFFICHE LE MESSAGE POUR DIRE AU CLIENT QUE LA TRANSACTION EST ANULER PUIS ON ACTUALISE LA PAGE
                                                    Transaction.modalEtatTransaction.style.visibility = "hidden";
                                                    Transaction.fenetreAlerteDepotAnnuler.style.visibility = "visible";
                                                    
                                                    // // ON VIDE TOUT LE FORMULAIRE PUIS ON C+ACTUALISE LA PAGE
                                                    // Transaction.numeroTel.value = "";
                                                    // Transaction.montant.value = "";
                                                    // for(let i = 0; i < Transaction.depotRetrait.length; i++)
                                                    // {
                                                    //     if(Transaction.depotRetrait[i].checked == true)
                                                    //     {
                                                    //         Transaction.depotRetrait[i].checked == false;   
                                                    //     }
                                                    // }
                                                    
                                                    // for(let i = 0; i < Transaction.operateur.length; i++)
                                                    // {
                                                    //     if(Transaction.operateur[i].checked == true)
                                                    //     {
                                                    //         Transaction.operateur[i].checked == false;   
                                                    //     }
                                                    // }
                                                    
                                                    // ON ACTUALISE LA PAGE
                                                    window.setTimeout(window.location.replace('../CLIENT/'), 10000);
                                                }
                                            }
                                        }
                                        else if(xhrC.responseText == 'PRE_TERMINER')
                                        {
                                            // ON MARQUE LA TRANSATION COMME TERMINER PUIS ON AFFICHE LE MESSAGE POUR DIRE AU CLIENT QUE LA TRANSACTION C'EST BIEN TERMINER PIS ON ACTUALISE LA PAGE
                                            var xhrP = new XMLHttpRequest();
                                            xhrP.open('POST', '../requete/terminerTrans.php');
                                            xhrP.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                                            xhrP.send('numero='+numero+'&montant='+montant+'&categorie='+categorie+'&operateur='+operateur);
                                            xhrP.onreadystatechange = function (e)
                                            {
                                                if(xhrP.readyState == 4 && xhrP.status == 200 && xhrP.responseText == 'solder')
                                                {
                                                    // ON ARRETE LA BOUCLE 
                                                    clearTimeout(controlEvolution);
                                                    // DES QUE LA TRANSACTION EST MARQUER ON  AFFICHE LE MESSAGE POUR DIRE AU CLIENT QUE LA TRANSACTION EST TERMINER PUIS ON ACTUALISE LA PAGE
                                                    Transaction.modalEtatTransaction.style.visibility = "hidden";
                                                    Transaction.fenetreAlerteDepotTerm.style.visibility = "visible";
                                                    
                                                    // ON VIDE TOUT LE FORMULAIRE PUIS ON C+ACTUALISE LA PAGE
                                                    // Transaction.numeroTel.value = "";
                                                    // Transaction.montant.value = "";
                                                    // for(let i = 0; i < Transaction.depotRetrait.length; i++)
                                                    // {
                                                    //     if(Transaction.depotRetrait[i].checked == true)
                                                    //     {
                                                    //         Transaction.depotRetrait[i].checked == false;   
                                                    //     }
                                                    // }
                                                    
                                                    // for(let i = 0; i < Transaction.operateur.length; i++)
                                                    // {
                                                    //     if(Transaction.operateur[i].checked == true)
                                                    //     {
                                                    //         Transaction.operateur[i].checked == false;   
                                                    //     }
                                                    // }
                                                    
                                                    // ON ACTUALISE LA PAGE
                                                    window.setTimeout(window.location.replace('../CLIENT/'), 10000);
                                                }
                                            }
                                        }
                                    }
                                }
                                window.setTimeout(ctrEvl, 3000);
                                
                                },3000);
                        }
                        else if(xhr.responseText == "IMPOSSIBLE")
                        {
                            Transaction.modalTransactionImpossible.style.visibility = "visible";
                        }
                    }
                }
            }
                    
            
        }
        else
        {
            alert( "REMPLISSEZ TOUS LES CHAMPS SVP !!!");
        }
    }
    // CETTE FONTIONEST POUT FEEMER LA BOITE D'ALERT QUI DEMADE AU CLIENT DESAISIE+R UN MONTANT INFERIEUR
    fermerAlertImpossible()
    {
        Transaction.btnOKNouvMont.addEventListener("click", this.fermerAlertImp);
    }
    fermerAlertImp()
    {
        Transaction.modalTransactionImpossible.style.visibility = "hidden";
    }

    // CETTE FONCTION PERMET DE GERER LES CLIQUES SUR LES ELEMENT RADIO POUR LE CHOIS DU TYPE DE TRANSACTION
    marquerDepotRetrait()
    {
        Transaction.boiteDepot.addEventListener("click", this.marquer);
        Transaction.boiteRetrait.addEventListener("click", this.marquer);
    }
    marquer()
    {
        if(this.className == "boiteDepot")
        {
            if(this.childNodes[3].checked == true)
            {
                this.style.backgroundColor = "rgb(0, 233, 0)";
                Transaction.boiteRetrait.style.backgroundColor = "";
            }
            else
            {
                this.childNodes[3].checked = true;
                this.style.backgroundColor = "rgb(0, 233, 0)";
                Transaction.boiteRetrait.style.backgroundColor = "";
                Transaction.boiteRetrait.childNodes[3].checked = false;
            }
        }
        
        if(this.className == "boiteRetrait")
        {
            if(this.childNodes[3].checked == true)
            {
                this.style.backgroundColor = "rgb(0, 233, 0)";
                Transaction.boiteDepot.style.backgroundColor = "";
            }
            else
            {
                this.childNodes[3].checked = true;
                this.style.backgroundColor = "rgb(0, 233, 0)";
                Transaction.boiteDepot.style.backgroundColor = "";
                Transaction.boiteDepot.childNodes[3].checked = false;
            }
        }
    }
    
    // CETTE FONCTION PERMET DE GERER LES CLIQUES SUR LES ELEMENT RADIO POUR LE CHOIS DE L'OPERATEUR
    marquerOrangeMtn()
    {
        Transaction.boiteOrange.addEventListener("click", this.marquer2);
        Transaction.boiteMtn.addEventListener("click", this.marquer2);
    }
    marquer2()
    {
        if(this.className == "boiteOrange")
        {
            if(this.childNodes[3].checked == true)
            {
                this.style.backgroundColor = "orange";
                Transaction.boiteMtn.style.backgroundColor = "";
            }
            else
            {
                this.childNodes[3].checked = true;
                this.style.backgroundColor = "orange";
                Transaction.boiteMtn.style.backgroundColor = "";
                Transaction.boiteMtn.childNodes[3].checked = false;
            }
        }
        
        if(this.className == "boiteMtn")
        {
            if(this.childNodes[3].checked == true)
            {
                this.style.backgroundColor = "yellow";
                Transaction.boiteOrange.style.backgroundColor = "";
            }
            else
            {
                this.childNodes[3].checked = true;
                this.style.backgroundColor = "yellow";
                Transaction.boiteOrange.style.backgroundColor = "";
                Transaction.boiteOrange.childNodes[3].checked = false;
            }
        }
    }
    verifierFinTransation()
    {}

    terminerTransaction()
    {}
}
