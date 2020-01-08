const express = require('express');
const expressHBS = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuid = require('uuid');


/* Base de donnée avec MongoDB */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moncvenligne', { useNewUrlParser: true });

const User = mongoose.model('User', { mail: String, password: String }); //Creation d'un model appelé User



const app = express();




/* Generation de pdf a partir d'une page html avec puppeteer */
const puppeteer = require('puppeteer')

/* Navigue vers un URL et genere un fichier PDF */
async function printPDF(data) {
  const browser = await puppeteer.launch(); //On lance le navigateur
  const page = await browser.newPage(); //On ouvre une nouvelle page

  const publicDirectory = `${__dirname}/public/`; //equivalent à __dirname + '/public'

  const uncompileTemplate = await fs.promises.readFile(`${publicDirectory}modele1.html`);

  const template = handlebars.compile(uncompileTemplate.toString());
  
  //à la place de google : __dirname + 'modele1.html'
  await page.setContent(template(data)); //Accede a l'URL fournie, waitUntil: 'networkidle0' signifie que le pdf peut se faire 500ms apres que toute la page soit chargée
  const pdf = await page.pdf({ format: 'A4' }); //On stock le pdf dans une variable

  await browser.close();

  const path = `pdf/${uuid.v4()}.pdf`;

  await fs.promises.writeFile(`${publicDirectory}${path}`, pdf);

  return path;
}
/* FIN Generation de pdf a partir d'une page html avec puppeteer */




app.use(express.static('public'));

app.engine('hbs', expressHBS({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/', //__dirname renvoie comme valeur le chemin du dossier courant
}));
app.set('view engine', 'hbs');

app.get('', function (req, res) {
  const data = {
    title: 'MonCVEnLigne Accueil',
  }
  res.render('form1.hbs', data);
});

app.get('/form', function (req, res) {
  const data = {
    title: 'MonCVEnLigne Elaboration du CV',
  };
  res.render('form2.hbs', data);
});

app.get('/modele1', function (req, res) {
  res.sendFile(__dirname + '/public/modele1.html')
});

app.post('/print', bodyParser.json(), async function (req, res) {
  const path = await printPDF(req.body);
  res.json({ path });
});

app.get('/*', function (req, res) {
  res.sendStatus(404);
})

app.listen(3000, function () {
  console.log('Application qui écoute sur le port 3000!');
})
