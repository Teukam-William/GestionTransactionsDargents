<?php
    if(!empty($_POST['numero']) && !empty($_POST['montant']) && !empty($_POST['categorie']) && !empty($_POST['operateur']) )
    {
        include('../connexion/coordonnees_serveur.php');
        $etat = $connexion->query("UPDATE
                                    u959969284_CCHMOBILMONEY.transaction
                                    SET
                                    etat_payement_transaction = 'solder'
                                    WHERE
                                        etat_payement_transaction = 'PRE_TERMINER'
                                        AND
                                        categorie ='$_POST[categorie]'
                                        AND 
                                        numero_client='$_POST[numero]' 
                                        AND 
                                        montant = '$_POST[montant]'  
                                        AND 
                                        operateur = '$_POST[operateur]' 
                                ")->fetch();
        echo 'solder' ;
    }
?>