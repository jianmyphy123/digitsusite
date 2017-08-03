import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import users from './routes/users';
const PORT = process.env.PORT || 8080;

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => console.log('Running on localhost:'+PORT));
