export default function Loader({ label = "Loading your learning space" }) {
  return <div className="loader-wrap"><span className="spinner" /><span>{label}</span></div>;
}
