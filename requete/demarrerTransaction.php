<?php
    if(!empty($_POST['numero']) && !empty($_POST['montant']) && !empty($_POST['categorie']) && !empty($_POST['operateur']) )
    {
        if($_POST['categorie'] == 'Retrait')
        {
            include("../connexion/coordonnees_serveur.php");
            // ON VERIFI SI LE MONTANT EN CAISEE EST SUPPERIEUR AU MONTANT DEMANDER
            $montantEnCaisse = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = 'Caisse' AND categorie='Retrait' ")->fetch();
            if($montantEnCaisse['montant'] >= $_POST['montant'])
            {
                include("../connexion/coordonnees_serveur.php");
                $connexion->exec("INSERT INTO u959969284_CCHMOBILMONEY.transaction VALUES ( '$_POST[operateur]', '$_POST[categorie]', '$_POST[numero]', '$_POST[montant]', CURRENT_TIMESTAMP, 'EN_COURS' ) ");
                echo 'en cours';
            }
            else if($montantEnCaisse['montant'] < $_POST['montant'])
            {
                echo'IMPOSSIBLE';
            }
        }
        else if($_POST['categorie'] == 'Depot')
        {
            include("../connexion/coordonnees_serveur.php");
            // ON VERIFI SI LE MONTANT EN CAISEE EST SUPPERIEUR AU MONTANT DEMANDER
            $montantOperateur = $connexion->query("SELECT montant FROM montant_journalier WHERE operateur = '$_POST[operateur]' AND categorie='Depot' ")->fetch();
            if($montantOperateur['montant'] >= $_POST['montant'])
            {
                include("../connexion/coordonnees_serveur.php");
            $connexion->exec("INSERT INTO u959969284_CCHMOBILMONEY.transaction VALUES ( '$_POST[operateur]', '$_POST[categorie]', '$_POST[numero]', '$_POST[montant]', CURRENT_TIMESTAMP, 'EN_COURS' ) ");
            echo 'en cours';
            }
            else if($montantOperateur['montant'] < $_POST['montant'])
            {
                echo'IMPOSSIBLE';
            }

        }
    }
?>