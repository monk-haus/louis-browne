"use client";

import { type StillsProject } from "../../home-data";
import { useMountEffect } from "../../hooks/useMountEffect";

export default function StillsProjectClient({ project }: { project: StillsProject }) {
  useMountEffect(() => {
    document.body.classList.add("project-opened");
    return () => {
      document.body.classList.remove("project-opened");
    };
  });

  const images = project.images ?? [];

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

      <section id="project" className="section show slowTransition noscrollbar">
        <div className="projectDetail">
          {project.image && (
            <figure className="intro show transition">
              <picture className="show">
                <img src={project.image} alt={project.title} />
              </picture>
            </figure>
          )}

          <h1 className="bigFontSize slowTransition projectTitle">{project.title}</h1>

          {images.length > 0 && (
            <div className="content">
              {images.map((src, i) => {
                if (i % 2 !== 0) return null;
                const nextSrc = images[i + 1];

                if (nextSrc) {
                  return (
                    <div key={i} className="row two_columns">
                      <div className="columns">
                        <div className="column">
                          <picture className="show">
                            <img src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
                          </picture>
                        </div>
                        <div className="column">
                          <picture className="show">
                            <img src={nextSrc} alt={`${project.title} ${i + 2}`} loading="lazy" />
                          </picture>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className="row full_width">
                    <picture className="show">
                      <img src={src} alt={`${project.title} ${i + 1}`} loading="lazy" />
                    </picture>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <a href="/stills" className="closeProject smallFontSize uppercase noselect">
          Close
        </a>
      </section>
    </main>
  );
}
