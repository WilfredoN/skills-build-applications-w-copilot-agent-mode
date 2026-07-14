import { app, port, baseUrl } from './server';

app.listen(port, () => {
  console.log(`Octofit Tracker backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
