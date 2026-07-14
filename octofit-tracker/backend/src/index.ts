import express from 'express';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', databaseReadyState: db.readyState });
});

app.listen(port, () => {
  console.log(`Octofit Tracker backend listening on port ${port}`);
});