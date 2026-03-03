"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { desktopGroupSequence, mobileGroupSequence, projects, thumbnailGroups } from "./home-data";

type ActiveProject = { group: number; index: number } | null;

type LoopMetrics = {
  sectionCount: number;
  thumbnailsHeight: number;
  sectionHeight: number;
  centerGroup: number;
  loopMinScroll: number;
  loopMaxScroll: number;
};

const DESKTOP_BREAKPOINT = 1000;
const SMALL_MOBILE_BREAKPOINT = 740;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HomeClient() {
  const homeRef = useRef<HTMLElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const thumbnailsInnerRef = useRef<HTMLDivElement>(null);
  const desktopIndexInnerRef = useRef<HTMLDivElement>(null);
  const mobileIndexInnerRef = useRef<HTMLDivElement>(null);
  const topMaskRef = useRef<HTMLDivElement>(null);
  const bottomMaskRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<ActiveProject>(null);
  const activeProjectRef = useRef<ActiveProject>(null);

  const metricsRef = useRef<LoopMetrics>({
    sectionCount: thumbnailGroups.length,
    thumbnailsHeight: 0,
    sectionHeight: 0,
    centerGroup: Math.floor(thumbnailGroups.length / 2),
    loopMinScroll: 0,
    loopMaxScroll: 0,
  });

  const oldScrollRef = useRef(0);
  const snapTimeoutRef = useRef<number | undefined>(undefined);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mobileUserScrolledRef = useRef(true);

  const desktopProjects = useMemo(() => [...projects].reverse(), []);

  const clearSnapTimeout = useCallback(() => {
    if (snapTimeoutRef.current !== undefined) {
      window.clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = undefined;
    }
  }, []);

  const cancelScrollAnimation = useCallback(() => {
    if (animationFrameRef.current !== undefined) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  const setActive = useCallback((next: ActiveProject) => {
    activeProjectRef.current = next;
    setActiveProject(next);
  }, []);

  const updateResponsiveStyles = useCallback(() => {
    const topMask = topMaskRef.current;
    const bottomMask = bottomMaskRef.current;
    const thumbnails = thumbnailsRef.current;

    if (!topMask || !bottomMask || !thumbnails) {
      return;
    }

    const clearStyles = () => {
      topMask.removeAttribute("style");
      bottomMask.removeAttribute("style");
      thumbnails.removeAttribute("style");
    };

    const height = window.innerHeight;
    const width = window.innerWidth;

    if (width <= SMALL_MOBILE_BREAKPOINT) {
      topMask.style.height = `${height * 0.25 - 22}px`;
      bottomMask.style.height = `${height * 0.25 - 30}px`;
      bottomMask.style.top = `${height * 0.25 + 30}px`;
      thumbnails.style.height = `${height}px`;
      return;
    }

    if (width <= DESKTOP_BREAKPOINT) {
      topMask.style.height = `${height * 0.25 - 26}px`;
      bottomMask.style.height = `${height * 0.25 - 35}px`;
      bottomMask.style.top = `${height * 0.25 + 35}px`;
      thumbnails.style.height = `${height}px`;
      return;
    }

    clearStyles();
  }, []);

  const refreshMetrics = useCallback(() => {
    const thumbnailsInner = thumbnailsInnerRef.current;
    if (!thumbnailsInner) {
      return;
    }

    const sectionCount = thumbnailGroups.length;
    const thumbnailsHeight = thumbnailsInner.scrollHeight;
    const sectionHeight = thumbnailsHeight / sectionCount;
    const centerGroup = Math.floor(sectionCount / 2);

    metricsRef.current = {
      sectionCount,
      thumbnailsHeight,
      sectionHeight,
      centerGroup,
      loopMinScroll: sectionHeight,
      loopMaxScroll: sectionHeight * (sectionCount - 1),
    };
  }, []);

  const updateIndexTransform = useCallback((scroll: number) => {
    const { thumbnailsHeight } = metricsRef.current;
    if (!thumbnailsHeight) {
      return;
    }

    if (window.innerWidth <= DESKTOP_BREAKPOINT) {
      const mobileInner = mobileIndexInnerRef.current;
      if (!mobileInner) {
        return;
      }

      const percent = (0.5 * (scroll + window.innerHeight * 0.5)) / thumbnailsHeight;
      let position = Math.trunc(percent * mobileInner.scrollHeight);
      position -= Math.trunc(window.innerHeight * 0.25) - 23;
      mobileInner.style.transform = `translate3d(0px, -${position}px, 0px)`;
      return;
    }

    const desktopInner = desktopIndexInnerRef.current;
    if (!desktopInner) {
      return;
    }

    const percent = 0.5 - (0.5 * (scroll + window.innerHeight / 2)) / thumbnailsHeight;
    const position = Math.trunc(percent * desktopInner.scrollHeight);
    desktopInner.style.transform = `translate3d(0px, -${position}px, 0px)`;
  }, []);

  const updateScroll = useCallback(() => {
    const thumbnails = thumbnailsRef.current;
    if (!thumbnails) {
      return;
    }

    document.body.classList.add("scrolling");

    let scroll = thumbnails.scrollTop;
    const { sectionHeight, centerGroup, loopMinScroll, loopMaxScroll } = metricsRef.current;

    if (scroll < oldScrollRef.current) {
      if (scroll <= loopMinScroll) {
        scroll = sectionHeight * centerGroup + (oldScrollRef.current - scroll);
        thumbnails.scrollTop = scroll;
      }
    } else if (scroll >= loopMaxScroll) {
      scroll = sectionHeight * centerGroup + (oldScrollRef.current - scroll);
      thumbnails.scrollTop = scroll;
    }

    oldScrollRef.current = scroll;
    updateIndexTransform(scroll);

    if (activeProjectRef.current !== null) {
      setActive(null);
    }
  }, [setActive, updateIndexTransform]);

  const animateScrollTo = useCallback(
    (target: number, duration: number, onComplete?: () => void) => {
      const thumbnails = thumbnailsRef.current;
      if (!thumbnails) {
        return;
      }

      cancelScrollAnimation();

      if (duration <= 0) {
        thumbnails.scrollTop = target;
        updateScroll();
        onComplete?.();
        return;
      }

      const start = performance.now();
      const from = thumbnails.scrollTop;
      const delta = target - from;

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = easeOutCubic(progress);
        thumbnails.scrollTop = from + delta * eased;
        updateScroll();

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(tick);
          return;
        }

        animationFrameRef.current = undefined;
        onComplete?.();
      };

      animationFrameRef.current = window.requestAnimationFrame(tick);
    },
    [cancelScrollAnimation, updateScroll]
  );

  const findClosestThumbnail = useCallback(() => {
    const thumbnails = thumbnailsRef.current;
    if (!thumbnails) {
      return null;
    }

    const items = Array.from(thumbnails.querySelectorAll<HTMLElement>(".projectThumbnail"));
    if (!items.length) {
      return null;
    }

    const scroll = thumbnails.scrollTop;
    const isMobile = window.innerWidth <= DESKTOP_BREAKPOINT;
    const reference = isMobile ? scroll + window.innerHeight * 0.5 : scroll + window.innerHeight / 2;

    let closest = items[0];
    let minDistance = Number.POSITIVE_INFINITY;

    for (const item of items) {
      const position = isMobile ? item.offsetTop : item.offsetTop + item.offsetHeight / 2;
      const distance = Math.abs(reference - position);
      if (distance < minDistance) {
        minDistance = distance;
        closest = item;
      }
    }

    return closest;
  }, []);

  const snapToClosestThumbnail = useCallback(() => {
    clearSnapTimeout();

    snapTimeoutRef.current = window.setTimeout(() => {
      const closest = findClosestThumbnail();
      if (!closest) {
        return;
      }

      const isMobile = window.innerWidth <= DESKTOP_BREAKPOINT;
      const target = isMobile
        ? closest.offsetTop - window.innerHeight * 0.5
        : closest.offsetTop + closest.offsetHeight / 2 - window.innerHeight / 2;

      animateScrollTo(target, 600, () => {
        const group = Number(closest.dataset.group ?? 0);
        const index = Number(closest.dataset.index ?? 0);

        setActive({ group, index });
        sessionStorage.setItem("lastProjectClicked", String(index));
        document.body.classList.remove("scrolling");
      });
    }, 200);
  }, [animateScrollTo, clearSnapTimeout, findClosestThumbnail, setActive]);

  const sliderPosition = useCallback(
    (rawIndex: number, transitionTime = 0) => {
      const thumbnails = thumbnailsRef.current;
      if (!thumbnails) {
        return;
      }

      const index = Number.isFinite(rawIndex) && rawIndex >= 0 ? Math.trunc(rawIndex) : 0;
      const { centerGroup } = metricsRef.current;

      let thumbnail = thumbnails.querySelector<HTMLElement>(`#projectThumbnail_${centerGroup}_${index}`);
      if (!thumbnail) {
        thumbnail = thumbnails.querySelector<HTMLElement>(`#projectThumbnail_${centerGroup}_0`);
      }
      if (!thumbnail) {
        return;
      }

      let target = thumbnail.offsetTop - (window.innerHeight - thumbnail.offsetHeight) / 2;
      if (window.innerWidth <= DESKTOP_BREAKPOINT) {
        target = thumbnail.offsetTop - window.innerHeight * 0.5;
      }

      oldScrollRef.current = target;

      if (transitionTime === 0) {
        thumbnails.scrollTop = target;
        updateScroll();
        return;
      }

      animateScrollTo(target, transitionTime, () => {
        snapToClosestThumbnail();
      });
    },
    [animateScrollTo, snapToClosestThumbnail, updateScroll]
  );

  const handleSelectProject = useCallback(
    (index: number) => {
      sessionStorage.setItem("lastProjectClicked", String(index));
      sliderPosition(index, 800);
    },
    [sliderPosition]
  );

  useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    const home = homeRef.current;

    if (!thumbnails || !home) {
      return;
    }

    const initialize = () => {
      const initialIndex = Number(sessionStorage.getItem("lastProjectClicked") ?? 0);

      updateResponsiveStyles();
      refreshMetrics();
      sliderPosition(initialIndex, 0);
      updateScroll();
      snapToClosestThumbnail();
    };

    const initTimeout = window.setTimeout(initialize, 0);

    const onResize = () => {
      updateResponsiveStyles();
      refreshMetrics();

      const savedIndex = Number(sessionStorage.getItem("lastProjectClicked") ?? 0);
      sliderPosition(savedIndex, 0);
      updateScroll();
    };

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth <= DESKTOP_BREAKPOINT) {
        return;
      }

      event.preventDefault();
      cancelScrollAnimation();
      thumbnails.scrollTop += event.deltaY;
      updateScroll();
      snapToClosestThumbnail();
    };

    const onMobileScroll = () => {
      if (window.innerWidth > DESKTOP_BREAKPOINT) {
        return;
      }

      mobileUserScrolledRef.current = true;
      updateScroll();

      clearSnapTimeout();
      snapTimeoutRef.current = window.setTimeout(() => {
        if (mobileUserScrolledRef.current) {
          cancelScrollAnimation();
          snapToClosestThumbnail();
          mobileUserScrolledRef.current = false;
        }
      }, 250);
    };

    const onTouchMove = () => {
      mobileUserScrolledRef.current = true;
      cancelScrollAnimation();
    };

    window.addEventListener("resize", onResize);
    home.addEventListener("wheel", onWheel, { passive: false });
    thumbnails.addEventListener("scroll", onMobileScroll);
    thumbnails.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      home.removeEventListener("wheel", onWheel);
      thumbnails.removeEventListener("scroll", onMobileScroll);
      thumbnails.removeEventListener("touchmove", onTouchMove);

      window.clearTimeout(initTimeout);
      clearSnapTimeout();
      cancelScrollAnimation();
      document.body.classList.remove("scrolling");
    };
  }, [
    cancelScrollAnimation,
    clearSnapTimeout,
    refreshMetrics,
    sliderPosition,
    snapToClosestThumbnail,
    updateResponsiveStyles,
    updateScroll,
  ]);

  return (
    <main>
      <header className="slowTransition">
        <h1 className="logo uppercase smallFontSize noselect">
          <span className="desktop">
            <a href="#">Louis Browne</a>
          </span>
          <span className="mobile">
            <a href="#">LB</a>
          </span>
        </h1>

        <span className="info uppercase smallFontSize noselect">
          <a href="#">Information</a>
        </span>

        <span className="archive uppercase smallFontSize noselect">
          <a href="#" className="motion">
            Motion
          </a>{" "}
          /{" "}
          <a href="#" className="print">
            Stills
          </a>
        </span>
      </header>

      <section id="home" className="section show slowTransition" ref={homeRef}>
        <div className="homeBackground" />
        <div className="topMask slowTransition" ref={topMaskRef} />

        <div className="index noscrollbar slowTransition desktop">
          <div className="inner" ref={desktopIndexInnerRef}>
            {desktopGroupSequence.map((group, sequenceIndex) =>
              desktopProjects.map((project, reverseIndex) => {
                const index = projects.length - 1 - reverseIndex;
                const isActive = activeProject?.group === group && activeProject?.index === index;

                return (
                  <div
                    className={`projectTitle noselect${isActive ? " hovering" : ""}`}
                    data-group={group}
                    data-index={index}
                    data-id={project.id}
                    key={`desktop-${sequenceIndex}-${group}-${project.id}-${index}`}
                    onClick={() => handleSelectProject(index)}
                  >
                    <h2 className="bigFontSize">{project.title}</h2>
                    <div className="legend">
                      <span className="smallFontSize uppercase slowTransition">{project.location}</span>
                      <span className="smallFontSize uppercase slowTransition">{project.year}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="index noscrollbar slowTransition mobile" style={{ display: "none" }}>
          <div className="inner" ref={mobileIndexInnerRef}>
            {mobileGroupSequence.map((group, sequenceIndex) =>
              projects.map((project, index) => {
                const isActive = activeProject?.group === group && activeProject?.index === index;

                return (
                  <div
                    className={`projectTitle noselect${isActive ? " hovering" : ""}`}
                    data-group={group}
                    data-index={index}
                    data-id={project.id}
                    key={`mobile-${sequenceIndex}-${group}-${project.id}-${index}`}
                    onClick={() => handleSelectProject(index)}
                  >
                    <h2 className="bigFontSize">{project.title}</h2>
                    <div className="legend">
                      <span className="smallFontSize uppercase slowTransition">{project.location}</span>
                      <span className="smallFontSize uppercase slowTransition">{project.year}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bottomMask slowTransition" ref={bottomMaskRef} />

        <div id="thumbnails" className="thumbnails noscrollbar slowTransition" ref={thumbnailsRef}>
          <div className="inner" ref={thumbnailsInnerRef}>
            {thumbnailGroups.map((group) =>
              projects.map((project, index) => (
                <figure
                  id={`projectThumbnail_${group}_${index}`}
                  className={`projectThumbnail${project.video ? " video" : ""}`}
                  data-group={group}
                  data-index={index}
                  data-id={project.id}
                  key={`thumb-${group}-${project.id}-${index}`}
                  onClick={() => handleSelectProject(index)}
                  onMouseEnter={(event) => {
                    const video = event.currentTarget.querySelector("video");
                    if (video) {
                      void video.play().catch(() => {});
                    }
                  }}
                  onMouseLeave={(event) => {
                    const video = event.currentTarget.querySelector("video");
                    if (video) {
                      video.pause();
                    }
                  }}
                >
                  <picture className="show">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </picture>
                  {project.video ? (
                    <video className="video" muted loop playsInline preload="auto">
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : null}
                </figure>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
