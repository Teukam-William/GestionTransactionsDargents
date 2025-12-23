<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/pageAcceuille.css">
    <link rel="stylesheet" href="../CSS/client.css">
    <title>Acceuille</title>
</head>
<body>
    <div class="head">
        <div class="boiteBtnDeconnexion">
            <button class="btnDeconnexion btnFinSession">DECONNEXION</button>
        </div>
        <h1>MOBIL BANKING</h1>
    </div>
    <br/>
    <h2>Gestion des transactions d'argent</h2>
    <div class="conteneurBoiteOpt">
        <div class="boiteDoption">
            <img class="enrgTransc" src="../images/iconeDoptions/enregistrerTransaction.png"  alt="ENREGISTRER UNE TRANSACTION">
            <img class="gererMontJr" src="../images/iconeDoptions/montant.jpg"  alt="GERE LES MONTANTS JOURNALIER">
            <img class="gererClient" src="../images/iconeDoptions/client.jpg"  alt="GERE LES MONTANTS JOURNALIER">
            <img  class="transactionJournaliere" src="../images/iconeDoptions/transaction.jpg"  alt="GERE LES MONTANTS JOURNALIER">
            <img class="depotSansAncaissement" src="../images/iconeDoptions/depotSansAncaissement.jpg"  alt="GERE LES MONTANTS JOURNALIER">
        </div>
    </div>
    
    <!-- FENETRE DE GESTION DES MONTANTS JOURNALIERS -->
    <aside  class="fenetreEnrgTransc" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrap"  >
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/enregistrerTransaction.png" alt="ENREGISTRER LES TRANSACTIONS">
                <h3>Enregistrer les transactions</h3>
                <img class="btnRetour btnRetourEnteteEnrgTrans" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" >
            </div>
            <div class="boiteMontantCaiseTelephone">
                <div class="boiteInfos">
                    <label for="numeroTel">Numéro de téléphone</label>
                    <input type="tel" name="numeroTel" class="boiteInfosNumeroTel" id="numeroTel">
                    <br/>
                    <label for="montant">Montant</label>
                    <input type="number" name="montant" class="boiteInfosMontant" id="montant">
                    <br/>
                    <p>Selectionnnez le type de transaction</p>
                    <div class="boiteRetraitOuDepot">
                        <div class="boiteDepot">
                            <label for="depot">Dépot</label>
                            <input type="radio" name="boiteInfosDepotRetrait" id="depot" class="depotRetrait" value="Depot">
                        </div>

                        <div class="boiteRetrait">
                            <label for="retrait">Retrait</label>
                            <input type="radio" name="boiteInfosDepotRetrait" id="retrait" class="depotRetrait" value="Retrait">
                        </div>
                    </div>
                    <br/>
                    <p>Selectionnez l'opérateur</p>
                    <div class="boiteOrangeouMtn">
                        <div class="boiteOrange">
                            <label for="orange">Orange</label>
                            <input type="radio" name="boiteInfosOperateur"  value="Orange">
                        </div>

                        <div class="boiteMtn">
                            <label for="mtn">MTN</label>
                            <input type="radio" name="boiteInfosOperateur"  value="MTN">
                        </div>
                    </div>
                    <br/>
                    <button class="boiteInfosBtnDemarrer">Démarrer</button>
                </div> 
            </div>
        </div>
    </aside>
    
    <!-- PREMIER FENETRE POUR DEBUTER DONNER L'ETAT DE LA TRANSACTION -->
    <aside id="modal" class="modalEtatTransaction" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
            <div class="boiteSuivitTransaction">
                <h2>Transaction en cours de traitement...</h2>
                <div class="etat">
                    <br/>
                    <br/>
                    <p>Ne partez pas avant d'avoir terminer la transaction et rassurez vous que votre transaction c'est bien effectuer !!!</p>
                </div>
            </div>
        </aside>
        <!-- FETRER POUR AVISER QUE LE RETRAIT EST IMPOSSIBLE -->

        <aside id="modal" class="modalTransactionImpossible" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
            <div class="boiteSuivitTransaction">
                <h2 class="h2Imp">NOUS NE DISPOSONS PAS DE CE MONTANT POUR LE MOMENT VEUILLEZ SAISIR UN MONTANT INFERIEUR SVP !!!</h2>
                <button class="btnOKNouvMont">OK</button>
            </div>
        </aside>
        
        <!-- FENTRE POUR NOTIFIER QUE LE DEPOT C'EST BIEN TERMINER -->
        <aside class="fenetreAlerteDepotTerm" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
            <div class="boiteAlerte">
                <br/>
                <div class="boiteTitre">
                    <h1 class="titreTransactionDepot">VOTRE TRANSACTION EST TERMINER <br/><br/> CCH VOUS REMERCI !!!</h1>
                </div>
                <br/>
            </div>
        </aside>
        
        <!-- FENTRE POUR NOTIFIER QUE LE DEPOT EST ANNULER -->
        <aside class="fenetreAlerteDepotAnnuler" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
            <div class="boiteAlerte">
                <br/>
                <div class="boiteTitre">
                    <h1 class="titreTransactionDepot">VOTRE TRANSACTION A ETE ANNULER <br/><br/> CCH VOUS REMERCI !!!</h1>
                </div>
                <br/>
            </div>
        </aside>

    <!-- FENETRE DE GESTION DES MONTANTS JOURNALIERS -->
    <aside id="modal" class="modaleGererMontant" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrap"  >
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/montant.jpg" alt="Gerer les montants journaliers">
                <h3>Gérer les montants journaliers</h3>
                <img class="btnRetour btnRetourEnteteMontantJr" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" >
            </div>
            <div class="boiteMontantCaiseTelephone">
                <!-- Boite pour les depot orange -->
                <div class="boiteDepotOrange">
                    <div class="titreDepot">
                        <h2>Dépot Orange</h2>
                    </div>
                    <div class="eltDepot">
                        <div class="montAct">
                            <p class="montActDepOrange">Montant actuel ORANGE</p>
                            <p class="valMonAct valMonActDepOrange"></p>
                        </div>
                    </div>
                </div>
                <!-- boite pour les depot mtn -->
                <div class="boiteDepotMtn">
                    <div class="titreDepot">
                        <h2>Dépot MTN</h2>
                    </div>
                    <div class="eltDepot">
                        <div class="montAct">
                            <p class="montActDepMtn">Montant actuel MTN</p>
                            <p class="valMonAct valMonActDepMtn"></p>
                        </div>
                    </div>
                </div>
                <!-- boite pour la caisse -->
                <div class="boiteCaisse">
                    <div class="titreCaisse">
                        <h2>CAISSE</h2>
                    </div>
                    <div class="eltCaisse">
                        <div class="montAct">
                            <p class="montActCaisse">Montant actuel dans la CAISSE</p>
                            <p class="valMonAct valMonActCaisse"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="defMont">
                <button class="btnDefMont">Définir les montants</button>
            </div>
        </div>
    </aside>
    <!-- FENETRE POUR DEFINIR LES MONTANT JOURNALIER -->
    <aside class="defMontantDepot" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrap"  >
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/montant.jpg" alt="Gerer les montants journaliers">
                <h3>Gérer les montants journaliers</h3>
                <img width="10px" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" class="btnRetour btnRdetourDefMontantDepot">
            </div>
            
            <div class="titreDepot">
                <h2>Définir les montants</h2>
            </div>
            <div class="boiteDefinitionMontantJournalier">
                <div class="boiteValDefinire">
                    <label for="operateur" >Opérateur</label>
                    <select name="operateur" class="operateur" id="operateur">
                        <option value="Orange">Orange</option>
                        <option value="MTN">MTN</option>
                        <option value="Caisse">CAISSE</option>
                    </select>
                    <br/>
                    <label for="categorie">Type de transaction</label>
                    <select name="categorie" class="categorie" id="categorie">
                        <option value="Depot">Dépot</option>
                        <option value="Retrait">Caisse</option>
                    </select>
                    <br/>
                    <label for="montant">Montant</label>
                    <input type="number" class="montant" name="montant" id="montant">
                    <br/>
                    <button class="ergMontJour">Enregistrer</button>
                </div>
            </div>
        </div>
    </aside>
    <!-- FENETRE POUR GERER LES CLIENTS -->
    <aside class="fenetreGererClient" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrap"  >
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/client.jpg" alt="Gerer les montants journaliers">
                <h3>Gérer les clients</h3>
                <img class="btnRetour btnRetourGererClient" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" >
            </div>
            <div class="boiteRechercheClient">
                <input type="search" class="rechercheClient">
            </div>
            <div class="listeClient">
            </div>
        </div>
    </aside>
    <!-- FENETRE POUR MODIFIER LES INFOS D'UN CLIENT -->
    <aside class="fenetreModifierClient" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrapModifierClient"  >
            <h1>Modifier les informatons du client</h1>
            <br/>
            <label for="nomClient">Nom du client</label>
            <!-- <br/> -->
            <input type="text" name="nomClient" id="nomClient" class="nomClient">
            <br/>
            <br/>
            <label for="numeroClient">Numéro de téléphone</label>
            <!-- <br/> -->
            <input type="text" name="numeroClient" id="numeroClient" class="numeroClient">
            <br/>
            <button class="btnEnregistrer">Enrégistrer</button>
            <br/>
            <button class="btnAnnuler">Annuler</button>
            <br/>
        </div>
    </aside>
    <!-- FENETRE DES TRANSACTIONS JOURNALIERES -->
    <aside class="fenetreTransactionsJournaliere" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrapTransactionsJournaliere">
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/client.jpg" alt="Gerer les montants journaliers">
                <h3>Transactions journaliere</h3>
                <img class="btnRetour btnRetourFenetreTransactionJournaliere" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" >
            </div>
            <div class="boiteRechercheClient">
                <input type="date" name="dateJour" id="dateJour" class="dateJourR">
                <br/>
                <input type="search" class="rechercheTransaction" placehlder="Rechercher ici...">
            </div>
            <div class="listeTransactions">
            </div>
        </div>
    </aside>
    <!-- FENETRE DE DEPOT D'ARGENT SANS ANCAISSEMENT -->
    <aside class="fenetreDepotSansAncaissement" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="modalWrapDepotSansAncaissement">
            <div class="head">
                <h1>MOBIL BANKING</h1>
            </div>
            <br/>
            <div class="enteteMontantJr">
                <img src="../images/iconeDoptions/client.jpg" alt="Gerer les montants journaliers">
                <h3>Enrégistrer un dépot sans reception d'argent</h3>
                <img class="btnRetour btnRetourFenetreDepotSansAncaissement" src="../images/iconeDoptions/btnRetour.png" alt="RETOUR" >
            </div>
            <div class="boiteInfosDepot">
                <div class="eltForm">
                    <label for="numeroClient" class="numeroClient">Numéro du client</label>
                    <input type="tel" class="inputNumeroClient" id="numeroClient">
                    <br/>
                    <br/>
                    <label for="montantDepot" class="montantDepot">Montant du dépot</label>
                    <input type="tel" class="inputMontantDepot" id="montantDepot">
                    <br/>
                    <br/>
                    <label for="operateurDepot" class="operateurDepot">Opérateur pour le dépot</label>
                    <select name="operateurDepot" id="operateurDepot" class="selectOperateurDepot">
                        <option value="Orange">Orange</option>
                        <option value="MTN">MTN</option>
                    </select>
                    <br/>
                    <br/>
                    <button class="btnEnregistrerDepotSansAncaissement">Enrégistrer</button>
                </div>
            </div>
        </div>
    </aside>

    <!-- FENTRE POUR LSES TRANSACTIONS D'ARGENTS DES CLIENT LES RETRAIT -->
    <aside class="fenetreAlerteRetrait" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="boiteAlerte">
            <br/>
            <div class="boiteTitre">
                <h1>UN RETRAIT</h1><h1 class="titreTransactionRetrait">  </h1><h1> EST DEMANDER</h1>
            </div>
            <br/>
            <h2 class="numeroTelClient"></h2>
            <br/>
            <h2 class="montantR"></h2>
            <br/>
            <br/>
            <p>Rassurez vous d'avoir reçu le message de confirmation qui approuve que le retrait a été effectuer</p>
            <br/>
            <br/>
            <button class="btnRetraitEff">Retrait effectuer</button>
            <br/>
            <button class="btnAnnulerR">ANNULER</button>
        </div>
    </aside>

    
    <!-- FENTRE POUR LSES TRANSACTIONS D'ARGENTS DES CLIENT LES DEPOTS -->
    <aside class="fenetreAlerteDepot" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre" >
        <div class="boiteAlerte">
            <br/>
            <div class="boiteTitre">
                <h1>UN DEPOT</h1><h1 class="titreTransactionDepot">  </h1><h1> EST DEMANDER</h1>
            </div>
            <br/>
            <h1>RASSUREZ VOUS D'AVOIR PRIX l'ARGENT AVANT DE DEMARRER LA TRANSACTION</h1>
            <br/>
            <h2 class="numeroTelClientD"></h2>
            <br/>
            <h2 class="montantD"></h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <button class="btnDebTransc">DEBUTTER LA TRANSACTION</button>
            <br/>
            <button class="btnAnnulerD">ANNULER</button>
        </div>
    </aside>
    

    <script src="../classeJS/Session.js"></script>
    <script src="../classeJS/EnregistrerTransaction.js"></script>
    <script src="../classeJS/SuivitTransaction.js"></script>
    <script src="../classeJS/DefinirMontant.js"></script>
    <script src="../classeJS/MontantActuel.js"></script>
    <script src="../classeJS/GererMontantJournalier.js"></script>
    <script src="../classeJS/GererClient.js"></script>
    <script src="../classeJS/TransactionsJournaliere.js"></script>
    <script src="../classeJS/DepotSansAncaissement.js"></script>
    <script src="../gestInteractionJS/gestionInteraction.js"></script>
    <script src="../classeJS/TransactionResp.js"></script>
    <script src="../classeJS/SessionClient.js"></script>
    <script>
        let rechercheurTransactionInitier = window.setInterval(function(){
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
                    SuivitTransaction.montant.textContent = infosTransaction[4]+' FCFA';
                    SuivitTransaction.fenetreAlerteRetrait.style.visibility = "visible";
                    clearInterval(rechercheurTransactionInitier);
                    
                }
                else if(infosTransaction[0] == 'EN_COURS' && infosTransaction[1] == 'Depot')
                {
                    SuivitTransaction.titreTransactionDepot.textContent = infosTransaction[2];
                    SuivitTransaction.numeroTelClientD.textContent = infosTransaction[3];
                    SuivitTransaction.montantD.textContent = infosTransaction[4]+' FCFA';
                    SuivitTransaction.fenetreAlerteDepot.style.visibility = "visible";
                    clearInterval(rechercheurTransactionInitier);
                }
            }
        }
    }, 2000);
    // rechercheurTransactionInitier();
    </script>
</body>
</html>