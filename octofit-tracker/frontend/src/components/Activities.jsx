const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : "http://localhost:8000/api/activities";

export default function Activities() {
  return <p>Activities API: {apiEndpoint}</p>;
}
