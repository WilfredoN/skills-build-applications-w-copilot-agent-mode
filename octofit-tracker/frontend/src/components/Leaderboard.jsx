const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : "http://localhost:8000/api/leaderboard";

export default function Leaderboard() {
  return <p>Leaderboard API: {apiEndpoint}</p>;
}
