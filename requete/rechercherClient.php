<?php
error_reporting(0);
    header("content-type: text/xml");
    include('../connexion/coordonnees_serveur.php');
    $xml = new DOMDocument("1.0", "utf-8");
    $listeClient = $xml->createElement('div');

    $clients = $connexion->query("SELECT * FROM client WHERE nom_client LIKE '$_POST[eltRecherche]%' OR numero_telephone LIKE '$_POST[eltRecherche]%' ORDER BY nom_client ");
    $detailClient = $clients->fetch();
    do
    {
        // ICI ON VA CREER LE CONTENEUR QUI VA ACCEUILLIR LS INFORMATIONS D'UN CLIENT
        $infosClient = $xml->createElement('div');

        // LE NOM DU CLIENT
        $nomClient = $xml->createElement('p', $detailClient['nom_client']);
        $infosClient->appendChild($nomClient);

        // UMERO DU CLIENT
        $numeroClient = $xml->createElement('p', $detailClient['numero_telephone']);
        $infosClient->appendChild($numeroClient);

        // LE DIV QUI VA CONTENIR L'IMAGE POUR LA MODIFICATION D'UN CLIENT
        $divModif = $xml->createElement('div');
        // L'ICONE DE MODIFICATION
        $iconeModif = $xml->createElement('img');
        $divModif->appendChild($iconeModif);
        $infosClient->appendChild($divModif);
      
        // LE DIV POUR LA SUPPRESSION D'UN CLIENT
        $divSupp = $xml->createElement('div');
        // L'ICONE DE MODIFICATION
        $iconeSupp = $xml->createElement('img');
        $divSupp->appendChild($iconeSupp);
        $infosClient->appendChild($divSupp);

        // ON AJOUTE LE CONTENEUR D'INFORMATION DU CLIENT A LA LISTE
        $listeClient->appendChild($infosClient);
    }while($detailClient = $clients->fetch() );

    $xml->appendChild($listeClient);
    echo $xml->SaveXML();
?>