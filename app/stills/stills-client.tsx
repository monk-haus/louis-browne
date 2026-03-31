"use client";

import { useRef } from "react";
import { stillsImages, type StillsImage } from "../home-data";
import { useMountEffect } from "../hooks/useMountEffect";

const MOBILE_BREAKPOINT = 1000;

export default function StillsClient() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayImgRef = useRef<HTMLImageElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const loadTimeoutRef = useRef<number | undefined>(undefined);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useMountEffect(() => {
    document.body.classList.add("archive-opened");
    return () => {
      document.body.classList.remove("archive-opened");
      window.clearTimeout(loadTimeoutRef.current);
      window.clearTimeout(closeTimeoutRef.current);
    };
  });

  const openExpanded = (image: StillsImage) => {
    const overlay = overlayRef.current;
    const img = overlayImgRef.current;
    const text = overlayTextRef.current;
    if (!overlay || !img || !text) return;

    window.clearTimeout(loadTimeoutRef.current);
    window.clearTimeout(closeTimeoutRef.current);

    img.src = "";
    text.textContent = "";
    overlay.classList.remove("loaded");
    overlay.classList.add("show");

    window.setTimeout(() => {
      const image2 = new Image();
      image2.onload = () => {
        loadTimeoutRef.current = window.setTimeout(() => {
          img.src = image.src;
          text.textContent = image.title;
          overlay.classList.add("loaded");
        }, 400);
      };
      image2.src = image.src;
    }, 20);
  };

  const closeExpanded = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    window.clearTimeout(loadTimeoutRef.current);
    overlay.classList.remove("loaded");
    closeTimeoutRef.current = window.setTimeout(() => {
      overlay.classList.remove("show");
    }, 300);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, image: StillsImage) => {
    e.preventDefault();

    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      (e.currentTarget as HTMLAnchorElement).classList.toggle("tap");
      return;
    }

    openExpanded(image);
  };

  return (
    <main>
      <header className="slowTransition">
        <h1 className="logo uppercase smallFontSize noselect">
          <span className="desktop">
            <a href="/">Louis Browne</a>
          </span>
          <span className="mobile">
            <a href="/">LB</a>
          </span>
        </h1>

        <span className="info uppercase smallFontSize noselect">
          <a href="/information">Information</a>
        </span>

        <span className="archive uppercase smallFontSize noselect">
          <a href="/motion" className="motion">
            Motion
          </a>{" "}
          /{" "}
          <a href="/stills" className="print current">
            Stills
          </a>
        </span>
      </header>

      <section id="archive" className="section show slowTransition noscrollbar">
        <div className="menu uppercase smallFontSize noselect">
          <a href="/motion" className="motion">
            Motion
          </a>{" "}
          /{" "}
          <a href="/stills" className="print current">
            Stills
          </a>
        </div>

        <div className="inner print mediumFontSize archiveGrid">
          {stillsImages.map((image, i) => (
            <div key={i} className="grid-item noselect">
              <a href="#" onClick={(e) => handleClick(e, image)}>
                <picture className="transition show">
                  <img src={image.src} alt={image.title} loading="lazy" />
                </picture>
                <div className="caption transition">
                  <span className="title">{image.title}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      <div id="printExpanded" className="smallFontSize uppercase transition noselect" ref={overlayRef}>
        <div className="image transition">
          <img ref={overlayImgRef} src={undefined} alt="" />
        </div>
        <span className="close" onClick={closeExpanded}>Close</span>
        <div className="text transition" ref={overlayTextRef} />
      </div>
    </main>
  );
}
