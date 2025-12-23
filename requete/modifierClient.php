<?php
    if(!empty($_POST['ancienNomClient']) && !empty($_POST['ancienNumeroClient']) && !empty($_POST['nouveauNomClient']) && !empty($_POST['nouveauNumeroClient']) )
    {
        include("../connexion/coordonnees_serveur.php");
        if($connexion->exec("UPDATE client SET nom_client = '$_POST[nouveauNomClient]' , numero_telephone = '$_POST[nouveauNumeroClient]' WHERE nom_client = '$_POST[ancienNomClient]' AND numero_telephone = '$_POST[ancienNumeroClient]' ") )
        {
            echo 'ANCIENNES INFORMATIONS :
            nom : '.$_POST['ancienNomClient'].'  numero : '.$_POST['ancienNumeroClient'].'
            
            NOUVELLES INFORMATIONS :
            nom : '.$_POST['nouveauNomClient'].'  numero : '.$_POST['nouveauNumeroClient'];
        }
    }
?>