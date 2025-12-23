<?php
    if(!empty($_POST["categorie"]) && !empty($_POST["operateur"]) && !empty($_POST["nomClient"]) && !empty($_POST["numeroClient"]) && !empty($_POST["montant"]) && !empty($_POST["date"]) )
    {
        include('../connexion/coordonnees_serveur.php');
        if( $connexion->exec("UPDATE u959969284_CCHMOBILMONEY.transaction SET etat_payement_transaction = 'solder' WHERE operateur = '$_POST[operateur]' AND categorie = '$_POST[categorie]' AND numero_client = '$_POST[numeroClient]' AND montant = '$_POST[montant]' AND date_transaction = '$_POST[date]' AND etat_payement_transaction != 'solder' ") )
        {
            echo 'TRANSACTION MARQUER COMME SOLDER';
        }
    }
?>