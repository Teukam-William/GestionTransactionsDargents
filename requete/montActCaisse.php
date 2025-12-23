<?php
    error_reporting(0);
    include("../connexion/coordonnees_serveur.php");
    $dateJour = date('Y-m-d');
    echo $connexion->query("SELECT montant FROM montant_journalier WHERE operateur='Caisse' AND categorie = 'Retrait'")->fetch()['montant'];

?>