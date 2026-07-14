const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : "http://localhost:8000/api/users";

export default function Users() {
  return <p>Users API: {apiEndpoint}</p>;
}
