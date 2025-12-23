<?php
    //ON RECUPERE LES COORDONNEES DE LA BASE DE DONEES
    include('../connexion/coordonnees_serveur.php');
    class Session
    {
        // ON DECLARE LES VARRIABLES DE LA CLASSE
        private $nom;
        private $dateEtHeure;
        
        //LE CONSTRUCTEUR DE LA CLASS 
        public function __construct($nom, $dateEtHeure)
        {
            $this->nom = $nom;
            $this->dateEtHeure = $dateEtHeure;
        }

        //FONCTION POUR ETABLIRE LA SESSION UNIQUE ET BLOQUER TOUT AUTRE connexion
        public function etablireSession()
        {
            if($this->etatSession() == 'none')
            {
                include('../connexion/coordonnees_serveur.php');
                // SI UNE SESSION N'EST PAS DEJA EN COURS ON LA CREE
                $connexion->exec("INSERT INTO cch_session VALUE('$this->nom', '$this->dateEtHeure', '', 'Actif')");
                // MAINTENANT ON RETOURNE LA PAGE D'ACCEUILLE POUR LA GESTION
                echo include("../pageAcceuille/index.php");
            }
            else if($this->etatSession() == 'Actif')
            {
                // SI ELLE EST EN COURS ON BLOCQUE L'EXECUTION DU SCRIPT PHP
                /****/echo include("../erreurDeSession/index.php");

            }
        }

        // FONCTION POUR SAVOIR SI UN UTILISATEUR EST DEJA CONNECTER 
        public function etatSession()
        {
            include('../connexion/coordonnees_serveur.php');
            if($connexion->query("SELECT etat FROM cch_session WHERE etat = 'Actif'")->fetch())
            {
                $valSession = $connexion->query("SELECT etat FROM cch_session WHERE etat = 'Actif'")->fetch();
                return $valSession["etat"];
            }
            return 'none';
        }

        //UNE FONCTION QUI VAS RETOURNER LA PAGE D'ERREUR
        public function ErreurDeSession()
        {
            return include("../erreurDeSession/index.php");
        }
        // FONCTION POUR FERMER UNE SESSION
        public function fermerSession($nomUtilisateur)
        {
            include('../connexion/coordonnees_serveur.php');
            if($connexion->query("SELECT etat FROM cch_session WHERE etat = 'Actif' AND nom_utilisateur = '$nomUtilisateur'")->fetch())
            {
                $connexion->exec("UPDATE cch_session SET etat = 'Terminer'  WHERE etat = 'Actif' AND nom_utilisateur = '$nomUtilisateur'");
                // header
                echo "Fermer";
            }   
        }

    }  
?>