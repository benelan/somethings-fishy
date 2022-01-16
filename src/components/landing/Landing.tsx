import React from "react";
import "./Landing.css";

// shamelessly borrowed from https://codepen.io/goodkatz/pen/LYPGxQz
const Landing: React.FC = (): JSX.Element => (
  <div className="header">
    <a href="https://github.com/benelan/somethings-fishy" rel="noopener noreferrer" target="_blank">
      <img
        alt="GitHub"
        src="/img/github-logo.png"
        style={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
      />
    </a>
    <div className="inner-header flex" />

    <div id="title">
      <h1>Something's Fishy</h1>
    </div>
    <div id="subtitle">Investigating the impact of human influence on aquatic ecosystems</div>
    <div>
      <svg
        className="waves"
        preserveAspectRatio="none"
        shapeRendering="auto"
        viewBox="0 24 150 28"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            id="gentle-wave"
          />
        </defs>
        <g className="parallax">
          <use fill="rgba(255,255,255,0.7" x="48" xlinkHref="#gentle-wave" y="0" />
          <use fill="rgba(255,255,255,0.5)" x="48" xlinkHref="#gentle-wave" y="3" />
          <use fill="rgba(255,255,255,0.3)" x="48" xlinkHref="#gentle-wave" y="5" />
          <use fill="#fff" x="48" xlinkHref="#gentle-wave" y="7" />
        </g>
      </svg>
    </div>
  </div>
);

export default Landing;
