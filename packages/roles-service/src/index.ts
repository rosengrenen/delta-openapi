import express from 'express';
import {Role} from './__generated__';

const app = express();

app.use((_req, res) => {
  return res.send({ping: 'pong'});
})

app.listen(3000, () => console.log("Roles service running"));
