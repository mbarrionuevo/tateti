import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MetaTags from "react-meta-tags";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MetaTags>
      <title>Page 1</title>
      <meta name="description" content="Some description." />
      <meta property="og:title" content="MyApp" />
      <meta property="og:image" content={`${window.location.href}assets/logo.jpg`} />
    </MetaTags>
    <App />
  </React.StrictMode>
);
