const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dateTime = require('node-datetime');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const IP = "76.180.0.145"

const database = mysql.createConnection({
  host: "db",
  port: "3306",
  user: "zach",
  password: "ZachAndr2020#@",
  database: "brothers"
});

function filter_query(query) {
  if (query !== undefined) {
    return query.replace("'", "").replace("'", "").replace("`", "").replace("`", "")
  }
  return ""
}

function validate(user) {
  return true
}

app.get('/', (req, res) => {
  res.send(`Connected to API`);
});

app.post('/register', async (req, res) => {
  let user = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    year: req.body.year,
    major: req.body.major,
    minor: req.body.minor,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  }
  if (validate(user)) {
    await bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      const sql = 'insert into users (username, password, email) values (?, ?, ?)'
      database.query(sql, [user.username, hash, user.email], (err, result) => {
        if (err) {
          console.log(err)
          res.send({"success": false})
        }
        else {
          res.send({"success": true})
        }
      });
    })
    .catch(err => console.error(err.message));
  }
});

app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  const sql = `select * from users where username='${username}'`
  console.log(sql)
  database.query(sql,
    (err, result) => {
      if (err) {
        console.log(err)
        res.send({"success": false})
      }
      bcrypt.compare(password, result[0].password, (err, result) => {
        if (err) {
          console.log(err)
          res.send({"success": false})
        }
        if (result) {
          res.send({"success": true})
        } else {
          res.send({"success": false})
        }
      });
    });
});


app.get('/ip', (req, res) => {
  res.send(`IP: ${IP}`);
});

app.get('/users', (req, res) => {
  database.query('select * from users', (err, result) => {
    res.send(result);
  });
});

app.get('/brothers', (req, res) => {
  const sql = "select * from brothers;";
  database.query(sql, (err, result) => {
    res.send(result);
  });
});

app.get('/brother', (req, res) => {
  console.log(req.query.last_name)
  console.log(filter_query(req.query.last_name));
  first_name = `first_name like '%${filter_query(req.query.first_name)}%'`
  last_name = `last_name like '%${filter_query(req.query.last_name)}%'`
  let sql = undefined
  if (req.query.last_name && req.query.first_name) {
    sql = `select * from brothers where ${last_name} and ${first_name};`;
  } else if (req.query.last_name) {
    sql = `select * from brothers where ${last_name};`;
  } else if (req.query.first_name) {
    sql = `select * from brothers where ${first_name};`;
  }
  if (sql !== undefined) {
    database.query(sql, (err, result) => {
      res.send(result);
    });
  } else {
    res.send("No query supplied");
  }
});

app.get('/brother/:last_name/:first_name', (req, res) => {
  first_name = `first_name like '%${req.params.first_name.replace("'","")}%'`
  last_name = `last_name like '%${req.params.last_name}%'`
  const sql = `select * from brothers where ${last_name} and ${first_name};`;
  database.query(sql, (err, result) => {
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

app.post('/add_brother', (req, res) => {
  const last_name = req.body.last_name;
  const first_name = req.body.first_name;
  const year = parseInt(req.body.year);
  const major = req.body.major;
  const minor = req.body.minor;
  const email = req.body.email;
  const phone = req.body.phone;
  const sql = "insert into brothers (last_name, first_name, year, major, minor, email, phone) values (?,?,?,?,?,?,?)"
  database.query(sql, [last_name, first_name, year, major, minor, email, phone],
    (err, result) => {
      if (err) {
        console.log(err)
        res.send({"success": false})
      }
      res.send({"success": true})
  });
});

app.delete('/delete_brother', (req, res) => {
  const last_name = req.body.last_name;
  const first_name = req.body.first_name;
  const year = parseInt(req.body.year);
  const sql = "delete from brothers where last_name=? and first_name=? and year=?"
  database.query(sql, [last_name, first_name, year],
    (err, result) => {
      if (err) {
        res.send({"success": false})
      }
      if (result.affectedRows !== 0)
        res.send({"success": true})
      else res.send({"success": false})
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
