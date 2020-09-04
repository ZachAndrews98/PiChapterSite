const router = require('express').Router()
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');

const database = require('../database')

// router.get('/', (req, res) => {
//   const sql = "select * from brothers;";
//   database.query(sql, (err, result) => {
//     res.send(result);
//   });
// });

router.get('/', (req, res) => {
  first_name = `first_name like '%${req.query.first_name}%'`
  last_name = `last_name like '%${req.query.last_name}%'`
  let sql = undefined
  if (req.query.last_name && req.query.first_name) {
    sql = `select * from graduates where ${last_name} and ${first_name};`;
  } else if (req.query.last_name) {
    sql = `select * from graduates where ${last_name};`;
  } else if (req.query.first_name) {
    sql = `select * from graduates where ${first_name};`;
  } else {
    sql = "select * from graduates;";
  }
  if (sql !== undefined) {
    database.query(sql, (err, result) => {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(result, null, 4));
    });
  } else {
    res.send("No query supplied");
  }
});

router.get('/:last_name/:first_name', (req, res) => {
  first_name = `first_name like '%${req.params.first_name.replace("'","")}%'`
  last_name = `last_name like '%${req.params.last_name}%'`
  const sql = `select * from graduates where ${last_name} and ${first_name};`;
  database.query(sql, (err, result) => {
    res.send(result);
  });
});

router.put('/edit', (req, res) => {
  let user = {
    id: req.body.id,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    year: parseInt(req.body.year),
    major: req.body.major,
    minor: req.body.minor,
    email: req.body.email,
    phone: req.body.phone
  }
  const sql = `update graduates
  set last_name=?, first_name=?, year=?, major=?, minor=?, email=?, phone=?
  where id=?`
  database.query(sql,
    [
      user.last_name,
      user.first_name,
      user.year,
      user.major,
      user.minor,
      user.email,
      user.phone,
      user.id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.send({"success": false})
      }
      res.send({"success": true})
    });
});

router.post('/add', async (req, res) => {
  let user = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    year: parseInt(req.body.year),
    major: req.body.major,
    minor: req.body.minor,
    email: req.body.email,
    phone: req.body.phone,
    password: randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    })
  }
  console.log(user)
  await bcrypt
  .genSalt(10)
  .then(salt => {
    return bcrypt.hash(user.password, salt);
  })
  .then(hash => {

    const sql = "insert into graduates \
    (last_name, first_name, year, major, minor, email, phone, password) \
    values (?,?,?,?,?,?,?,?)"
    database.query(sql,
      [
        user.last_name, user.first_name, user.year, user.major,
        user.minor, user.email, user.phone, hash
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.send({"success": false})
        }
        res.send({"success": true})
    });
  })
  .catch(err => console.error(err.message));
});

router.delete('/delete', (req, res) => {
  const id = req.body.id;
  const sql = `delete from graduates where id=?`
  database.query(sql, id,
    (err, result) => {
      if (err) {
        res.send({"success": false})
      }
      if (result.affectedRows !== 0)
        res.send({"success": true})
      else res.send({"success": false})
  });
});

// Transfer graduate to brothers
router.post('/transfer', (req, res) => {
  database.query(`select * from graduates where id=?`, req.body.id,
  (err, result) => {
    if (err) {
      res.send({"success": false})
    }
    let sql = "insert into brothers \
    (last_name, first_name, year, major, minor, email, phone, password) \
    values (?,?,?,?,?,?,?,?)"
    database.query(sql,
      [
        result[0].last_name, result[0].first_name, result[0].year, result[0].major,
        result[0].minor, result[0].email, result[0].phone, result[0].password
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.send({"success": false})
        }
    });
  });
  sql = `delete from graduates where id=?`
  database.query(sql, req.body.id,
    (err, result) => {
      if (err) {
        res.send({"success": false})
      }
      if (result.affectedRows !== 0)
        res.send({"success": true})
      else res.send({"success": false})
  });
});

module.exports = router;
