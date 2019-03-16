require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.DATABASE_FILE);
const PORT = process.env.PORT || 3000;
const db = low(adapter);
const app = express();

app.use(bodyParser.json());

function transformCats(cats) {
   return cats.map(cat => ({
      id: cat.id,
      name: cat.name,
      dateOfBirth: cat.dateOfBirth,
      breed: cat.breed,
      pedigree: cat.pedigree
   }))
}

app.get('/cats', (req, res) => {
   const cats = db.get('cats').value();
   res.send(transformCats(cats));
});

app.get('/cats/:id', (req, res) => {
   const cat = db.get('cats')
       .find({ id: req.params.id })
       .value();
   if (cat) {
      res.send(cat);
   } else {
      res.status(404).send({ error: 'Cat not found' });
   }
});

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});
