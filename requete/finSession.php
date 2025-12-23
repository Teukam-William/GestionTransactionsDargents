<?php

    include("../connexion/coordonnees_serveur.php");
    $connexion->query("UPDATE cch_session SET etat = 'Terminer' , dateFinSession = CURRENT_TIMESTAMP WHERE etat = 'Actif' ");
    echo'Fermeture de la session';

?>