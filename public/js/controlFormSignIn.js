function validation(f) {
  if (f.password1.value == '' || f.password2.value == '' || f.mail.value == '') {
    alert('Tous les champs ne sont pas remplis');
    f.password1.focus();
    return false;
    }

  else if (f.password1.value != f.password2.value) {
    alert('Ce ne sont pas les mêmes mots de passe!');
    f.password1.focus();
    return false;
    }

  else if (f.password1.value == f.password2.value) {
    return true;
    }

  else {
    f.password1.focus();
    return false;
    }
  }

/*
const user1 = new User({ mail: '{{{mail}}}}' password: '{{{motDePasse}}}' })
user1.save(function (err){
  if (err) {throw err;}
  console.log('user1 à bien été crée')
}); 
*/