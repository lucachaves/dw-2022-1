import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Query parameters
// GET /hello/en?name=John
app.get('/hello/en', (req, res) => {
  try {
    const name = req.query.name;

    if (name) {
      res.send(`Hello, ${name}!`);
    } else {
      throw new Error('Name is required');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route parameters
// GET /hello/pt/John
app.get('/hello/pt/:name', (req, res) => {
  try {
    const name = req.params.name;

    if (name) {
      res.send(`Olá, ${name}!`);
    } else {
      throw new Error('Name is required');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Body parameters
// POST /hello/es
app.post('/hello/es', (req, res) => {
  try {
    const name = req.body.name;

    if (name) {
      res.send(`Hola, ${name}!`);
    } else {
      throw new Error('Name is required');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Content not found!');
});

// Error handler
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('App running on port 3000!');
});
