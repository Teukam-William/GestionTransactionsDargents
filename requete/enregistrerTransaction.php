<?php
    if(!empty($_POST['numero']) && !empty($_POST['montant']) && !empty($_POST['categorie']) && !empty($_POST['operateur']) )
    {
        include("../connexion/coordonnees_serveur.php");
        $connexion->exec("UPDATE u959969284_CCHMOBILMONEY.transaction 
                            SET etat_payement_transaction = 'PRE_TERMINER' 
                            WHERE  
                               operateur = '$_POST[operateur]'
                                AND
                                categorie = '$_POST[categorie]' 
                                AND 
                                numero_client = '$_POST[numero]' 
                                AND
                                montant = '$_POST[montant]' 
                                AND 
                                etat_payement_transaction = 'EN_COURS'  ");
        $montantRetrait = intval($_POST['montant']);
        if($_POST['categorie'] == 'Retrait' && empty($_POST["dette"]))
        {
            $montantEnCaisse = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = 'Caisse' AND categorie='Retrait' ")->fetch();
            $montantEnCaisseInt = intval($montantEnCaisse['montant']);
            $connexion->exec("UPDATE montant_journalier SET montant = $montantEnCaisseInt-$montantRetrait WHERE operateur = 'Caisse' AND categorie='Retrait' ");
            
            $montantOperateur = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ")->fetch();
            $montantOperateurInt = intval($montantOperateur['montant']);
            $connexion->exec("UPDATE montant_journalier SET montant = $montantOperateurInt+$montantRetrait WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ");
            
        }
        elseif($_POST['categorie'] == 'Depot' && empty($_POST["dette"]))
        {
            $montantEnCaisse = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = 'Caisse' AND categorie='Retrait' ")->fetch();
            $montantEnCaisseInt = intval($montantEnCaisse['montant']);
            $connexion->exec("UPDATE montant_journalier SET montant = $montantEnCaisseInt+$montantRetrait WHERE operateur = 'Caisse' AND categorie='Retrait' ");
            
            $montantOperateur = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ")->fetch();
            $montantOperateurInt = intval($montantOperateur['montant']);
            $connexion->exec("UPDATE montant_journalier SET montant = $montantOperateurInt-$montantRetrait WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ");
            
        }
        if(!empty($_POST["dette"]) && $_POST['categorie'] == 'Depot')
        {
            include("../connexion/coordonnees_serveur.php");
            // ON VERIFI SI LE MONTANT EN CAISEE EST SUPPERIEUR AU MONTANT DEMANDER
            $montantOperateur = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ")->fetch();
            if($montantOperateur['montant'] >= $_POST['montant'])
            {
                // ON ENREGISTRE LE DEPOT PUIS ON EFFECTUE LA MISE A JOUR DES MONTANTS
                include("../connexion/coordonnees_serveur.php");
                $connexion->exec("INSERT INTO u959969284_CCHMOBILMONEY.transaction VALUES ( '$_POST[operateur]', '$_POST[categorie]', '$_POST[numero]', '$_POST[montant]', CURRENT_TIMESTAMP, 'non solder' ) ");
                
                // LA MISE A JOURS DES MONTANTS
                $montantEnCaisse = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = 'Caisse' AND categorie='Retrait' ")->fetch();
                $montantEnCaisseInt = intval($montantEnCaisse['montant']);
                $connexion->exec("UPDATE montant_journalier SET montant = $montantEnCaisseInt+$montantRetrait WHERE operateur = 'Caisse' AND categorie='Retrait' ");
                
                $montantOperateur = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ")->fetch();
                $montantOperateurInt = intval($montantOperateur['montant']);
                $connexion->exec("UPDATE montant_journalier SET montant = $montantOperateurInt-$montantRetrait WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ");
         
                echo 'Transaction sans encaissement enrégistrer';
            }
            else if($montantOperateur['montant'] < $_POST['montant'])
            {
                echo'LE MONTANT DES DEPOTS EST INSUFFUSANT POUR CETTE TRANSACTION';
            }
         }
         else
         {
            echo 'Transaction enrégistrer';
        }
    }
?>