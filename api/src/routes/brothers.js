const router = require('express').Router()

const database = require('../database')

router.get('/', (req, res) => {
  let sql
  if(typeof req.query.grads !== 'undefined' && req.query.grads !== true) 
    sql = `CALL get_undergraduates(?,?,?,?,?,?,?,?);`
  else
    sql = `CALL get_brothers(?,?,?,?,?,?,?,?);`
  database.query(sql, 
    [
      req.query.last_name,
      req.query.first_name,
      req.query.grad_year,
      req.query.major,
      req.query.minor,
      req.query.email,
      req.query.phone,
      req.query.role_id
    ],
    (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        res.header("Content-Type",'application/json');
        res.status(200).send(JSON.stringify(result[0], null, 4));
      }
    }
  );
});


router.post('/', async (req, res) => {
  let sql = `CALL insert_brother(?,?,?,?,?,?,?,?)`
  database.query(sql, 
    [
      req.body.last_name,
      req.body.first_name,
      req.body.grad_year,
      req.body.major,
      req.body.minor,
      req.body.email,
      req.body.phone,
      req.body.role_id
    ], (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).send(err)
      }
      res.status(201).send(result)
    }
  )
});

router.get('/:brother_id', (req, res) => {
  let sql = `CALL get_brother(?)`
  database.query(sql,[req.params.brother_id],(err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send(result[0][0])
    });
});

router.patch('/:brother_id', (req, res) => {
  let sql = `CALL update_brother(?,?,?,?,?,?,?,?,?)`
  database.query(sql,
    [
      req.params.brother_id,
      req.body.last_name,
      req.body.first_name,
      req.body.year,
      req.body.major,
      req.body.minor,
      req.body.email,
      req.body.phone,
      req.body.role_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(204).send(result)
    });
});

router.delete('/:brother_id', (req, res) => {
  let sql = `CALL delete_brother(?)`
  database.query(sql,[req.params.brother_id],(err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(204).send(result)
    });
});


module.exports = router;
