<?php
    if(!empty($_POST['numero']) && !empty($_POST['montant']) && !empty($_POST['categorie']) && !empty($_POST['operateur']) )
    {
        include('../connexion/coordonnees_serveur.php');
        $etat = $connexion->query("SELECT * FROM u959969284_CCHMOBILMONEY.transaction WHERE ( etat_payement_transaction = 'ANNULER' OR etat_payement_transaction = 'PRE_TERMINER') AND (categorie ='$_POST[categorie]' AND numero_client='$_POST[numero]' AND montant = '$_POST[montant]' AND operateur = '$_POST[operateur]') ")->fetch();
        echo $etat['etat_payement_transaction'] ;
    }
?>