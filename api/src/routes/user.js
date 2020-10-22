const database = require('../database')
const router = require('express').Router()
const bcrypt = require('bcryptjs')

const admin = ["President", "Treasurer", "Recording", "Corresponding", "Historian"];

function validate(user) {
  return true
}

router.get('/', (req, res) => {
  res.send({"OK": true})
})

// router.post('/register', async (req, res) => {
//   let user = {
//     last_name: req.body.last_name,
//     first_name: req.body.first_name,
//     year: req.body.year,
//     major: req.body.major,
//     minor: req.body.minor,
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password
//   }
//   if (validate(user)) {
//     await bcrypt
//     .genSalt(10)
//     .then(salt => {
//       return bcrypt.hash(user.password, salt);
//     })
//     .then(hash => {
//       const sql = 'insert into users (username, password, email) values (?, ?, ?)'
//       database.query(sql, [user.username, hash, user.email], (err, result) => {
//         if (err) {
//           console.log(err)
//           res.send({"OK": false})
//         }
//         else {
//           res.send({"OK": true})
//         }
//       });
//     })
//     .catch(err => console.error(err.message));
//   }
// });

router.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let perms = req.query.perms
  let user;
  const sql = `select * from brothers where email='${email}'`
  database.query(sql,
    (err, result) => {
      if (err) {
        console.log(err)
        res.send({"OK": false})
      }
      if(result[0].password !== "null") {
        bcrypt.compare(password, result[0].password, (err, cmpre) => {
          if (err) {
            console.log(err)
            res.status(500).send(err)
          }
          // if (cmpre) {
          //   res.status(200).send({"loggedIn": true})
          // } else {
          //   res.status(401).send({"loggedIn": false})
          // }
          if(cmpre) {
            if(perms === "admin" && cmpre) {
              if(admin.includes(result[0].role)) {
                res.status(200).send({"loggedIn": true})
              } else {
                res.status(401).send({"loggedIn": false})
              }
            } else if(perms === "undefined" && cmpre) {
              res.status(200).send({"loggedIn": true})
            }
          } else {
            res.status(401).send({"loggedIn": false})
          }
        });
      } else {
        if(perms === "admin") {
          if(admin.includes(result[0].role)) {
            res.status(200).send({"loggedIn": true})
          } else {
            res.status(401).send({"loggedIn": false})
          }
        } else if(perms === "undefined") {
          if(result[0].password === password) {
            res.status(200).send({"loggedIn": true})
          } else {
            res.status(401).send({"loggedIn": false})
          }
        }
      }
    });
});

router.put('/update_password', async (req, res) => {
  let new_password = req.body.new_pass;
  let id = req.body.id;
  await bcrypt
  .genSalt(10)
  .then(salt => {
    return bcrypt.hash(new_password, salt);
  })
  .then(hash => {
    const sql = `update brothers set password=? where id=?`;
    database.query(sql, [hash, id], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send(result)
    });
  })
  .catch(err => console.error(err.message));
});

module.exports = router;
