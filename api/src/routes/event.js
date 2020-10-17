const router = require('express').Router()
const dateTime = require('node-datetime');

const database = require('../database')

router.get('/', (req, res) => {
  queries = {
    id: `id='${req.query.id}' and `,
    title: `title like '%${req.query.title}%' and `,
    event_date: `event_date like '%${dateTime.create(req.query.event_date).format('Y/m/d')}%' and `,
    event_time: `event_time like '%${dateTime.create(req.query.event_time).format('H:M')}%' and`
  }

  let sql = "select * from events where ";
  for(let category of Object.keys(queries)) {
    if(req.query[category]) {
      sql += queries[category]
    }
  }
  if(sql === "select * from events where ") {
    sql = sql.slice(0, -7) + ";"
  } else {
    sql = sql.slice(0, -5) + ";"
  }
  database.query(sql, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      result.map(event => event.event_date = dateTime.create(event.event_date).format("m/d/Y"))
      result.map(
        event => {
          let hr = parseInt(event.event_time.split(':')[0])
          let min = event.event_time.split(':')[1]
          let time = ""
          if (hr > 12) {
            time = (hr % 12) + ":" + min + " PM"
          } else {
            time = hr + ":" + min + " AM"
          }
          event.event_time = time;
        }
      )
      // console.log(result)
      res.header("Content-Type",'application/json');
      res.status(200).send(JSON.stringify(result, null, 4));
    }
  });
});

router.post('/add', (req, res) => {
  // console.log(req.body)
  let event = {
    title: req.body.title,
    event_date: dateTime.create(req.body.event_date).format('Y/m/d'),
    event_time: req.body.event_time
  }
  // console.log(event)
  const sql = `insert into events (title, event_date, event_time) values (?, ?, ?)`
  database.query(sql, [event.title, event.event_date, event.event_time],
    (err, result) => {
      if (err) {
        console.log(err)
        console.log("TEST")
        res.status(500).send(err)
      }
      res.status(200).send(result)
    });
});

router.delete('/delete', (req, res) => {
  const id = req.body.id;
  const sql = `delete from events where id=?`
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

module.exports = router;
