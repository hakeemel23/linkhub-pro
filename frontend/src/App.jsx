import { useState, useEffect } from "react";
import myAvatar from "./assets/avatar.jpg";
import "./App.css";

function App() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem("links");
    return saved? JSON.parse(saved) : [
      { id: 1, title: "My Portfolio", url: "https://behance.net" },
      { id: 2, title: "Hire me on Upwork", url: "https://upwork.com" },
      { id: 3, title: "WhatsApp", url: "https://wa.me/2126" },
      { id: 4, title: "YouTube Channel", url: "https://youtube.com" },
      { id: 5, title: "Don't Click 😂", url: "https://google.com" },
    ];
  });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (!title ||!url) return;
    setLinks([...links, { id: Date.now(), title, url }]);
    setTitle(""); setUrl("");
  };

  // PREVIEW MODE - كيفاش كيشوفوه الناس
  if (isPreview) {
    return (
      <div className="preview-page">
        <button className="preview-toggle" onClick={() => setIsPreview(false)}>
          Back to Edit
        </button>
        <div className="preview-card">
          <img src={myAvatar} className="avatar" alt="avatar" />
          <h2>Adam Smith</h2>
          <p>Digital Creator 🚀</p>
          <div className="links">
            {links.map(l => (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer">
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // EDIT MODE - اليسار فيه المعاينة واليمين فيه التحكم
  return (
    <div className="layout">
      <button className="preview-toggle" onClick={() => setIsPreview(true)}>
        View as Visitor 👁️
      </button>

      <div className="left">
        <img src={myAvatar} className="avatar" alt="avatar" />
        <h2>Adam Smith</h2>
        <p>Digital Creator 🚀</p>
        <div className="links">
          {links.map(l => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer">
              {l.title}
            </a>
          ))}
        </div>
      </div>

      <div className="right">
        <h3>Dashboard</h3>
        <input placeholder="Link Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
        <button className="add" onClick={addLink}>Add Link</button>

        <div className="manage">
          {links.map(l => (
            <div key={l.id} className="manage-row">
              <span>{l.title}</span>
              <button onClick={() => setLinks(links.filter(x => x.id!== l.id))}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;