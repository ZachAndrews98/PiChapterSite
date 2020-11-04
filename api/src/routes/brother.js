const router = require('express').Router()
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');

const database = require('../database')

router.get('/', (req, res) => {
  let grad;
  if(req.query.grad === 'true') {
    grad = "where role='Graduate'"
  } else if(req.query.grad === 'false'){
    grad = "where role!='Graduate'"
  } else {
    grad = ""
  }
  let sql = `select * from brothers ${grad}`;
  queries = {
    first_name: `first_name like '%${req.query.first_name}%'`,
    last_name: `last_name like '%${req.query.last_name}%'`,
    email: `email like '%${req.query.email}%'`,
    id: `id='${req.query.id}'`,
    role: `role='${req.query.role}'`,
    email: `email='${req.query.email}'`,
    major: `major='${req.query.major}'`,
    minor: `minor='${req.query.minor}'`,
    year: `year='${req.query.year}'`
  }
  if(Object.values(req.query).length > 0 && req.query.grad === undefined) {
    sql += ' where ' + Object.values(queries).filter(Q => !Q.includes('undefined')).join(' and ') + ";"
  } else {
    sql += ";"
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
  let grad;
  if(req.query.grad === 'true') {
    grad = "where role='Graduate'"
  } else if(req.query.grad === 'false'){
    grad = "where role!='Graduate'"
  } else {
    grad = ""
  }
  let sql = `update brothers
  set last_name=?, first_name=?, year=?, major=?, minor=?, email=?, phone=?, role=?
  ${grad} where id=?`;
  let user = {
    id: req.body.id,
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    year: parseInt(req.body.year),
    major: req.body.major,
    minor: req.body.minor,
    email: req.body.email,
    phone: req.body.phone.replace('(','').replace(')','').replace('-',''),
    role: req.body.role
  }
  console.log(sql)
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
    phone: req.body.phone.replace('(','').replace(')','').replace('-',''),
    role: req.body.role,
    password: randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    })
  }
  console.log(user.password)
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
router.put('/transfer', (req, res) => {
  let role;
  if(req.query.grad === 'true') {
    role = `'Brother'`
  } else if(req.query.grad === 'false'){
    role = `'Graduate'`
  } else {
    role = ""
  }
  database.query(`update brothers set role=${role} where id=?`, req.body.id,
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      console.log(result)
      res.status(200).send(result)
    });
});

module.exports = router;
