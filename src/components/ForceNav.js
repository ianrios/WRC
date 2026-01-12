import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as d3 from "d3";
import { chooseIcon } from "./Link";
import { isAdminAuthenticated } from "../utils/featureFlags";
import "./ForceNav.scss";

// Display names (Information -> Info)
const DISPLAY_NAMES = {
  Information: "Info",
};

// Icon size tiers - Updated configuration
const SIZE_TIERS = {
  Artists: "large",
  Releases: "large",
  Home: "regular",
  Products: "medium",
  Merch: "medium",
  Collections: "medium",
  Contests: "medium",
  Live: "regular",
  Nexus: "regular",
  Contact: "small",
  Information: "small",
  Admin: "small",
};

// Desktop positions - Custom layout optimized for visual balance
const EXPANDED_POSITIONS_DESKTOP = [
  { x: 41, y: 38 },   // Home - upper center-left
  { x: 25, y: 29 },   // Artists (large) - upper left
  { x: 73, y: 70 },   // Releases (large) - lower right
  { x: 77, y: 39 },   // Collections - upper right
  { x: 55, y: 52 },   // Contests - center
  { x: 33, y: 58 },   // Merch - center-left
  { x: 60, y: 29 },   // Products - upper center-right
  { x: 44, y: 18 },   // Live - top center
  { x: 16, y: 52 },   // Nexus - left center
  { x: 50, y: 72 },   // Contact (small) - lower center
  { x: 20, y: 69 },   // Information (small) - lower left
  { x: 87, y: 59 },   // Admin (small) - right
];

// Mobile positions - Optimized for vertical orientation
const EXPANDED_POSITIONS_MOBILE = [
  { x: 44, y: 35 },   // Home
  { x: 32, y: 20 },   // Artists (large)
  { x: 58, y: 69 },   // Releases (large)
  { x: 44, y: 49 },   // Collections
  { x: 78, y: 55 },   // Contests
  { x: 69, y: 40 },   // Merch
  { x: 28, y: 63 },   // Products
  { x: 24, y: 39 },   // Live
  { x: 58, y: 24 },   // Nexus
  { x: 81, y: 69 },   // Contact
  { x: 35, y: 74 },   // Information
  { x: 88, y: 93 },   // Admin
];

// Get current page's link key from pathname
function getCurrentPageKey(pathname, linkKeys) {
  const path = pathname.toLowerCase();

  // Check for exact matches first
  for (const key of linkKeys) {
    if (path === `/${key.toLowerCase()}`) {
      return key;
    }
  }

  // Check for nested routes (e.g., /artist/name -> Artists)
  if (path.startsWith('/artist')) return 'Artists';
  if (path.startsWith('/release')) return 'Releases';
  if (path.startsWith('/collection')) return 'Collections';
  if (path.startsWith('/contest')) return 'Contests';
  if (path.startsWith('/product')) return 'Products';

  return 'Home';
}

// Base navigation links (constant, outside component)
const BASE_LINKS = {
  Home: ["Home", true],
  Artists: ["Fingerprint", true],
  Releases: ["Dot", true],
  Collections: ["Honeycomb", true],
  Contests: ["Star", true],
  Merch: ["Merch", true],
  Products: ["Cube", true],
  Live: ["Live", true],
  Nexus: ["Blockchain", true],
  Contact: ["AtSign", true],
  Information: ["Question", true],
};

const ADMIN_LINKS = { ...BASE_LINKS, Admin: ["Gear", true] };

function ForceNav() {
  const location = useLocation();
  const history = useHistory();
  const animationRef = useRef(null);
  const simulationRef = useRef(null);
  const nodesRef = useRef([]);

  const isAdmin = isAdminAuthenticated();
  const Links = isAdmin ? ADMIN_LINKS : BASE_LINKS;
  const linkKeys = useMemo(() => Object.keys(Links), [Links]);

  const [open, setOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [blobHovered, setBlobHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [nodePositions, setNodePositions] = useState(
    linkKeys.map(() => ({ x: 50, y: 50 })) // Start all at center
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Current page for collapsed blob display
  const currentPageKey = useMemo(
    () => getCurrentPageKey(location.pathname, linkKeys),
    [location.pathname, linkKeys]
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("wrc-nav-visited");
    if (!hasVisited) {
      setShowPulse(true);
      localStorage.setItem("wrc-nav-visited", "true");
      setTimeout(() => setShowPulse(false), 5000);
    }
  }, []);

  // Ref to track if nav is open (for animation loop)
  const isOpenRef = useRef(false);

  // Generate collapsed positions using force simulation - tightly clustered like magnets
  const getCollapsedPositions = useCallback(() => {
    // Container is 72px (64px on mobile), with 8px padding = 56px usable space
    // Center of usable space is at 28px (accounting for padding offset)
    const containerSize = 56;
    const centerX = containerSize / 2;
    const centerY = containerSize / 2;

    // Create nodes for force simulation
    const nodes = linkKeys.map((key, i) => {
      const isCurrent = key === currentPageKey;

      // For non-current icons, randomly make 50% of them smaller (30% reduction)
      // Use deterministic random based on key name for consistency
      let iconSize = 12; // Default tiny icon size
      let radius = 6; // Half of 12px

      if (!isCurrent) {
        const seedValue = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const shouldBeSmaller = seedValue % 2 === 0; // 50% will be smaller

        if (shouldBeSmaller) {
          iconSize = 12 * 0.7; // 30% smaller = 8.4px
          radius = iconSize / 2; // 4.2px radius
          // radius = (iconSize / 2) * 0.6; // Collision radius is 60% of visual size to allow nestling
          // } else {
          //   radius = (iconSize / 2) * 0.7; // 70% of visual size
        }
      } else {
        iconSize = 24; // Primary icon size
        radius = 12;
        // radius = 12 * 0.7; // 70% of visual size for tighter packing
      }

      // Start in rough circle to help force simulation converge
      const angle = (i / linkKeys.length) * 2 * Math.PI;
      const startRadius = isCurrent ? 0 : 6;

      return {
        id: key,
        x: centerX + Math.cos(angle) * startRadius,
        y: centerY + Math.sin(angle) * startRadius,
        isCurrent,
        radius, // Collision radius for force simulation
        iconSize, // Store for rendering
        fx: isCurrent ? centerX : null, // Lock primary icon at center
        fy: isCurrent ? centerY : null,
      };
    });

    // Run force simulation synchronously to get final positions
    // Goal: Pack icons tightly around the center like magnets
    const simulation = d3.forceSimulation(nodes)
      .force("collide", d3.forceCollide()
        .radius(d => d.radius + 0.5) // Minimal spacing - almost touching
        .strength(1)
        .iterations(10)) // Many collision iterations for tight packing
      .force("x", d3.forceX(centerX).strength(0.5)) // Moderate pull to center
      .force("y", d3.forceY(centerY).strength(0.5))
      .force("charge", d3.forceManyBody()
        .strength(-15) // Moderate repulsion to prevent overlap
        .distanceMax(25)) // Repel when nearby
      .alphaMin(0.001) // Standard settling threshold
      .velocityDecay(0.6) // Good friction for stable settling
      .stop();

    // Run many ticks to ensure complete settling
    for (let i = 0; i < 500; i++) {
      simulation.tick();
    }

    // Convert to positions object
    const positions = {};
    nodes.forEach(node => {
      positions[node.id] = {
        x: node.x,
        y: node.y,
        isCurrent: node.isCurrent,
        iconSize: node.iconSize,
      };
    });

    return positions;
  }, [currentPageKey, linkKeys]);

  // Gentle jiggle animation - continuously jiggles around node positions
  const jiggleTimeRef = useRef(0);

  const startJiggleAnimation = useCallback(() => {
    const animate = () => {
      // Stop if nav is closed
      if (!isOpenRef.current) return;

      jiggleTimeRef.current += 0.015; // Slow jiggle
      const time = jiggleTimeRef.current;

      setNodePositions(prevPositions => {
        return prevPositions.map((pos, idx) => {
          const node = nodesRef.current[idx];
          if (!node) return pos;

          const phase = idx * 0.5;
          // Very subtle jiggle
          const jiggleX = Math.sin(time + phase) * 0.3;
          const jiggleY = Math.cos(time * 0.7 + phase) * 0.3;

          return {
            x: node.x + jiggleX,
            y: node.y + jiggleY,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Force simulation with magnetic snap effect
  useEffect(() => {
    // Update ref for animation loop
    isOpenRef.current = open;

    if (!open) {
      // Stop jiggle animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Animate back to collapsed positions using simulation
      const collapsedPos = getCollapsedPositions();

      // Update nodes with collapsed targets
      // Desktop: close button at 30px from top/left
      // Mobile: close button at 20px from bottom/right
      nodesRef.current = linkKeys.map((key) => {
        const pos = collapsedPos[key];
        // Convert collapsed px coords to screen percentage
        // Collapsed container is 56px (usable space)
        let xPercent, yPercent;

        if (isMobile) {
          // Mobile: bottom-right corner
          // Trigger is 64px wide, at bottom: 20px, right: 20px with 8px padding
          const triggerRight = 20;
          const triggerBottom = 20;
          const xPos = window.innerWidth - triggerRight - pos.x;
          const yPos = window.innerHeight - triggerBottom - pos.y;
          xPercent = (xPos / window.innerWidth) * 100;
          yPercent = (yPos / window.innerHeight) * 100;
        } else {
          // Desktop: top-left corner
          const triggerLeft = 30;
          const triggerTop = 30;
          xPercent = ((triggerLeft + pos.x) / window.innerWidth) * 100;
          yPercent = ((triggerTop + pos.y) / window.innerHeight) * 100;
        }

        const existingNode = nodesRef.current.find(n => n.id === key);
        return {
          id: key,
          x: existingNode?.x || xPercent,
          y: existingNode?.y || yPercent,
          targetX: xPercent,
          targetY: yPercent,
          vx: existingNode?.vx || 0,
          vy: existingNode?.vy || 0,
        };
      });

      // Create closing animation
      const closingSimulation = d3.forceSimulation(nodesRef.current)
        .force("targetX", d3.forceX().x(d => d.targetX).strength(0.2))
        .force("targetY", d3.forceY().y(d => d.targetY).strength(0.2))
        .alphaDecay(0.05) // Faster convergence for closing
        .velocityDecay(0.5)
        .on("tick", () => {
          setNodePositions(nodesRef.current.map(node => ({
            x: node.x,
            y: node.y,
          })));
        })
        .on("end", () => {
          // Cleanup after closing animation
          nodesRef.current = [];
        });

      simulationRef.current = closingSimulation;

      // Return cleanup for closed state
      return () => {
        if (simulationRef.current) {
          simulationRef.current.stop();
          simulationRef.current = null;
        }
      };
    }

    // Get target positions based on device
    const positions = isMobile ? EXPANDED_POSITIONS_MOBILE : EXPANDED_POSITIONS_DESKTOP;

    // Get collapsed positions for starting point
    const collapsedPos = getCollapsedPositions();

    // Initialize nodes - start from collapsed positions
    nodesRef.current = linkKeys.map((key, idx) => {
      const target = positions[idx] || { x: 50, y: 50 };
      // Small variance in final position (±2%)
      const variance = 2;
      const targetX = target.x + (Math.random() - 0.5) * variance;
      const targetY = target.y + (Math.random() - 0.5) * variance;

      // Start position: from collapsed state position (same as close button)
      const pos = collapsedPos[key];
      let startX, startY;

      if (isMobile) {
        // Mobile: bottom-right corner
        const triggerRight = 20;
        const triggerBottom = 20;
        const xPos = window.innerWidth - triggerRight - pos.x;
        const yPos = window.innerHeight - triggerBottom - pos.y;
        startX = (xPos / window.innerWidth) * 100;
        startY = (yPos / window.innerHeight) * 100;
      } else {
        // Desktop: top-left corner
        const triggerLeft = 30;
        const triggerTop = 30;
        startX = ((triggerLeft + pos.x) / window.innerWidth) * 100;
        startY = ((triggerTop + pos.y) / window.innerHeight) * 100;
      }

      return {
        id: key,
        x: startX,
        y: startY,
        targetX,
        targetY,
        vx: 0,
        vy: 0,
      };
    });

    setIsAnimating(true);
    let jiggleStarted = false;

    // Start jiggle animation immediately - it will blend with simulation
    startJiggleAnimation();

    // Create force simulation with gentler forces
    const simulation = d3.forceSimulation(nodesRef.current)
      .force("charge", d3.forceManyBody().strength(3).distanceMax(15)) // Very gentle repulsion, limited range
      .force("collide", d3.forceCollide().radius(4).strength(0.5)) // Soft collision
      .force("targetX", d3.forceX().x(d => d.targetX).strength(0.2)) // Stronger pull for faster settling
      .force("targetY", d3.forceY().y(d => d.targetY).strength(0.2))
      .alphaDecay(0.05) // Faster decay to settle quicker
      .velocityDecay(0.5) // More damping for stability
      .on("tick", () => {
        // Simulation updates node.x and node.y
        // Jiggle animation reads from node.x/node.y and adds small oscillations
        // This creates seamless blending - no jump!

        if (!jiggleStarted && simulation.alpha() < 0.3) {
          jiggleStarted = true;
          setIsAnimating(false);
        }
      })
      .on("end", () => {
        setIsAnimating(false);
      });

    simulationRef.current = simulation;

    // Return cleanup for open state
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [open, isMobile, linkKeys, startJiggleAnimation, getCollapsedPositions]);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
    setShowPulse(false);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const navigate = useCallback((to) => {
    if (location.pathname !== to) {
      history.push(to);
      close();
    }
  }, [location.pathname, history, close]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, close]);

  const getExpandedPosition = (idx) => {
    return nodePositions[idx] || { x: 50, y: 50 };
  };

  const getSizeTier = (item) => SIZE_TIERS[item] || "regular";
  const getDisplayName = (item) => DISPLAY_NAMES[item] || item;

  const collapsedPositions = getCollapsedPositions();

  return (
    <>
      {/* Collapsed trigger area */}
      <div
        className={`force-nav-trigger ${open ? "open" : ""} ${showPulse ? "pulse" : ""} ${blobHovered ? "blob-hovered" : ""}`}
        onClick={toggle}
        onMouseEnter={() => setBlobHovered(true)}
        onMouseLeave={() => setBlobHovered(false)}
        aria-label="Navigation Menu"
      >
        {!open && (
          <div className="force-nav-collapsed">
            {linkKeys.map((item) => {
              const pos = collapsedPositions[item] || { x: 0, y: 0, isCurrent: false, iconSize: 12 };
              const hoverOffset = blobHovered ? (pos.isCurrent ? 0 : 2) : 0;
              const centerX = 28;
              const centerY = 28;

              // Position icons centered on their coordinates (not top-left)
              const offsetX = pos.x - pos.iconSize / 2;
              const offsetY = pos.y - pos.iconSize / 2;
              const hoverAdjustX = blobHovered && !pos.isCurrent ? (pos.x < centerX ? -hoverOffset : hoverOffset) : 0;
              const hoverAdjustY = blobHovered && !pos.isCurrent ? (pos.y < centerY ? -hoverOffset : hoverOffset) : 0;

              return (
                <div
                  key={item}
                  className={`force-nav-icon collapsed ${pos.isCurrent ? "current-page" : "tiny"}`}
                  style={{
                    transform: `translate(${offsetX + hoverAdjustX}px, ${offsetY + hoverAdjustY}px)`,
                    width: `${pos.iconSize}px`,
                    height: `${pos.iconSize}px`,
                  }}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    {chooseIcon({
                      iconHover: true,
                      icon: item,
                      to: `/${item}`.toLowerCase(),
                      pathname: location.pathname,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded overlay */}
      <nav
        className={`force-nav-overlay ${open ? "force-nav-overlay-open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      >
        <div className="force-nav-container">
          {linkKeys.map((item, idx) => {
            const pos = getExpandedPosition(idx);
            const to = `/${item}`.toLowerCase();
            const isActive = location.pathname.toLowerCase() === to ||
              (item === currentPageKey && location.pathname !== '/');
            const isHovered = hoveredIcon === item;
            const sizeTier = getSizeTier(item);

            return (
              <div
                key={item}
                className={`force-nav-node size-${sizeTier} ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                onMouseEnter={() => setHoveredIcon(item)}
                onMouseLeave={() => setHoveredIcon(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(to);
                }}
              >
                <div className="force-nav-icon-wrapper">
                  {chooseIcon({
                    iconHover: true,
                    icon: item,
                    to: to,
                    pathname: location.pathname,
                  })}
                </div>
                <span className="force-nav-label">{getDisplayName(item)}</span>
              </div>
            );
          })}
        </div>

        {/* Close button - just X icon, no background */}

        <button
          className="force-nav-close"
          onClick={close}
          aria-label="Close navigation"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </nav>
    </>
  );
}

export default ForceNav;
