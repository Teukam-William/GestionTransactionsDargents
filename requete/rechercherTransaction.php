<?php
error_reporting(0);
    header("content-type: text/xml");
    include('../connexion/coordonnees_serveur.php');
    $xml = new DOMDocument("1.0", "utf-8");
    $listeTransaction = $xml->createElement('div');

    $transactions = $connexion->query("SELECT * FROM u959969284_CCHMOBILMONEY.transaction WHERE ( numero_client LIKE '$_POST[eltRecherche]%' OR operateur LIKE '$_POST[eltRecherche]%' OR categorie LIKE '$_POST[eltRecherche]%' OR etat_payement_transaction LIKE '$_POST[eltRecherche]%' ) AND date_transaction LIKE '$_POST[dateJour]%' ORDER BY date_transaction DESC ");
    $detailTransaction = $transactions->fetch();
    do
    {
        // ICI ON VA CREER LE CONTENEUR QUI VA ACCEUILLIR LS INFORMATIONS D'UNE TRANSACTION
        $infosTransaction = $xml->createElement('div');

        // L'OPERTEUR ET LA CATEGORIE DE TRANSACTION
        $categorieOperateur = $xml->createElement('div');
        $categorie = $xml->createElement('p', $detailTransaction['categorie']);
        $operateur = $xml->createElement('p', $detailTransaction['operateur']);
        $categorieOperateur->appendChild($categorie);
        $categorieOperateur->appendChild($operateur);
        $infosTransaction->appendChild($categorieOperateur);

        // LE NOM DU CLIENT ET SON NUMERO
        // ON RECUPERE LE NOM DU CLIENT QUI A EFFECTUER LA TRANSACTION
        $nomDuClient = $connexion->query("SELECT nom_client FROM u959969284_CCHMOBILMONEY.client WHERE numero_telephone = 'detailTransaction[numero_client]' ")->fetch();
        $clientNumero = $xml->createElement("div");
        if(!empty($nomDuClient['nom_client']))
        {
            $client = $xml->createElement('p', $nomDuClient['nom_client']);
            $clientNumero->appendChild($client);
        }
        else
        {
            $client = $xml->createElement('p', 'INCONNU');
            $clientNumero->appendChild($client);
        }
        $numero = $xml->createElement('p', $detailTransaction['numero_client']);
        $clientNumero->appendChild($numero);
        $infosTransaction->appendChild($clientNumero);

        // LE DIV QUI VA CONTENIR LE MONTANT ET LA DATE
        $montantDate = $xml->createElement('div');
        $montant = $xml->createElement('p', $detailTransaction['montant'].' FCFA');
        $dateT = $xml->createElement('p', $detailTransaction['date_transaction']);
        $montantDate->appendChild($montant);
        $montantDate->appendChild($dateT);
        $infosTransaction->appendChild($montantDate);
      
        if($detailTransaction['etat_payement_transaction'] != 'non solder')
        {
            $etatPayement = $xml->createElement('p', 'S');
            $infosTransaction->appendChild($etatPayement);
        }
        else
        {
            $etatPayement = $xml->createElement('p', 'NS');
            $infosTransaction->appendChild($etatPayement);
        }

        // ON AJOUTE LE CONTENEUR D'INFORMATION DE LA TRANSACTION A LA LISTE
        $listeTransaction->appendChild($infosTransaction);
    }while($detailTransaction = $transactions->fetch() );

    $xml->appendChild($listeTransaction);
    echo $xml->SaveXML();
?>