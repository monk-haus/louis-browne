"use client";

import { type MotionProject } from "../../home-data";
import { useMountEffect } from "../../hooks/useMountEffect";

function vimeoEmbedUrl(id: string) {
  return `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0`;
}

export default function ProjectClient({ project }: { project: MotionProject }) {
  useMountEffect(() => {
    document.body.classList.add("project-opened");
    return () => {
      document.body.classList.remove("project-opened");
    };
  });

  const [firstVideo, secondVideo] = project.vimeoIds ?? [];
  const hasImages = project.images && project.images.length > 0;
  const hasContent = secondVideo || hasImages;

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

      <section id="project" className="section show slowTransition noscrollbar">
        <div className="projectDetail">
          {firstVideo ? (
            <figure className="intro show transition">
              <div className="vimeoWrap">
                <iframe
                  src={vimeoEmbedUrl(firstVideo)}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />
              </div>
            </figure>
          ) : project.image ? (
            <figure className="intro show transition">
              <picture className="show">
                <img src={project.image} alt={project.title} />
              </picture>
            </figure>
          ) : null}

          <h1 className="bigFontSize slowTransition projectTitle">
            {project.title}
          </h1>

          {hasContent && (
            <div className="content">
              {secondVideo && (
                <div className="row full_width">
                  <div className="vimeoWrap">
                    <iframe
                      src={vimeoEmbedUrl(secondVideo)}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {hasImages && project.images!.map((src, i) => {
                if (i % 2 !== 0) return null;
                const nextSrc = project.images![i + 1];

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

        <a href="/motion" className="closeProject smallFontSize uppercase noselect">
          Close
        </a>
      </section>
    </main>
  );
}
