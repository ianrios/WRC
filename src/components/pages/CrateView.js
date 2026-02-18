import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import artistData from "../../constants/artistData.json";
import "./CrateView.scss";

const VISIBLE_BEHIND = 10;
const SCROLL_SENSITIVITY = 0.5;

export function CrateView({ releases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const accumulatedDelta = useRef(0);

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();

      accumulatedDelta.current += e.deltaY * SCROLL_SENSITIVITY;

      if (Math.abs(accumulatedDelta.current) >= 50) {
        // Scroll down = go deeper into crate (higher index = older releases)
        const direction = accumulatedDelta.current > 0 ? 1 : -1;
        setCurrentIndex((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(releases.length - 1, next));
        });
        accumulatedDelta.current = 0;
      }
    },
    [releases.length]
  );

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setCurrentIndex((prev) =>
            Math.min(releases.length - 1, prev + 1)
          );
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (activeIndex === null) {
            setActiveIndex(currentIndex);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex(null);
          break;
        case "Escape":
          e.preventDefault();
          setActiveIndex(null);
          break;
        default:
          break;
      }
    },
    [releases.length, currentIndex, activeIndex]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  useEffect(() => {
    document.body.classList.add("lock-scroll");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lock-scroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const getCardState = (index) => {
    if (activeIndex === index) return "active";
    if (hoveredIndex === index) return "hovered";
    if (index < currentIndex) return "passed";
    if (index === currentIndex) return "current";
    return "upcoming";
  };

  const getCardStyle = (index, state) => {
    const relativeIndex = index - currentIndex;

    // Active: pulled UP out of the crate
    if (state === "active") {
      return {
        transform: `translateY(-180px)`,
        zIndex: 1000,
        opacity: 1,
      };
    }

    // Hovered: slightly lifted up
    if (state === "hovered") {
      return {
        transform: `translateY(-40px)`,
        zIndex: 900,
        opacity: 1,
      };
    }

    // Passed: one outline to bottom-left (only show 1)
    if (state === "passed") {
      if (relativeIndex < -1) {
        return { display: "none" };
      }
      return {
        transform: `translate(-8px, 8px)`,
        zIndex: 50,
        opacity: 0.3,
      };
    }

    // Current: front of the stack
    if (state === "current") {
      return {
        transform: `translate(0, 0)`,
        zIndex: 500,
        opacity: 1,
      };
    }

    // Upcoming: stacked behind to top-right, fading
    const depth = Math.min(relativeIndex, VISIBLE_BEHIND);
    if (relativeIndex > VISIBLE_BEHIND) {
      return { display: "none" };
    }
    const offsetX = depth * 3;
    const offsetY = depth * -3;
    const opacity = Math.max(0.3, 1 - depth * 0.07);

    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      zIndex: 400 - depth,
      opacity,
    };
  };

  // Only render cards that are visible
  const getVisibleCards = () => {
    const cards = [];
    // One passed card (outline)
    if (currentIndex > 0) {
      cards.push({ release: releases[currentIndex - 1], index: currentIndex - 1 });
    }
    // Current and upcoming
    for (let i = currentIndex; i <= Math.min(currentIndex + VISIBLE_BEHIND, releases.length - 1); i++) {
      cards.push({ release: releases[i], index: i });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const activeRelease = activeIndex !== null ? releases[activeIndex] : null;
  const hoveredRelease = hoveredIndex !== null ? releases[hoveredIndex] : null;
  const displayRelease = activeRelease || hoveredRelease;

  const getPrimaryArtistNames = (release) => {
    if (!release?.primary_artist_ids) return "";
    return release.primary_artist_ids
      .map((id) => {
        const artist = artistData.find((a) => a.id === id);
        return artist?.name || "";
      })
      .filter(Boolean)
      .join(", ");
  };

  const getReleaseType = (release) => {
    if (!release) return "";
    const type = release.release_type;
    if (type === "WRC") return "Release";
    if (type === "SET") return "DJ Set";
    if (type === "REC") return "Recording";
    return type || "Release";
  };

  return (
    <div className="crate-view-container" ref={containerRef}>
      {/* Release Number Display */}
      <div className={`crate-release-number ${activeIndex !== null ? "active" : ""}`}>
        {displayRelease ? displayRelease.label_number : releases[currentIndex]?.label_number}
      </div>

      {/* Metadata Display (Active State) */}
      {activeRelease && (
        <div className="crate-metadata">
          <div className="crate-metadata-artist">
            {getPrimaryArtistNames(activeRelease)}
          </div>
          <div className="crate-metadata-name">{activeRelease.name}</div>
          <div className="crate-metadata-type">{getReleaseType(activeRelease)}</div>
        </div>
      )}

      {/* Crate Container */}
      <div className={`crate-stack ${activeIndex !== null ? "shifted" : ""}`}>
        {visibleCards.map(({ release, index }) => {
          const state = getCardState(index);
          const style = getCardStyle(index, state);

          if (style.display === "none") return null;

          return (
            <div
              key={release.local_path}
              className={`crate-card crate-card-${state}`}
              style={style}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={release.album_art}
                alt={release.name}
                draggable={false}
              />
              {(state === "hovered" || state === "active") && (
                <Link
                  to={`/release/${release.local_path}`}
                  className="crate-card-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
