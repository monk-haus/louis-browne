"use client";

import { motionProjects } from "../home-data";
import { useMountEffect } from "../hooks/useMountEffect";

export default function MotionClient() {
  useMountEffect(() => {
    document.body.classList.add("archive-opened");
    return () => {
      document.body.classList.remove("archive-opened");
    };
  });

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
          <a href="/motion" className="motion current">
            Motion
          </a>{" "}
          /{" "}
          <a href="/stills" className="print">
            Stills
          </a>
        </span>
      </header>

      <section id="archive" className="section show slowTransition noscrollbar">
        <div className="menu uppercase smallFontSize noselect">
          <a href="/motion" className="motion current">
            Motion
          </a>{" "}
          /{" "}
          <a href="/stills" className="print">
            Stills
          </a>
        </div>

        <div className="inner motion mediumFontSize archiveGrid">
          {motionProjects.map((project) => (
            <div key={project.id} className="grid-item noselect">
              <a href={`/motion/${project.id}`}>
                {project.image ? (
                  <picture className="transition show">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </picture>
                ) : (
                  <div className="thumbnailPlaceholder" />
                )}
                <div className="caption transition">
                  <span className="title">{project.title}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
