require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.DATABASE_FILE);
const PORT = process.env.PORT || 3000;
const db = low(adapter);
const app = express();

const envOrigins = process.env.ALLOWED_ORIGINS.split(',').map(url => url.trim()).filter(Boolean);

const allowedOrigins = ['http://localhost', 'http://localhost:8080', ...envOrigins];

app.use(cors(
    {
       origin: function(origin, callback){
          if(!origin) return callback(null, true);

          if(allowedOrigins.indexOf(origin) === -1){
             const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
             return callback(new Error(msg), false);
          }
          return callback(null, true);
       }
    }
));
app.use(bodyParser.json());

/**
 * Remap out the output of cats to save bandwidth.
 * @param {Array} cats
 * @returns {Array}
 *
 * @todo Add more properties
 * @body Maybe add more properties that can be shown about the cat.
 */
function transformCats(cats) {
   return cats.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      dateOfBirth: cat.dateOfBirth,
      breed: cat.breed,
      pedigree: cat.pedigree
   }))
}

app.get('/cats', (req, res) => {
   const cats = db.get('cats').value();
   res.send({ data: transformCats(cats) });
});

app.get('/cats/:slug', (req, res) => {
   const cat = db.get('cats')
       .find({ slug: req.params.slug })
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
