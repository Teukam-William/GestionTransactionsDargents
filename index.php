<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/connexion.css">
    <title>MOBIL BANKING TRANSACTION D'ARGENT</title>
</head>
<body>
    <div class="head">
        <h1>MOBIL BANKING</h1>
    </div>
    <div class="body">
        <div class="boiteIdentification">
            <h2>Identification</h2>
            <br/>
            <form action="./Vrf/index.php" method="POST">
                <label for="nom">Nom</label>
                <br/>
                <input type="text" name="nom" id="nom" maxlength="25">
                <br/><br/>
                
                <label for="motDePasse">Mot de passe</label>
                <br/>
                <input type="password" name="motDePasse" id="motDePasse" maxlength="25">
                <br/>
                <button type="submit" class="btnConnexion">Connexion</button>
            </form>
            
        </div>
    </div>
</body>
</html>