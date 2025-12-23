let session = new Session();
session.enregistrerTransaction();
session.gererLesMontantsJournaliers();
session.gererLesClients();
session.depotSansAncaissement();
session.transactionsJournaliere();
session.suivitTransaction();
session.deconnexion();
