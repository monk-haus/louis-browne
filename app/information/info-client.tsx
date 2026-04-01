"use client";

import { useRef } from "react";
import { useMountEffect } from "../hooks/useMountEffect";

const MOBILE_BREAKPOINT = 1000;

type InfoData = {
  titleLine1?: string;
  titleLine2?: string;
  representationLabel?: string;
  representationLine1?: string;
  representationLine2?: string;
  bioBigLine1?: string;
  bioBigLine2?: string;
  bioText?: string[];
  email?: string;
  instagramUrl?: string;
};

export default function InfoClient({ data }: { data?: InfoData }) {
  const d = data ?? {};
  const innerRef = useRef<HTMLDivElement>(null);
  const block0Ref = useRef<HTMLSpanElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    document.body.classList.add("info-opened");

    const inner = innerRef.current;
    const blocks = [block0Ref, block1Ref, block2Ref, block3Ref];
    const timeouts: number[] = [];

    const setupInner = () => {
      if (!inner) return;
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        if (inner.offsetHeight < window.innerHeight) {
          inner.style.height = `${window.innerHeight}px`;
        }
      } else {
        inner.style.height = "";
      }
    };

    setupInner();
    window.addEventListener("resize", setupInner);

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    if (isMobile) {
      blocks.forEach((ref) => ref.current?.classList.add("show"));
    } else {
      const outer = window.setTimeout(() => {
        blocks.forEach((ref, i) => {
          const t = window.setTimeout(() => ref.current?.classList.add("show"), i * 100);
          timeouts.push(t);
        });
      }, 400);
      timeouts.push(outer);
    }

    return () => {
      document.body.classList.remove("info-opened");
      timeouts.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("resize", setupInner);
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
          <a href="/motion" className="motion">
            Motion
          </a>{" "}
          /{" "}
          <a href="/stills" className="print">
            Stills
          </a>
        </span>
      </header>

      <section id="information" className="section show slowTransition noscrollbar">
        <div className="inner" ref={innerRef}>
          <span ref={block0Ref} className="block bigFontSize title slowTransition animateBlock">
            {d.titleLine1 ?? "Studio of"}
            <br />
            {d.titleLine2 ?? "Louis Browne"}
          </span>

          <div ref={block1Ref} className="block representation slowTransition animateBlock">
            <span className="smallFontSize uppercase">{d.representationLabel ?? "U.S. Representation"}</span>
            <span className="bigFontSize">
              {d.representationLine1 ?? "Stadium"}
              <br />
              {d.representationLine2 ?? "Creative Group"}
            </span>
          </div>

          <div ref={block2Ref} className="block correspondence slowTransition animateBlock">
            <span className="smallFontSize uppercase">Bio</span>
            <span className="bigFontSize">
              {d.bioBigLine1 ?? "Born in London,"}
              <br />
              {d.bioBigLine2 ?? "based in New York"}
            </span>
            {(d.bioText ?? [
              "Born in London, Louis Browne spent his teenage years chasing the music scene around England. Playing in bands, and then shifting to photographing them instead, Louis has worked with artists from Billie Eilish to Mumford & Sons, Olivia Rodrigo to The 1975. Moving into commercial work, Louis has shot for Gucci, Delta and Calvin Klein, alongside featuring in publications like British Vogue, Rolling Stone, Rollacoaster, and Wonderland.",
              "When stills naturally grew into motion work, he threw himself head-first into directing campaigns for Adidas, Bulleit, Dior, Nike, OpenAI and Vans that leaned upon his mixed-media approach and choppy, youthful style.",
              "While Louis is now based in New York, he still calls Europe home. His most memorable shoot to date was asking Mike Tyson to 'look more angry' while standing centimetres away from his left fist. He's grateful to still be with us today.",
            ]).map((para, i) => (
              <span key={i} className="smallFontSize bioText">{para}</span>
            ))}
          </div>

          <div ref={block3Ref} className="block rrss slowTransition animateBlock">
            <span className="smallFontSize uppercase">Get in touch</span>
            <a className="mediumFontSize" href={`mailto:${d.email ?? "browne.louis@gmail.com"}`}>
              Email
            </a>
            <a className="mediumFontSize" href={d.instagramUrl ?? "https://www.instagram.com/louis_browne/"} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
