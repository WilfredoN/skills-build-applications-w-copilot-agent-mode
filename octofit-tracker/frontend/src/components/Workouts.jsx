const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : "http://localhost:8000/api/workouts";

export default function Workouts() {
  return <p>Workouts API: {apiEndpoint}</p>;
}
