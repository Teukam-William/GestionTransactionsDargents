class MontantActuel
{
    static valMontDepotOrange = document.querySelector(".valMonActDepOrange");
    static valMontDepotMtn = document.querySelector(".valMonActDepMtn");
    static valMontRetraitOrange = document.querySelector(".valMonActRetOrange");
    static valMontRetraitMtn = document.querySelector(".valMonActRetMtn");
    constructor()
    {
        this.valMontDepotRetrait();
    }
    valMontDepotRetrait()
    {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../requete/montActDepRet.php');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send('');
        xhr.onreadystatechange = function (e)
        {
            if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != '')
            {
                let tabVal = xhr.responseText.split('*');
                if(isNaN(parseInt(tabVal[0], 10)))
                {
                    MontantActuel.valMontDepotOrange.innerHTML = 'Le montant journalier initiale n\'a pas encore été saisie';
                    MontantActuel.valMontDepotMtn.innerHTML = 'Le montant journalier initiale n\'a pas encore été saisie';
                    MontantActuel.valMontRetraitOrange.innerHTML = 'Le montant journalier initiale n\'a pas encore été saisie';
                    MontantActuel.valMontRetraitMtn.innerHTML = 'Le montant journalier initiale n\'a pas encore été saisie';
                }
                else
                {
                    MontantActuel.valMontDepotOrange.innerHTML = tabVal[0]+' FCFA';
                    MontantActuel.valMontDepotMtn.innerHTML = tabVal[1]+' FCFA';
                    MontantActuel.valMontRetraitOrange.innerHTML = tabVal[2]+' FCFA';
                    MontantActuel.valMontRetraitMtn.innerHTML = tabVal[3]+' FCFA';
                }
            }}
    }
}