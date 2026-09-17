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
  const [isPreview, setIsPreview] = useState(true);

  // غي نتا لي عندك هاد الرابط تقدر تعدل
  const isAdmin = window.location.search.includes("admin=adam123");

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (!title ||!url) return;
    let finalUrl = url.startsWith("http")? url : `https://${url}`;
    setLinks([...links, { id: Date.now(), title, url: finalUrl }]);
    setTitle("");
    setUrl("");
  };

  // إلى ماشي أدمن -> يبان غي البروفايل للزوار
  if (isPreview ||!isAdmin) {
    return (
      <div className="preview-page">
        {isAdmin && (
          <button className="preview-toggle" onClick={() => setIsPreview(false)}>
            Edit Mode ✏️
          </button>
        )}
        <div className="preview-card">
          <img src={myAvatar} className="avatar" alt="avatar" />
          <h2>Adam Smith</h2>
          <p>Digital Creator 🚀</p>
          <div className="links">
            {links.map((l) => (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer">
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // EDIT MODE - كيبان غي ليك
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
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer">
              {l.title}
            </a>
          ))}
        </div>
      </div>

      <div className="right">
        <h3>Dashboard</h3>
        <input placeholder="Link Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="add" onClick={addLink}>Add Link</button>

        <div className="manage">
          {links.map((l) => (
            <div key={l.id} className="manage-row">
              <span>{l.title}</span>
              <button onClick={() => setLinks(links.filter((x) => x.id!== l.id))}>Delete</button>
            </div>
          ))}
        </div>
        <p style={{marginTop: '20px', fontSize: '12px', opacity: 0.6}}>
          رابط الزوار: / <br/> رابط الإدارة:?admin=adam123
        </p>
      </div>
    </div>
  );
}

export default App;