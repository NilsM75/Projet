document.getElementById("inscription").addEventListener("submit", function(e) {
	e.preventDefault() ;	
	document.getElementById("erreurEMail").innerHTML = "" ;
	document.getElementById("erreurPseudo").innerHTML = "" ;
	document.getElementById("erreurMDP1").innerHTML = "" ;
	document.getElementById("erreurMDP2").innerHTML = "" ;		
	document.getElementById("erreurEQ").innerHTML = "" ; 	
	
	let email = document.getElementById("email") ;
	let pseudo = document.getElementById("pseudo") ;
	let mdp1 = document.getElementById("motDePasse") ; 
	let mdp2 = document.getElementById("confirmerMotDePasse") ; 
	let erreur = false ; 
	let erreurEMail, erreurPseudo, erreurMDP1, erreurMDP2, erreurEQ ; 
	
	if(!email.value) {
		email.style.backgroundColor = "#fba" ;
		email.focus() ; 
		erreurEMail = "Veuillez renseigner votre adresse mail." ;
		erreur = true ;
	} else {
		/* Vérification que l'email renseignée est de la forme X@Y.T avec X, Y et T des chaines de caractères de longueurs supérieures ou égales à 1 */
		let compteurArobase = 0 ;
		let compteurPoint = 0 ; 
		let nbc = 0 ;
		let caracteresAvantPoint = false ; 
		let caracteresAvantArobase = false ; 
		let aux ;

		for(let i = 0 ; i < email.value.length ; i ++){
				nbc ++ ;
				
				if(i > 0){
					aux = email.value.charAt(i - 1) ;
				}
				
				if(email.value.charAt(i) === '@'){
					compteurArobase += 1 ;
					if(nbc >= 1){
						if (aux != '@' && aux != '.') {
							caracteresAvantArobase = true ;
						}
					}
				}
				
				if(email.value.charAt(i) === '.'){
					compteurPoint += 1 ;
					if(nbc >= 1){
						if (aux != '@' && aux != '.') {
							caracteresAvantPoint = true ; 
						}
					}
				}
		}
		
		if((compteurArobase != 1) || (compteurPoint < 1) || (!caracteresAvantArobase) || (!caracteresAvantPoint) || (email.value.length < 5)){
			email.style.backgroundColor = "#fba" ;
			email.focus() ; 
			erreurEMail = "L'adresse mail renseignée est non valide ! Vérifiez l'adresse mail renseignée !" ;
			erreur = true ;
		}
	}
	
	if(!pseudo.value) {
		pseudo.style.backgroundColor = "#fba" ;
		pseudo.focus() ; 
		erreurPseudo = "Veuillez renseigner un pseudonyme." ;
		erreur = true ;
	} 
	
	if(!mdp1.value) {
		mdp1.style.backgroundColor = "#fba" ;
		mdp1.focus() ; 
		erreurMDP1 = "Veuillez renseigner un mot de passe." ; 
		erreur = true ;
		tp = true ; 
	}
	
	if(!mdp2.value) {
		mdp2.style.backgroundColor = "#fba" ;
		mdp2.focus() ; 
		erreurMDP2 = "Veuillez confirmer votre mot de passe." ; 
		erreur = true ; 
	} 
	
	if(mdp1.value != mdp2.value){
		mdp1.style.backgroundColor = "#fba" ;
		mdp1.focus() ; 
		mdp2.style.backgroundColor = "#fba" ;
		mdp2.focus() ; 
		erreurEQ = "Les deux mots de passes ne sont pas identiques !" ; 
		erreur = true ; 
	}
	
	if (erreur){
		e.preventDefault() ; 
		if(erreurEMail != undefined) 
			document.getElementById("erreurEMail").innerHTML = erreurEMail ;
		if(erreurPseudo != undefined) 
			document.getElementById("erreurPseudo").innerHTML = erreurPseudo ;
		if(erreurMDP1 != undefined) 
			document.getElementById("erreurMDP1").innerHTML = erreurMDP1 ;
		if(erreurMDP2 != undefined) 
			document.getElementById("erreurMDP2").innerHTML = erreurMDP2 ;		
		if(erreurEQ != undefined)
			document.getElementById("erreurEQ").innerHTML = erreurEQ ; 
		return false ; 
	}

	alert("Inscription éffectuée avec succès !") ;
	return true ; 
});
/*
function verifPseudo(champ)
	{
		if(champ.value.length < 2 || champ.value.length > 25 || !(chaineAlphabetique(ch)))
			{
				effetErreur(champ, true);
				return (false) ;
			}
			
		return (true) ;
	}

function chaineAlphabetique(chaine)
	{ 
		if (chaineNonVide(chaine))
			{
				chaine = chaine.toUpperCase() ;
				let i = 0 ;
				for (i = 0; i < chaine.length ; i++)
					{
						if ((chaine.charAt(i) < "A") || (chaine.charAt(i) > "Z"))
							{
								return (false) ;
							}
					}
			}
			
		return (true) ;
	}*/