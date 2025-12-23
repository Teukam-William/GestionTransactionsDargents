<?php
    include("../connexion/coordonnees_serveur.php");
    $etat;
    if($etat = $connexion->query("SELECT * FROM u959969284_CCHMOBILMONEY.transaction WHERE etat_payement_transaction = 'EN_COURS' ")->fetch() )
    {
        if( !empty($etat["operateur"]) )
        {
            echo $etat["etat_payement_transaction"].'*';
            echo $etat["categorie"].'*';
            echo $etat["operateur"].'*';
            echo $etat["numero_client"].'*';
            echo $etat["montant"];
        }

    }
?>