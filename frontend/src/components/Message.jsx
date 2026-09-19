export default function Message({ text, error = false }) {
  if (!text) return null;
  return <div className={error ? "message error" : "message"}>{text}</div>;
}
