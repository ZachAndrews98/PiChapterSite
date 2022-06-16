const express = require('express');
const dateTime = require('node-datetime');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/brothers', require('./routes/brothers'))
app.use('/api/executives', require('./routes/executives'))
app.use('/api/roles', require('./routes/roles'))
app.use('/api/users', require('./routes/user'))
app.use('/api/events', require('./routes/event'))


app.get('/api', (req, res) => {
  res.send(`Connected to API`);
});

app.get('/api/grad_year', (req, res) => {
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