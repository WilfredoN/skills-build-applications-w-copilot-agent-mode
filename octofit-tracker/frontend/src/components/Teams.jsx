const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : "http://localhost:8000/api/teams";

export default function Teams() {
  return <p>Teams API: {apiEndpoint}</p>;
}
