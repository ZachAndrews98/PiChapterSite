const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dateTime = require('node-datetime');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const database = require('./database')
const brothers = require('./routes/brothers')
const user = require('./routes/user')

const IP = "76.180.0.145"

function filter_query(query) {
  if (query !== undefined) {
    return query.replace("'", "").replace("'", "").replace("`", "").replace("`", "")
  }
  return ""
}

app.use('/brothers', brothers)
app.use('/user', user)

app.get('/', (req, res) => {
  res.send(`Connected to API`);
});



app.get('/ip', (req, res) => {
  res.send(`IP: ${IP}`);
});

app.get('/users', (req, res) => {
  database.query('select * from users', (err, result) => {
    res.send(result);
  });
});

app.get('/grad_year', (req, res) => {
  let class_year = dateTime.create().format('Y')
  const current_month = dateTime.create().format('m')
  const cutoff = dateTime.create('06').format('m')
  if (current_month > cutoff) {
    class_year = parseInt(class_year) + 1;
  }
  res.send(class_year.toString())
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
