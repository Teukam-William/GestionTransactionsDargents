<?php
    if(!empty($_POST['nomClient']) && !empty($_POST['numeroClient']) )
    {
        include('../connexion/coordonnees_serveur.php');
        if($connexion->exec("DELETE FROM client WHERE nom_client = '$_POST[nomClient]' AND numero_telephone = '$_POST[numeroClient]' "))
        {
            echo "".$_POST['nomClient']." à été supprimer";
        }
    }
?>