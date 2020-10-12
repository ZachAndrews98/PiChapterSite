const router = require('express').Router()
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');

const database = require('../database')

router.get('/', (req, res) => {
  queries = {
    first_name: `first_name like '%${req.query.first_name}%' and `,
    last_name: `last_name like '%${req.query.last_name}%' and `,
    email: `email like '%${req.query.email}%' and `,
    id: `id='${req.query.id}' and `,
    role: `role='${req.query.role}' and `,
    email: `email='${req.query.email}' and `,
    major: `major='${req.query.major}' and `,
    minor: `minor='${req.query.minor}' and `,
    year: `year='${req.query.year}' and `
  }

  let sql = "select * from brothers where ";
  for(let category of Object.keys(queries)) {
    if(req.query[category]) {
      sql += queries[category]
    }
  }
  if(sql === "select * from brothers where ") {
    sql = sql.slice(0, -7) + ";"
  } else {
    sql = sql.slice(0, -5) + ";"
  }
  database.query(sql, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.header("Content-Type",'application/json');
      res.status(200).send(JSON.stringify(result, null, 4));
    }
  });
});

router.get('/:last_name/:first_name', (req, res) => {
  first_name = `first_name like '%${req.params.first_name.replace("'","")}%'`
  last_name = `last_name like '%${req.params.last_name}%'`
  const sql = `select * from brothers where ${last_name} and ${first_name};`;
  database.query(sql, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.header("Content-Type",'application/json');
      res.status(200).send(JSON.stringify(result, null, 4));
    }
  });
});

router.get("/cabinet", (req, res) => {
  let cabinet = {
    President: {},
    Treasurer: {},
    Recording: {},
    Corresponding: {},
    Historian: {}
  }
  let sql = `select * from brothers where role=? or role=? or role=? or role=? or role=?`
  database.query(sql, Object.keys(cabinet),
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        for(let role of Object.keys(cabinet)) {
          cabinet[role] = result.find(element => element.role == role)
        }
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(cabinet, null, 4));
      }
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
    phone: req.body.phone,
    role: req.body.role
  }
  const sql = `update brothers
  set last_name=?, first_name=?, year=?, major=?, minor=?, email=?, phone=?, role=?
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
      user.role,
      user.id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send(result)
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
    role: req.body.role,
    password: randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    })
  }
  await bcrypt
  .genSalt(10)
  .then(salt => {
    return bcrypt.hash(user.password, salt);
  })
  .then(hash => {
    const sql = "insert into brothers \
    (last_name, first_name, year, major, minor, email, phone, password, role) \
    values (?,?,?,?,?,?,?,?,?)"
    database.query(sql,
      [
        user.last_name, user.first_name, user.year, user.major,
        user.minor, user.email, user.phone, hash, user.role
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        }
        res.status(200).send(result)
    });
  })
  .catch(err => console.error(err.message));
});

router.delete('/delete', (req, res) => {
  const id = req.body.id;
  const sql = `delete from brothers where id=?`
  database.query(sql, id,
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      if (result.affectedRows !== 0)
        res.status(200).send(result)
      else res.status(404).send(result)
  });
});

// Transfer brother to graduates
router.post('/transfer', (req, res) => {
  database.query(`select * from brothers where id=?`, req.body.id,
  (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    let sql = "insert into graduates \
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
          res.status(500).send(err)
        }
    });
  });
  sql = `delete from brothers where id=?`
  database.query(sql, req.body.id,
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      if (result.affectedRows !== 0)
        res.send({"success": true})
      else res.send({"success": false})
  });
});

module.exports = router;
