const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let talks = {};

app.get('/talks', (req, res) => {
  res.json(Object.values(talks));
});

app.put('/talks/:title', (req, res) => {
  const { title } = req.params;
  const { presenter, summary } = req.body;
  talks[title] = { title, presenter, summary, comments: [] };
  res.sendStatus(204);
});

app.post('/talks/:title/comments', (req, res) => {
  const { title } = req.params;
  const { author, message } = req.body;
  if (talks[title]) {
    talks[title].comments.push({ author, message });
    res.sendStatus(204);
  } else {
    res.status(404).send(`No talk '${title}' found`);
  }
});

app.delete('/talks/:title', (req, res) => {
  const { title } = req.params;
  if (talks[title]) {
    delete talks[title];
    res.sendStatus(204);
  } else {
    res.status(404).send(`No talk '${title}' found`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

