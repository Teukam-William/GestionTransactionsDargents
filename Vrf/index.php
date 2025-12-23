<?php
    if(empty($_POST["nom"]) || empty($_POST["motDePasse"]))
    {
        // SI L'UN DES DEUX CHAMPS EST VIDE ON RECOMMENCE
        echo '<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="../CSS/connexion.css">
                        <title>MOBIL BANKING TRANSACTION D\'ARGENT</title>
                    </head>
                    <body>
                        <div class="head">
                            <h1>MOBIL BANKING</h1>
                        </div>
                        <div class="body">
                            <div class="boiteIdentification boiteIdentificationRouge">
                                <h2>Identification</h2>
                                <br/>
                                <p>ERREUR D\'INDENTIFICATION</p>
                                <form action="" method="POST">
                                    <label for="nom">Nom</label>
                                    <br/>
                                    <input type="text" name="nom" id="nom" class="nom" maxlength="25">
                                    <br/><br/>
                                    
                                    <label for="motDePasse">Mot de passe</label>
                                    <br/>
                                    <input type="password" name="motDePasse" id="motDePasse" class="motDePasse" maxlength="25">
                                    <br/>
                                    <button type="submit" class="btnConnexion">Connexion</button>
                                </form>
                                
                            </div>
                        </div>
                    </body>
                </html>';
    }
    elseif( !empty($_POST["nom"]) && !empty($_POST["motDePasse"]) )
    {
        include("../connexion/coordonnees_serveur.php");
        $resp;
        if($resp = $connexion->query("SELECT * FROM responsable_transaction WHERE nom_utilisateur = '$_POST[nom]' AND mot_de_passe = '$_POST[motDePasse]' ")->fetch() )
        {
            // SI LE NOM ET LE MOT DE PASSE ONT ETES SAISIS CORRECTEMENT ON DEMARE LA SESION UNIQUE
            // ON RECUPERE LA CLASS SESSION 
            include("../classePHP/Session.php");
            $session = new Session($_POST["nom"], '2023-10-2 12:50:04');
            if($session->etatSession() == "Actif")
            {
                echo $session->erreurDeSession();
            }
            elseif($session->etatSession() == "none")
            {
                $session->etablireSession();
            }
        }
        else
        {
        // SI L'UN DES DEUX CHAMPS EST VIDE ON RECOMMENCE
        echo '<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="../CSS/connexion.css">
                        <title>MOBIL BANKING</title>
                    </head>
                    <body>
                        <div class="head">
                            <h1>MOBIL BANKING</h1> 
                        </div>
                        <div class="body">
                            <div class="boiteIdentification boiteIdentificationRouge">
                                <h2>Identification</h2>
                                <br/>
                                <p>ERREUR D\'INDENTIFICATION</p>
                                <form action="" method="POST">
                                    <label for="nom">Nom</label>
                                    <br/>
                                    <input type="text" name="nom" id="nom" class="nom" maxlength="25">
                                    <br/><br/>
                                    
                                    <label for="motDePasse">Mot de passe</label>
                                    <br/>
                                    <input type="password" name="motDePasse" id="motDePasse" class="motDePasse" maxlength="25">
                                    <br/>
                                    <button type="submit" class="btnConnexion">Connexion</button>
                                </form>
                                
                            </div>
                        </div>
                    </body>
                </html>';
    }
        
    }
?>