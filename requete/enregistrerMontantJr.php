<?php
    
// error_reporting(0);
    // ON VERIFIE SI L'UNE DES VARIABLES EST VIDE SI C'EST VIDE ON DEMANDE DE SAISIR  LES VALEURS 
    if((empty($_POST['op']) || empty($_POST['montant']) || empty($_POST['categorie'])) && ( empty($_POST['mOp']) && empty($_POST['mMontant']) && empty($_POST['mCategorie'])))
    {
        echo 'Entrez le montant , selectionner l\'opérateur et choisiser le type de transaction';
    }//ON VERIFIE SI LES VARIABLES DE DEFINITIONS INITIALES SONT PLEINNENT ET SI LES VARIABLES DE MODIFICATIONS SONT VIDE
    elseif( !empty($_POST['op']) && !empty($_POST['montant']) && !empty($_POST['categorie']) && empty($_POST['mOp']) && empty($_POST['mMontant']) && empty($_POST['mCategorie']))
    {
        include('../connexion/coordonnees_serveur.php');
        $var = $connexion->query("SELECT operateur FROM montant_journalier WHERE operateur = '$_POST[op]' AND categorie = '$_POST[categorie]'")->fetch();

        if(!empty($var['operateur'])) 
        {
            echo 'Deja Defini';
        }
        else
        {
            $connexion->exec("INSERT INTO montant_journalier VALUE( '$_POST[op]', '$_POST[montant]', '$_POST[categorie]' )");
            echo $_POST['categorie'].' '.$_POST['op'].' Enregistrer';
        }
    }
    elseif( !empty($_POST['mOp']) && !empty($_POST['mMontant']) && !empty($_POST['mCategorie']) && empty($_POST['op']) && empty($_POST['montant']))
    {
        include('../connexion/coordonnees_serveur.php');
        $connexion->exec("UPDATE montant_journalier SET montant = '$_POST[mMontant]' WHERE operateur = '$_POST[mOp]' AND categorie = '$_POST[mCategorie]'");
        echo 'Montant des '.$_POST['mCategorie'].' '.$_POST['mOp'].' à été modifier avec succès';
    }
?>