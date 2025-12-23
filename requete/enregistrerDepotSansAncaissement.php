<?php
    if(!empty($_POST['numero']) && !empty($_POST['montant']) && !empty($_POST['operateur']))
    {
        // LA DATE DU DEPOT AVEC L'HEURE
        // $date = date('Y-m-d');
        include("../connexion/coordonnees_serveur.php");
        if($connexion->query("INSERT INTO u959969284_CCHMOBILMONEY.transaction VALUES('$_POST[operateur]', 'Depot', '$_POST[numero]', '$_POST[montant]', current_timestamp, 'non solder') "))
        {
            echo'Dépot sans ancaissement enrégistrer';
        }
    }
?>