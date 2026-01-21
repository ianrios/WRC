import { useState } from "react";
import "./Experiments.scss";
import {
  SIZE_TIERS,
  BASE_SIZES,
  getDesktopPositionsWithLabels,
  getMobilePositionsWithLabels,
} from "../../config/navLayout";

// Import all icons for preview
import { Dot } from "../icons/Dot";
import { Cube } from "../icons/Cube";
import { AtSign } from "../icons/AtSign";
import { Question } from "../icons/Question";
import { Star } from "../icons/Star";
import { Honeycomb } from "../icons/Honeycomb";
import { Blockchain } from "../icons/Blockchain";
import { Fingerprint } from "../icons/Fingerprint";
import { Play } from "../icons/Play";
import { Merch } from "../icons/Merch";
import { Gear } from "../icons/Gear";
import { Home } from "../icons/Home";

export function Experiments() {
  const [selectedAnimation, setSelectedAnimation] = useState("fadeInDown");
  const [iconSize, setIconSize] = useState(48);
  const [selectedLayout, setSelectedLayout] = useState("current");

  // Layout Editor State
  const [editorMode, setEditorMode] = useState("desktop"); // "desktop" or "mobile"
  const [selectedIcon, setSelectedIcon] = useState("Home");
  const [customSizes, setCustomSizes] = useState({ ...BASE_SIZES });
  const [copySuccess, setCopySuccess] = useState(false);

  // Initialize custom positions from current ForceNav.js preset
  // These are loaded from the centralized config in navLayout.js
  const [customDesktopPositions, setCustomDesktopPositions] = useState(
    getDesktopPositionsWithLabels()
  );

  const [customMobilePositions, setCustomMobilePositions] = useState(
    getMobilePositionsWithLabels()
  );

  // Get current positions based on editor mode
  const currentPositions =
    editorMode === "desktop" ? customDesktopPositions : customMobilePositions;

  // Update position for selected icon - use direct setState to avoid stale closure
  const updateIconPosition = (axis, event) => {
    const numValue = Number(event.target.value);

    if (editorMode === "desktop") {
      setCustomDesktopPositions((prev) =>
        prev.map((pos) =>
          pos.label === selectedIcon ? { ...pos, [axis]: numValue } : pos
        )
      );
    } else {
      setCustomMobilePositions((prev) =>
        prev.map((pos) =>
          pos.label === selectedIcon ? { ...pos, [axis]: numValue } : pos
        )
      );
    }
  };

  // Generate export JSON
  const generateExportJSON = () => {
    return {
      sizes: customSizes,
      desktop: customDesktopPositions.map(({ label, x, y }) => ({
        x,
        y,
        label,
      })),
      mobile: customMobilePositions.map(({ label, x, y }) => ({ x, y, label })),
    };
  };

  // Copy JSON to clipboard
  const copyToClipboard = () => {
    const json = JSON.stringify(generateExportJSON(), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Reset to current ForceNav preset
  const resetToCurrentPreset = () => {
    setCustomDesktopPositions(getDesktopPositionsWithLabels());
    setCustomMobilePositions(getMobilePositionsWithLabels());
    setCustomSizes({ ...BASE_SIZES });
  };

  // Icon list for dropdown
  const iconList = [
    "Home",
    "Artists",
    "Releases",
    "Collections",
    "Contests",
    "Merch",
    "Products",
    "Live",
    "Nexus",
    "Contact",
    "Info",
    "Admin",
  ];

  // Map page names to icon components
  const iconComponents = {
    Home: Home,
    Artists: Fingerprint,
    Releases: Dot,
    Collections: Honeycomb,
    Contests: Star,
    Merch: Merch,
    Products: Cube,
    Live: Play,
    Nexus: Blockchain,
    Contact: AtSign,
    Info: Question,
    Admin: Gear,
  };

  // Get icon size based on tier and custom sizes
  const getIconSize = (pageName) => {
    const tier = SIZE_TIERS[pageName] || "regular";
    return customSizes[tier];
  };

  const icons = [
    { name: "Home", component: Home, usedFor: "Home page" },
    { name: "Fingerprint", component: Fingerprint, usedFor: "Artists" },
    { name: "Dot", component: Dot, usedFor: "Releases" },
    { name: "Honeycomb", component: Honeycomb, usedFor: "Collections" },
    { name: "Star", component: Star, usedFor: "Contests" },
    { name: "Merch", component: Merch, usedFor: "Merch" },
    { name: "Cube", component: Cube, usedFor: "Products" },
    { name: "Play", component: Play, usedFor: "Live" },
    { name: "Blockchain", component: Blockchain, usedFor: "Nexus" },
    { name: "AtSign", component: AtSign, usedFor: "Contact" },
    { name: "Question", component: Question, usedFor: "Info" },
    { name: "Gear", component: Gear, usedFor: "Admin" },
  ];

  const animations = [
    { id: "fadeInDown", name: "Current (Drop Down)" },
    { id: "blurFadeIn", name: "Blur Fade In" },
    { id: "noiseToClean", name: "Noise to Clean" },
    { id: "glitchEffect", name: "Glitch Effect" },
    { id: "scaleBlur", name: "Scale + Blur" },
    { id: "liquidMorph", name: "Liquid Morph" },
  ];

  // Layout presets for ForceNav
  const layoutPresets = {
    current: {
      name: "Current Layout",
      description: "Custom layout optimized for visual balance (Production)",
      desktop: getDesktopPositionsWithLabels(),
    },
    diagonal: {
      name: "Diagonal Split",
      description:
        "Artists top-left, Releases bottom-right with icons flowing between",
      desktop: [
        { x: 50, y: 18, label: "Home" },
        { x: 28, y: 32, label: "Artists" },
        { x: 72, y: 68, label: "Releases" },
        { x: 72, y: 32, label: "Collections" },
        { x: 28, y: 68, label: "Contests" },
        { x: 85, y: 50, label: "Merch" },
        { x: 15, y: 50, label: "Products" },
        { x: 42, y: 45, label: "Live" },
        { x: 58, y: 55, label: "Nexus" },
        { x: 50, y: 82, label: "Contact" },
        { x: 18, y: 25, label: "Info" },
        { x: 82, y: 25, label: "Admin" },
      ],
    },
    wings: {
      name: "Wings",
      description:
        "Artists and Releases as focal points on opposite sides, like wings spreading",
      desktop: [
        { x: 50, y: 22, label: "Home" },
        { x: 25, y: 42, label: "Artists" },
        { x: 75, y: 42, label: "Releases" },
        { x: 15, y: 28, label: "Collections" },
        { x: 85, y: 28, label: "Contests" },
        { x: 35, y: 62, label: "Merch" },
        { x: 65, y: 62, label: "Products" },
        { x: 18, y: 58, label: "Live" },
        { x: 82, y: 58, label: "Nexus" },
        { x: 50, y: 75, label: "Contact" },
        { x: 35, y: 78, label: "Info" },
        { x: 65, y: 78, label: "Admin" },
      ],
    },
    scattered: {
      name: "Scattered Galaxy",
      description:
        "Deliberately asymmetric, organic feel with no clear pattern",
      desktop: [
        { x: 62, y: 18, label: "Home" },
        { x: 22, y: 38, label: "Artists" },
        { x: 78, y: 62, label: "Releases" },
        { x: 45, y: 28, label: "Collections" },
        { x: 82, y: 35, label: "Contests" },
        { x: 55, y: 52, label: "Merch" },
        { x: 18, y: 65, label: "Products" },
        { x: 38, y: 72, label: "Live" },
        { x: 72, y: 22, label: "Nexus" },
        { x: 28, y: 22, label: "Contact" },
        { x: 65, y: 78, label: "Info" },
        { x: 42, y: 48, label: "Admin" },
      ],
    },
    diamond: {
      name: "Diamond",
      description:
        "Home at top, Artists and Releases on sides, forming a diamond shape",
      desktop: [
        { x: 50, y: 15, label: "Home" },
        { x: 25, y: 40, label: "Artists" },
        { x: 75, y: 40, label: "Releases" },
        { x: 50, y: 50, label: "Collections" },
        { x: 15, y: 55, label: "Contests" },
        { x: 85, y: 55, label: "Merch" },
        { x: 35, y: 65, label: "Products" },
        { x: 65, y: 65, label: "Live" },
        { x: 25, y: 75, label: "Nexus" },
        { x: 75, y: 75, label: "Contact" },
        { x: 50, y: 82, label: "Info" },
        { x: 50, y: 32, label: "Admin" },
      ],
    },
    spiral: {
      name: "Spiral Out",
      description:
        "Icons spiral outward from center, Artists inner, Releases outer",
      desktop: [
        { x: 50, y: 45, label: "Home" },
        { x: 42, y: 35, label: "Artists" },
        { x: 72, y: 58, label: "Releases" },
        { x: 58, y: 28, label: "Collections" },
        { x: 32, y: 52, label: "Contests" },
        { x: 68, y: 38, label: "Merch" },
        { x: 28, y: 35, label: "Products" },
        { x: 78, y: 48, label: "Live" },
        { x: 22, y: 62, label: "Nexus" },
        { x: 62, y: 72, label: "Contact" },
        { x: 38, y: 75, label: "Info" },
        { x: 82, y: 28, label: "Admin" },
      ],
    },
    columns: {
      name: "Three Columns",
      description:
        "Artists left column, Releases right column, utilities in center",
      desktop: [
        { x: 50, y: 20, label: "Home" },
        { x: 22, y: 35, label: "Artists" },
        { x: 78, y: 35, label: "Releases" },
        { x: 22, y: 55, label: "Collections" },
        { x: 78, y: 55, label: "Contests" },
        { x: 50, y: 40, label: "Merch" },
        { x: 50, y: 60, label: "Products" },
        { x: 22, y: 75, label: "Live" },
        { x: 78, y: 75, label: "Nexus" },
        { x: 50, y: 80, label: "Contact" },
        { x: 35, y: 50, label: "Info" },
        { x: 65, y: 50, label: "Admin" },
      ],
    },
  };

  return (
    <div className="experiments-page">
      <h1 className="header-sub-page">Experiments</h1>

      <div className="experiments-controls">
        <h3>Select Animation Style:</h3>
        <div className="animation-buttons">
          {animations.map((anim) => (
            <button
              key={anim.id}
              className={`anim-button ${
                selectedAnimation === anim.id ? "active" : ""
              }`}
              onClick={() => setSelectedAnimation(anim.id)}
            >
              {anim.name}
            </button>
          ))}
        </div>
      </div>

      <div className="experiments-demo-area">
        <h2 className="demo-label">Live Demo:</h2>
        <div className="demo-container">
          <h1
            key={selectedAnimation}
            className={`demo-header header-${selectedAnimation}`}
          >
            WHY? Record Company
          </h1>
          <p className="demo-description">
            This is how the header will appear with the selected animation
          </p>
        </div>
      </div>

      <div className="experiments-info">
        <h3>Animation Details:</h3>
        <div className="animation-info">
          {selectedAnimation === "fadeInDown" && (
            <div>
              <h4>Current Animation</h4>
              <p>
                Simple drop-down with fade. Clean and straightforward, but lacks
                visual interest.
              </p>
              <p>
                <strong>Performance:</strong> Excellent
              </p>
            </div>
          )}
          {selectedAnimation === "blurFadeIn" && (
            <div>
              <h4>Blur Fade In</h4>
              <p>
                Starts heavily blurred and gradually comes into focus while
                fading in. Matches glassmorphism aesthetic.
              </p>
              <p>
                <strong>Performance:</strong> Excellent (pure CSS)
              </p>
            </div>
          )}
          {selectedAnimation === "noiseToClean" && (
            <div>
              <h4>Noise to Clean</h4>
              <p>
                Begins pixelated/grainy and sharpens into clear text. Creates a
                digital, glitchy aesthetic.
              </p>
              <p>
                <strong>Performance:</strong> Good (uses filter effects)
              </p>
            </div>
          )}
          {selectedAnimation === "glitchEffect" && (
            <div>
              <h4>Glitch Effect</h4>
              <p>
                Brief RGB color split and horizontal shift before settling.
                Edgy, modern, attention-grabbing.
              </p>
              <p>
                <strong>Performance:</strong> Good
              </p>
            </div>
          )}
          {selectedAnimation === "scaleBlur" && (
            <div>
              <h4>Scale + Blur Combo</h4>
              <p>
                Zooms in from smaller size while reducing blur. Dramatic and
                elegant entrance.
              </p>
              <p>
                <strong>Performance:</strong> Excellent
              </p>
            </div>
          )}
          {selectedAnimation === "liquidMorph" && (
            <div>
              <h4>Liquid Morph</h4>
              <p>
                Organic, fluid shape transition. Most experimental and unique
                option.
              </p>
              <p>
                <strong>Performance:</strong> Moderate (more complex)
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="experiments-notes">
        <h3>Notes:</h3>
        <ul>
          <li>Click the buttons above to see each animation style in action</li>
          <li>Each animation automatically replays when you switch</li>
          <li>
            Consider performance on mobile devices when choosing complex
            animations
          </li>
          <li>
            Blur and glitch effects work best with glassmorphism design theme
          </li>
        </ul>
      </div>

      {/* Layout Preset Browser */}
      <div className="experiments-forcenav-layouts">
        <h2>ForceNav Layout Presets</h2>
        <p className="layout-preview-desc">
          Browse preset layouts to use as a starting point, then customize in
          the editor below.
        </p>

        <div className="layout-buttons">
          {Object.entries(layoutPresets).map(([key, preset]) => (
            <button
              key={key}
              className={`layout-button ${selectedLayout === key ? "active" : ""}`}
              onClick={() => {
                setSelectedLayout(key);
                // Load preset into editor
                setCustomDesktopPositions(
                  preset.desktop.map((p) => ({ ...p }))
                );
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="layout-preview-area preset-preview">
          <div className="layout-info">
            <h3>{layoutPresets[selectedLayout].name}</h3>
            <p>{layoutPresets[selectedLayout].description}</p>
          </div>

          <div className="layout-visualization preset-viz">
            {layoutPresets[selectedLayout].desktop.map((pos, idx) => {
              const IconComponent = iconComponents[pos.label];
              const size = getIconSize(pos.label);
              const tier = SIZE_TIERS[pos.label] || "regular";

              return (
                <div
                  key={`preset-${selectedLayout}-${idx}`}
                  className={`layout-node tier-${tier}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  <div className="layout-node-icon">
                    {IconComponent && (
                      <IconComponent
                        width={`${size}px`}
                        height={`${size}px`}
                        fillColor="currentColor"
                      />
                    )}
                  </div>
                  <span className="layout-node-label">{pos.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Layout Editor */}
      <div className="experiments-layout-editor">
        <h2>Layout Editor</h2>
        <p className="editor-desc">
          Fine-tune icon positions and sizes. Changes are reflected in
          real-time. Copy the JSON when you're done to use in ForceNav.js.
        </p>

        {/* Desktop / Mobile Toggle */}
        <div className="editor-mode-toggle">
          <button
            className={editorMode === "desktop" ? "active" : ""}
            onClick={() => setEditorMode("desktop")}
          >
            Desktop
          </button>
          <button
            className={editorMode === "mobile" ? "active" : ""}
            onClick={() => setEditorMode("mobile")}
          >
            Mobile
          </button>
          <button className="reset-btn" onClick={resetToCurrentPreset}>
            Reset to Current
          </button>
        </div>

        <div className="editor-layout">
          {/* Controls Panel */}
          <div className="editor-controls">
            {/* Icon Selector */}
            <div className="control-section">
              <h4>Select Icon to Edit</h4>
              <select
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="icon-selector"
              >
                {iconList.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon} ({SIZE_TIERS[icon]})
                  </option>
                ))}
              </select>
            </div>

            {/* Position Controls */}
            <div className="control-section">
              <h4>Position: {selectedIcon}</h4>
              <div className="position-controls">
                <div className="slider-row">
                  <label>
                    X:{" "}
                    {currentPositions.find((p) => p.label === selectedIcon)
                      ?.x || 50}
                    %
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={
                      currentPositions.find((p) => p.label === selectedIcon)
                        ?.x || 50
                    }
                    onChange={(e) => updateIconPosition("x", e)}
                  />
                </div>
                <div className="slider-row">
                  <label>
                    Y:{" "}
                    {currentPositions.find((p) => p.label === selectedIcon)
                      ?.y || 50}
                    %
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={
                      currentPositions.find((p) => p.label === selectedIcon)
                        ?.y || 50
                    }
                    onChange={(e) => updateIconPosition("y", e)}
                  />
                </div>
              </div>
            </div>

            {/* Size Controls */}
            <div className="control-section">
              <h4>Icon Sizes (px)</h4>
              <div className="size-controls">
                <div className="slider-row">
                  <label>Large: {customSizes.large}px</label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={customSizes.large}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomSizes((prev) => ({ ...prev, large: val }));
                    }}
                  />
                </div>
                <div className="slider-row">
                  <label>Medium: {customSizes.medium}px</label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={customSizes.medium}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomSizes((prev) => ({ ...prev, medium: val }));
                    }}
                  />
                </div>
                <div className="slider-row">
                  <label>Regular: {customSizes.regular}px</label>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={customSizes.regular}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomSizes((prev) => ({ ...prev, regular: val }));
                    }}
                  />
                </div>
                <div className="slider-row">
                  <label>Small: {customSizes.small}px</label>
                  <input
                    type="range"
                    min="16"
                    max="60"
                    value={customSizes.small}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomSizes((prev) => ({ ...prev, small: val }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Position Buttons */}
            <div className="control-section">
              <h4>All Icons Quick Edit</h4>
              <div className="quick-edit-grid">
                {iconList.map((icon) => {
                  const pos = currentPositions.find(
                    (p) => p.label === icon
                  ) || { x: 50, y: 50 };
                  const isSelected = selectedIcon === icon;
                  return (
                    <button
                      key={icon}
                      className={`quick-icon-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedIcon(icon)}
                      title={`${icon}: (${pos.x}, ${pos.y})`}
                    >
                      {icon.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`editor-preview ${editorMode}`}>
            <div className="preview-label">
              {editorMode === "desktop"
                ? "Desktop Preview"
                : "Mobile Preview (375x667)"}
            </div>
            <div className="layout-visualization">
              {(editorMode === "desktop"
                ? customDesktopPositions
                : customMobilePositions
              ).map((pos) => {
                const IconComponent = iconComponents[pos.label];
                const size = getIconSize(pos.label);
                const tier = SIZE_TIERS[pos.label] || "regular";
                const isSelected = selectedIcon === pos.label;

                return (
                  <div
                    key={`editor-${editorMode}-${pos.label}`}
                    className={`layout-node tier-${tier} ${isSelected ? "editing" : ""}`}
                    style={{
                      position: "absolute",
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setSelectedIcon(pos.label)}
                  >
                    <div className="layout-node-icon">
                      {IconComponent && (
                        <IconComponent
                          width={`${size}px`}
                          height={`${size}px`}
                          fillColor="currentColor"
                        />
                      )}
                    </div>
                    <span className="layout-node-label">{pos.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="editor-export">
          <h4>Export Configuration</h4>
          <p>Copy this JSON and provide it to Claude to update ForceNav.js</p>
          <div className="export-actions">
            <button
              className={`copy-btn ${copySuccess ? "success" : ""}`}
              onClick={copyToClipboard}
            >
              {copySuccess ? "Copied!" : "Copy JSON to Clipboard"}
            </button>
          </div>
          <pre className="export-json">
            {JSON.stringify(generateExportJSON(), null, 2)}
          </pre>
        </div>

        {/* Documentation */}
        <div className="editor-docs">
          <h4>How to Use This Editor</h4>
          <ol>
            <li>
              <strong>Choose a preset</strong> above as your starting point, or
              start fresh
            </li>
            <li>
              <strong>Switch between Desktop/Mobile</strong> tabs to configure
              each layout
            </li>
            <li>
              <strong>Select an icon</strong> from the dropdown or click it in
              the preview
            </li>
            <li>
              <strong>Adjust X/Y sliders</strong> to position the selected icon
              (5-95%)
            </li>
            <li>
              <strong>Adjust size sliders</strong> to change icon sizes for each
              tier
            </li>
            <li>
              <strong>Copy the JSON</strong> when finished
            </li>
            <li>
              <strong>Share with Claude</strong> with the prompt: "Update
              ForceNav.js with this layout configuration: [paste JSON]"
            </li>
          </ol>

          <h4>Size Tiers</h4>
          <ul>
            <li>
              <strong>Large:</strong> Artists, Releases (primary navigation)
            </li>
            <li>
              <strong>Medium:</strong>Collections, Contests, Products, Merch
            </li>
            <li>
              <strong>Regular:</strong>Home, Live, Nexus
            </li>
            <li>
              <strong>Small:</strong> Contact, Info, Admin
            </li>
          </ul>

          <h4>Tips</h4>
          <ul>
            <li>Keep important icons (Artists, Releases) well separated</li>
            <li>
              Leave ~10% margin from edges for the force simulation variance
            </li>
            <li>Mobile layout should be more vertically oriented</li>
            <li>Test at different screen sizes after applying changes</li>
          </ul>
        </div>
      </div>

      <div className="experiments-icons">
        <h2>Icon Preview</h2>
        <p className="icon-preview-desc">
          All navigation icons used in ForceNav
        </p>

        <div className="icon-size-control">
          <label>Icon Size: {iconSize}px</label>
          <input
            type="range"
            min="24"
            max="120"
            value={iconSize}
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
        </div>

        <div className="icon-grid">
          {icons.map(({ name, component: IconComponent, usedFor }) => (
            <div key={name} className="icon-preview-item">
              <div className="icon-preview-box">
                <IconComponent
                  height={`${iconSize}px`}
                  width={`${iconSize}px`}
                  fillColor="currentColor"
                />
              </div>
              <span className="icon-name">{name}</span>
              <span className="icon-used-for">{usedFor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
