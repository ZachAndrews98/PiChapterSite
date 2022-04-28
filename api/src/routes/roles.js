const router = require('express').Router()

const database = require('../database')

router.get('/', (req, res) => {
  let sql = `CALL get_roles(?);`
  database.query(sql, [req.query.role_name],
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
  let sql = `CALL insert_role(?,?)`
  database.query(sql, 
    [
      req.body.role_name,
      req.body.role_rank
    ], (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).send(err)
      }
      res.status(201).send(result)
    }
  )
});

router.get('/:role_id', (req, res) => {
  let sql = `CALL get_role(?)`
  database.query(sql,[req.params.role_id],(err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send(result[0][0])
    });
});

router.patch('/:role_id', (req, res) => {
  let sql = `CALL update_role(?,?,?)`
  database.query(sql,
    [
      req.params.role_id,
      req.body.role_name,
      req.body.role_rank
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(204).send(result)
    });
});

router.delete('/:role_id', (req, res) => {
  let sql = `CALL delete_role(?)`
  database.query(sql,[req.params.role_id],(err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(204).send(result)
    });
});


module.exports = router;
