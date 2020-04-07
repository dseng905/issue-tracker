const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const method = require('./methods.js');
const methodOverride = require('method-override');

app.set('case sensitive routing', true);
app.use(methodOverride('_method'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet.xssFilter());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', (req,res) => res.sendFile(process.cwd() + '/views/index.html'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.route('/api/issues/:project')
  .post(method.addIssue) //Add an issue
  .put(method.updateIssue) //Update an issue if it exists
  .delete(method.deleteIssue) //Delete an issue if it exists
  .get(method.getIssue); //Return page with issue info

app.use((req,res,next) => {
  res.status(404)
    .type('text')
    .send('Page could not be found.')
})

app.listen(process.env.PORT || 3000, () => console.log("App is listening..."));