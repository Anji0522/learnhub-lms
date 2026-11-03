import { useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

const starterCode = {
  html: `<main class="card">
  <p class="eyebrow">MY FIRST PREVIEW</p>
  <h1>Hello, learner!</h1>
  <p>Change this page, then press Run preview.</p>
  <button id="say-hello">Try a click</button>
  <p id="message" aria-live="polite"></p>
</main>`,
  css: `body {
  margin: 0;
  padding: 2rem;
  color: #101828;
  background: #f7f8fc;
  font-family: system-ui, sans-serif;
}

.card {
  max-width: 32rem;
  padding: 2rem;
  margin: 2rem auto;
  border: 1px solid #e4e7ec;
  border-radius: 1rem;
  background: white;
}

button {
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  background: #635bff;
  cursor: pointer;
}`,
  javascript: `document.querySelector("#say-hello").addEventListener("click", () => {
  document.querySelector("#message").textContent =
    "Great work: your JavaScript handled a click!";
});`,
};

const editorTabs = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
];

function escapeScriptEnd(code) {
  return code.replace(/<\/script/gi, "<\\/script");
}

export default function CodePlayground({ practicePrompt }) {
  const [code, setCode] = useState(starterCode);
  const [activeTab, setActiveTab] = useState("html");
  const [previewCode, setPreviewCode] = useState(starterCode);
  const previewDocument = useMemo(
    () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:;"
    >
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>${previewCode.css}</style>
  </head>
  <body>
    ${previewCode.html}
    <script>
      window.addEventListener("error", (event) => {
        const output = document.createElement("pre");
        output.setAttribute("role", "alert");
        output.style.cssText = "padding:1rem;color:#b42318;background:#fef3f2;white-space:pre-wrap";
        output.textContent = "JavaScript error: " + event.message;
        document.body.append(output);
      });
      ${escapeScriptEnd(previewCode.javascript)}
    </script>
  </body>
</html>`,
    [previewCode],
  );

  function updateCode(value) {
    setCode((current) => ({ ...current, [activeTab]: value }));
  }

  function runCode() {
    setPreviewCode({ ...code });
  }

  function resetCode() {
    setCode({ ...starterCode });
    setPreviewCode({ ...starterCode });
    setActiveTab("html");
  }

  return (
    <section className="playground" aria-labelledby="playground-title">
      <div className="playground-heading">
        <div>
          <span className="eyebrow">LEARN BY MAKING</span>
          <h2 id="playground-title">Your practice space</h2>
          <p>{practicePrompt}</p>
        </div>
        <div className="playground-actions">
          <button
            className="button button-outline"
            onClick={resetCode}
            type="button"
          >
            <RotateCcw size={15} />
            Reset
          </button>
          <button
            className="button button-dark"
            onClick={runCode}
            type="button"
          >
            <Play size={15} />
            Run preview
          </button>
        </div>
      </div>

      <div className="playground-grid">
        <div className="playground-editor">
          <div
            className="playground-tabs"
            role="tablist"
            aria-label="Code editor"
          >
            {editorTabs.map((tab) => (
              <button
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? "active" : ""}
                id={`editor-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          {editorTabs.map((tab) => (
            <textarea
              aria-labelledby={`editor-tab-${tab.id}`}
              className="playground-code"
              hidden={activeTab !== tab.id}
              key={tab.id}
              onChange={(event) => updateCode(event.target.value)}
              spellCheck="false"
              value={code[tab.id]}
            />
          ))}
        </div>

        <div className="playground-preview">
          <div className="playground-preview-label">LIVE PREVIEW</div>
          <iframe
            sandbox="allow-scripts"
            srcDoc={previewDocument}
            title="Sandboxed code preview"
          />
        </div>
      </div>
      <p className="playground-safety">
        Code runs in an isolated preview. It cannot access LearnHub data or
        connect to external sites.
      </p>
    </section>
  );
}
