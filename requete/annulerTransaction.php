<?php
    include("../connexion/coordonnees_serveur.php");
    
    if($connexion->exec("UPDATE u959969284_CCHMOBILMONEY.transaction SET etat_payement_transaction ='ANNULER' WHERE etat_payement_transaction = 'EN_COURS' AND categorie ='$_POST[categorie]' AND numero_client='$_POST[numero]' AND montant = '$_POST[montant]' ") )
    {
        $etat = $connexion->query("SELECT * FROM u959969284_CCHMOBILMONEY.transaction WHERE etat_payement_transaction = 'ANNULER' ")->fetch();
        if( !empty($etat['operateur']) )
        {
            echo 'TRANSACTION ANNULER';
        }

    }
?>