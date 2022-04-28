const router = require('express').Router()

const database = require('../database')

router.get('/', (req, res) => {
  let sql = `CALL get_executives();`
  database.query(sql, 
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


// router.post('/', async (req, res) => {
//   let sql = `CALL insert_brother(?,?,?,?,?,?,?,?)`
//   database.query(sql, 
//     [
//       req.body.last_name,
//       req.body.first_name,
//       req.body.grad_year,
//       req.body.major,
//       req.body.minor,
//       req.body.email,
//       req.body.phone,
//       req.body.role_id
//     ], (err, result) => {
//       if (err) {
//         console.log(err)
//         res.status(400).send(err)
//       }
//       res.status(201).send(result)
//     }
//   )
// });

router.get('/:exec_name', (req, res) => {
  let sql = `CALL get_executive(?)`
  database.query(sql,[req.params.exec_name],(err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send(result[0][0])
    });
});

router.patch('/:exec_name', (req, res) => {
  let sql = `CALL update_executive(?,?)`
  database.query(sql,
    [
      req.params.exec_name,
      req.body.brother_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(204).send(result)
    });
});

module.exports = router;
