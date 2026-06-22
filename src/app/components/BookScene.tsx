"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";

type FlipState = {
  kind: "cover" | "next" | "prev";
  phase: "start" | "run";
};

const TOTAL_PAGES = 10;
const TOTAL_SPREADS = Math.ceil(TOTAL_PAGES / 2); // 5

const IMAGE_PAGE_INDICES = [3, 5, 7];
const RIGHT_TEXT_PAGE_INDICES = [1, 9];

function pgShift(idx: number): string {
  if (idx === 0) return "none";
  if (RIGHT_TEXT_PAGE_INDICES.includes(idx)) return "none";
  return IMAGE_PAGE_INDICES.includes(idx)
    ? "translateX(32px)"
    : "translateX(-28px)";
}

function extraLeftPad(idx: number): number {
  if (idx === 1) return 160;
  if (idx === 9) return 120;
  return 0;
}

function pgPad(isLeft: boolean, pad: number): string {
  return isLeft
    ? `${pad}px ${Math.round(pad * 0.45)}px ${pad}px ${Math.round(pad * 1.45)}px`
    : `${pad}px ${Math.round(pad * 1.45)}px ${pad}px ${Math.round(pad * 0.45)}px`;
}

function faceBg(asLeft: boolean): React.CSSProperties {
  return {
    background: asLeft
      ? "linear-gradient(90deg,#ECE2CC,#F7F1E2 20%)"
      : "linear-gradient(270deg,#ECE2CC,#F7F1E2 20%)",
    boxShadow: asLeft
      ? "inset -18px 0 30px -20px rgba(90,68,44,.55)"
      : "inset 18px 0 30px -20px rgba(90,68,44,.55)",
  };
}

function GoldRule({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        height: 2,
        background:
          "linear-gradient(90deg,rgba(201,162,74,0),#C9A24A,rgba(201,162,74,0))",
        ...style,
      }}
    />
  );
}

function ChapterHeader({
  numeral,
  label,
  title,
  ruleMargin,
}: {
  numeral: string;
  label: string;
  title: string;
  ruleMargin: string;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-gloock)",
          fontSize: 40,
          color: "#C9A24A",
          lineHeight: 1,
        }}
      >
        {numeral}
      </div>
      <p
        style={{
          fontFamily: "var(--font-caveat)",
          fontSize: 23,
          color: "#C77B5E",
          margin: "4px 0 8px",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-gloock)",
          fontSize: 27,
          lineHeight: 1.14,
          color: "#463C52",
          margin: "0 auto",
          maxWidth: "15ch",
        }}
      >
        {title}
      </h2>
      <GoldRule style={{ width: 70, margin: ruleMargin }} />
    </>
  );
}

function ListItem({
  heading,
  body,
  fontSize,
  bodyFontSize,
}: {
  heading: string;
  body: string;
  fontSize: number;
  bodyFontSize: number;
}) {
  return (
    <div style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
      <span
        style={{
          flex: "none",
          color: "#C9A24A",
          fontFamily: "var(--font-gloock)",
          fontSize,
        }}
      >
        ❧
      </span>
      <div>
        <h3
          style={{
            margin: "0 0 1px",
            fontFamily: "var(--font-gloock)",
            fontSize,
            color: "#463C52",
          }}
        >
          {heading}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: bodyFontSize,
            lineHeight: 1.5,
            color: "#6a6478",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function PageContent({ idx }: { idx: number }) {
  switch (idx) {
    case 0:
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image
            src="/images/deanna-heroine.jpg"
            alt="Deanna as a storybook heroine"
            fill
            style={{ objectFit: "cover", objectPosition: "50% 12%" }}
            sizes="50vw"
          />
        </div>
      );
    case 1:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-gloock)",
              fontSize: 64,
              lineHeight: 0.95,
              color: "#463C52",
              margin: 0,
            }}
          >
            Deanna
          </h1>
          <GoldRule style={{ width: 96, margin: "18px 0" }} />
          <p style={{ fontSize: 17, color: "#5a5168", margin: 0, maxWidth: "26ch" }}>
            A quaint tale of a problem solver, kitchen wiz, and bookworm
          </p>
        </div>
      );
    case 2:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <ChapterHeader
              numeral="I"
              label="Chapter One"
              title="The quest for the perfect workflow"
              ruleMargin="14px auto 20px"
            />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#6a6478", margin: "0 0 18px" }}>
            Starting as a brave little apprentice, for the last four years
            Deanna has been shipping end to end enterprise software experiences
            at ServiceNow. She designs at every fidelity, defeats design dead
            ends and errors, and journeys alongside generative AI to fulfill
            workflow objectives.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <ListItem
              heading="Ideate"
              body="From fuzzy, ambiguous requirements to a tangible workflow."
              fontSize={17}
              bodyFontSize={14}
            />
            <ListItem
              heading="Design & prototype"
              body="At every fidelity, then tested with real humans."
              fontSize={17}
              bodyFontSize={14}
            />
            <ListItem
              heading="Collaborate"
              body="Side by side with PMs, engineers and stakeholders."
              fontSize={17}
              bodyFontSize={14}
            />
          </div>
        </div>
      );
    case 3:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 9,
              borderRadius: 3,
              boxShadow: "0 16px 34px rgba(74,60,82,.24)",
              transform: "rotate(1.4deg)",
              width: "136%",
            }}
          >
            <Image
              src="/images/ux-dragon.jpg"
              alt="The UX design process imagined as a fearsome dragon"
              width={500}
              height={375}
              style={{ display: "block", width: "100%", height: "auto", borderRadius: 2 }}
            />
          </div>
        </div>
      );
    case 4:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <ChapterHeader
              numeral="II"
              label="Chapter Two"
              title="Her favorite side quests"
              ruleMargin="14px auto 18px"
            />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#6a6478", margin: "0 0 18px" }}>
            Deanna enjoys nothing more than being home, for a person&apos;s home
            is their castle. Whipping something up in the kitchen or diving into
            a tale or two is a great way to unwind after conquering complex UX
            adventures.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ListItem
              heading="Guild of the Bookmark"
              body="She reads fantasy for the maps, the magic systems, and the joy of getting wonderfully lost."
              fontSize={16}
              bodyFontSize={13.5}
            />
            <ListItem
              heading="Cinematic Slayer"
              body="A devoted fan of great storytelling, working through movies and anime one beautifully drawn frame at a time."
              fontSize={16}
              bodyFontSize={13.5}
            />
            <ListItem
              heading="Keeper of the Oven Flame"
              body="Whether it is a tray of desserts or a brand new recipe, she rules the kitchen with equal parts science, patience and joy."
              fontSize={16}
              bodyFontSize={13.5}
            />
            <ListItem
              heading="Scroll Scribbler"
              body="Drawing and painting on a whim, filling pages with color whenever inspiration strikes."
              fontSize={16}
              bodyFontSize={13.5}
            />
          </div>
        </div>
      );
    case 5:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 9,
              borderRadius: 3,
              boxShadow: "0 16px 34px rgba(74,60,82,.24)",
              transform: "rotate(-1.4deg)",
              width: "136%",
            }}
          >
            <Image
              src="/images/deanna-knight.jpg"
              alt="Deanna as a knight, cooking and reading in a cozy castle kitchen"
              width={500}
              height={375}
              style={{ display: "block", width: "100%", height: "auto", borderRadius: 2 }}
            />
          </div>
        </div>
      );
    case 6:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <ChapterHeader
            numeral="III"
            label="Chapter Three"
            title="And at the center of it all, her heart"
            ruleMargin="16px auto 20px"
          />
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "#6a6478",
              margin: "0 0 22px",
              maxWidth: "34ch",
            }}
          >
            Woven at the core of her life is her Christian faith and love of
            family. Her happiest chapters are written at home, having adventures
            with her husband and two year old son.
          </p>
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: 27,
              color: "#C77B5E",
              margin: 0,
              maxWidth: "24ch",
            }}
          >
            a dreamer, grateful for every page of the story.
          </p>
        </div>
      );
    case 7:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 9,
              borderRadius: 3,
              boxShadow: "0 16px 34px rgba(74,60,82,.24)",
              transform: "rotate(1.3deg)",
              width: "80%",
            }}
          >
            <Image
              src="/images/deanna-family.jpg"
              alt="Deanna with her husband and young son, as a knightly family before a castle"
              width={500}
              height={375}
              style={{ display: "block", width: "100%", height: "auto", borderRadius: 2 }}
            />
          </div>
        </div>
      );
    case 8:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 6,
          }}
        >
          <div style={{ color: "#C9A24A", fontSize: 24 }}>❦</div>
          <h2
            style={{
              fontFamily: "var(--font-gloock)",
              fontSize: 42,
              color: "#463C52",
              margin: "10px 0",
            }}
          >
            The End
          </h2>
          <GoldRule style={{ width: 84 }} />
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: 24,
              color: "#9a8a6a",
              marginTop: 16,
            }}
          >
            …for now
          </p>
        </div>
      );
    case 9:
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: 26,
              color: "#C77B5E",
              margin: "0 0 6px",
            }}
          >
            The next chapter
          </p>
          <h2
            style={{
              fontFamily: "var(--font-gloock)",
              fontSize: 30,
              color: "#463C52",
              margin: "0 0 22px",
              maxWidth: "13ch",
            }}
          >
            Let&apos;s write it together
          </h2>
          <a
            href="https://www.linkedin.com/in/deannavwhitfield/"
            target="_blank"
            rel="noopener"
            style={{
              textDecoration: "none",
              display: "inline-block",
              background: "#D98A6E",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 100,
              marginBottom: 12,
              boxShadow: "0 10px 22px rgba(217,138,110,.35)",
            }}
          >
            Find me on LinkedIn
          </a>
          <a
            href="mailto:hello@example.com"
            style={{
              textDecoration: "none",
              display: "inline-block",
              background: "#463C52",
              color: "#F4EEE4",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 100,
            }}
          >
            Say hello
          </a>
        </div>
      );
    default:
      return <div style={{ height: "100%" }} />;
  }
}

function PageFace({
  idx,
  asLeft,
  pad,
  backfaceHidden,
  initialRotation,
}: {
  idx: number;
  asLeft: boolean;
  pad: number;
  backfaceHidden?: boolean;
  initialRotation?: string;
}) {
  const showBorder = idx > 1;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        ...(backfaceHidden
          ? {
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
            }
          : {}),
        ...(initialRotation ? { transform: initialRotation } : {}),
        ...faceBg(asLeft),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxSizing: "border-box",
          padding: pgPad(asLeft, pad),
          paddingLeft:
            (asLeft ? Math.round(pad * 1.45) : Math.round(pad * 0.45)) +
            extraLeftPad(idx),
          overflow: "hidden",
          color: "#463C52",
          transform: pgShift(idx),
        }}
      >
        <PageContent idx={idx} />
      </div>
      {showBorder && (
        <Image
          src="/images/border-frame.png"
          alt=""
          fill
          style={{
            objectFit: "fill",
            pointerEvents: "none",
            zIndex: 10,
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}

function StaticPage({
  idx,
  side,
  pw,
  ph,
  pad,
}: {
  idx: number;
  side: "left" | "right";
  pw: number;
  ph: number;
  pad: number;
}) {
  const isLeft = side === "left";
  const showBorder = idx > 1;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        [side]: 0,
        width: pw,
        height: ph,
        overflow: "hidden",
        zIndex: 1,
        ...faceBg(isLeft),
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxSizing: "border-box",
          padding: pgPad(isLeft, pad),
          paddingLeft:
            (isLeft ? Math.round(pad * 1.45) : Math.round(pad * 0.45)) +
            extraLeftPad(idx),
          overflow: "hidden",
          color: "#463C52",
          transform: pgShift(idx),
        }}
      >
        <PageContent idx={idx} />
      </div>
      {showBorder && (
        <Image
          src="/images/border-frame.png"
          alt=""
          fill
          style={{
            objectFit: "fill",
            pointerEvents: "none",
            zIndex: 10,
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}

function CoverFront({ pw }: { pw: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
        borderRadius: "2px 8px 8px 2px",
        background: "linear-gradient(135deg,#4b3527,#2e2018 55%,#231510)",
        boxShadow: "inset 0 0 70px rgba(0,0,0,.55)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "7%",
          border: "1px solid rgba(201,162,74,.5)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "9.5%",
          border: "1px solid rgba(201,162,74,.28)",
          borderRadius: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 14%",
        }}
      >
        <GoldRule style={{ width: "52%", marginBottom: 14 }} />
        <div
          style={{
            color: "#C9A24A",
            fontFamily: "var(--font-caveat)",
            fontSize: 22,
            marginBottom: 4,
          }}
        >
          ❦
        </div>
        <div
          style={{
            fontFamily: "var(--font-gloock)",
            fontSize: Math.min(64, pw * 0.17),
            letterSpacing: ".04em",
            color: "#E7C879",
            textShadow: "0 1px 2px rgba(0,0,0,.6)",
            lineHeight: 1,
          }}
        >
          Deanna
        </div>
        <GoldRule style={{ width: "52%", marginTop: 14 }} />
        <div
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: 18,
            color: "#b89a5e",
            marginTop: 12,
          }}
        >
          Once upon a time…
        </div>
      </div>
    </div>
  );
}

export default function BookScene() {
  const [open, setOpen] = useState(false);
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState<FlipState | null>(null);
  const [winW, setWinW] = useState(1200);
  const [winH, setWinH] = useState(800);

  const flipRef = useRef(flip);
  flipRef.current = flip;
  const spreadRef = useRef(spread);
  spreadRef.current = spread;

  useEffect(() => {
    setWinW(window.innerWidth);
    setWinH(window.innerHeight);
    const onResize = () => {
      setWinW(window.innerWidth);
      setWinH(window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Phase start → run transition
  useEffect(() => {
    if (!flip || flip.phase !== "start") return;
    const f = flip;
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (!cancelled) {
            setFlip((prev) =>
              prev?.phase === "start" ? { ...f, phase: "run" } : prev
            );
          }
        }, 30);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [flip]);

  const handleOpen = useCallback(() => {
    if (flipRef.current) return;
    setOpen(true);
    setSpread(0);
    setFlip({ kind: "cover", phase: "start" });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSpread(0);
    setFlip(null);
  }, []);

  const handleNext = useCallback(() => {
    if (flipRef.current || spreadRef.current >= TOTAL_SPREADS - 1) return;
    setFlip({ kind: "next", phase: "start" });
  }, []);

  const handlePrev = useCallback(() => {
    if (flipRef.current || spreadRef.current <= 0) return;
    setFlip({ kind: "prev", phase: "start" });
  }, []);

  const handleFlipEnd = useCallback(() => {
    const f = flipRef.current;
    if (!f) return;
    if (f.kind === "next") setSpread((s) => s + 1);
    if (f.kind === "prev") setSpread((s) => s - 1);
    setFlip(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleNext, handlePrev, handleClose]);

  const dims = useMemo(() => {
    let bw = Math.min(winW * 0.94, 1360);
    let pw = bw / 2;
    let ph = pw * 1.34;
    const maxh = winH * 0.86;
    if (ph > maxh) {
      ph = maxh;
      pw = ph / 1.34;
      bw = pw * 2;
    }
    return { bw, pw, ph, pad: Math.round(pw * 0.11) };
  }, [winW, winH]);

  const { bw, pw, ph, pad } = dims;
  const atStart = spread <= 0;
  const atEnd = spread >= TOTAL_SPREADS - 1;
  const busy = !!flip;

  // Determine which static pages to show
  let leftIdx = 2 * spread;
  let rightIdx = 2 * spread + 1;
  let leafTransform: string | null = null;
  let leafFront: React.ReactNode = null;
  let leafBack: React.ReactNode = null;

  if (flip) {
    if (flip.kind === "cover") {
      leftIdx = 0;
      rightIdx = 1;
      leafTransform =
        flip.phase === "run" ? "rotateY(-180deg)" : "rotateY(0deg)";
      leafFront = <CoverFront pw={pw} />;
      leafBack = (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
            background: "linear-gradient(135deg,#e7d9bd,#d8c6a2)",
            boxShadow: "inset 18px 0 30px -20px rgba(90,68,44,.55)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "11%",
              border: "1px solid rgba(140,110,60,.35)",
              borderRadius: 3,
            }}
          />
        </div>
      );
    } else if (flip.kind === "next") {
      leftIdx = 2 * spread;
      rightIdx = 2 * spread + 3;
      leafTransform =
        flip.phase === "run" ? "rotateY(-180deg)" : "rotateY(0deg)";
      leafFront = (
        <PageFace
          idx={2 * spread + 1}
          asLeft={false}
          pad={pad}
          backfaceHidden
        />
      );
      leafBack = (
        <PageFace
          idx={2 * spread + 2}
          asLeft={true}
          pad={pad}
          backfaceHidden
          initialRotation="rotateY(180deg)"
        />
      );
    } else {
      // prev
      leftIdx = 2 * spread - 2;
      rightIdx = 2 * spread + 1;
      leafTransform =
        flip.phase === "run" ? "rotateY(0deg)" : "rotateY(-180deg)";
      leafFront = (
        <PageFace
          idx={2 * spread - 1}
          asLeft={false}
          pad={pad}
          backfaceHidden
        />
      );
      leafBack = (
        <PageFace
          idx={2 * spread}
          asLeft={true}
          pad={pad}
          backfaceHidden
          initialRotation="rotateY(180deg)"
        />
      );
    }
  }

  return (
    <>
      {/* SHELF SCENE */}
      <header
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "min(100vh, 860px)",
            aspectRatio: "1316/1195",
          }}
        >
          <Image
            src="/images/shelf-books.jpg"
            alt="A shelf of leather-bound books"
            fill
            style={{ objectFit: "contain" }}
            priority
            sizes="100vw"
          />
          {/* Spotlight glow on center book */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(150px 280px at 50% 50%, rgba(255,228,165,.24), rgba(255,228,165,0) 66%)",
              pointerEvents: "none",
              animation: "sb-glow 4s ease-in-out infinite",
            }}
          />
          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 120px 30px rgba(0,0,0,.5)",
              pointerEvents: "none",
            }}
          />
          {/* Hit target over the Deanna book spine */}
          <div
            onClick={handleOpen}
            style={{
              position: "absolute",
              left: "36%",
              top: 0,
              width: "28%",
              height: "100%",
              cursor: "pointer",
              zIndex: 5,
            }}
          />
        </div>

        {/* Down chevron hint */}
        <div
          style={{
            position: "absolute",
            bottom: "6%",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              color: "#E7C879",
              fontSize: 20,
              animation: "sb-bob 1.8s ease-in-out infinite",
              textShadow: "0 2px 8px rgba(0,0,0,.7)",
            }}
          >
            ⌄
          </div>
        </div>
      </header>

      {/* BOOK OVERLAY */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            animation: "sb-pop .5s ease both",
          }}
        >
          {/* Blurred shelf background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/shelf-books.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(18px) brightness(.4) saturate(.85)",
              transform: "scale(1.18)",
            }}
          />
          {/* Radial overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(60% 60% at 50% 45%, rgba(45,32,20,.25), rgba(13,9,6,.9))",
            }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              zIndex: 5,
              background: "rgba(255,255,255,.08)",
              color: "#F4EEE4",
              border: "1px solid rgba(244,238,228,.3)",
              borderRadius: 100,
              padding: "9px 16px",
              fontFamily: "var(--font-quicksand)",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,.08)";
            }}
          >
            ✕&nbsp;&nbsp;Close the book
          </button>

          {/* Book */}
          <div
            style={{ perspective: "2600px", position: "relative", zIndex: 2 }}
          >
            {/* Leather backing */}
            <div style={{ position: "relative", width: bw, height: ph }}>
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: -24,
                  right: -24,
                  bottom: -16,
                  background: "linear-gradient(135deg,#3c2a1e,#241611)",
                  borderRadius: 14,
                  boxShadow: "0 50px 100px rgba(0,0,0,.55)",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  left: -12,
                  right: -12,
                  bottom: -7,
                  border: "1px solid rgba(201,162,74,.45)",
                  borderRadius: 9,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* Book pages */}
              <div
                style={{ position: "relative", width: bw, height: ph, zIndex: 1 }}
              >
                <StaticPage
                  idx={leftIdx}
                  side="left"
                  pw={pw}
                  ph={ph}
                  pad={pad}
                />
                <StaticPage
                  idx={rightIdx}
                  side="right"
                  pw={pw}
                  ph={ph}
                  pad={pad}
                />

                {/* Spine shadow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: Math.round(pw * 0.14),
                    height: ph,
                    background:
                      "linear-gradient(90deg,rgba(70,50,30,0),rgba(70,50,30,.30),rgba(70,50,30,0))",
                    zIndex: 6,
                    pointerEvents: "none",
                  }}
                />

                {/* Flip leaf */}
                {flip && leafTransform !== null && (
                  <div
                    key={`leaf-${flip.kind}-${spread}`}
                    onTransitionEnd={(e) => {
                      if (
                        e.propertyName === "transform" &&
                        e.target === e.currentTarget
                      ) {
                        handleFlipEnd();
                      }
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      width: pw,
                      height: ph,
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      WebkitTransformStyle: "preserve-3d" as React.CSSProperties["WebkitTransformStyle"],
                      transform: leafTransform,
                      transition:
                        flip.phase === "run"
                          ? "transform 1s cubic-bezier(.42,.04,.22,1)"
                          : "none",
                      zIndex: 30,
                      boxShadow: "0 18px 34px rgba(0,0,0,.28)",
                    }}
                  >
                    {leafFront}
                    {leafBack}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 24,
              zIndex: 2,
            }}
          >
            <NavButton
              label="‹  Back"
              onClick={handlePrev}
              disabled={atStart || busy}
              primary={false}
            />
            {/* Dots */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 50,
                    background:
                      i === spread
                        ? "#E7C879"
                        : "rgba(231,200,121,.3)",
                    transition: "background .3s",
                  }}
                />
              ))}
            </div>
            <NavButton
              label="Turn the page  ›"
              onClick={handleNext}
              disabled={atEnd || busy}
              primary={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  primary,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  primary: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: primary ? "none" : "1px solid rgba(244,238,228,.4)",
        background: primary ? "#D98A6E" : "rgba(244,238,228,.1)",
        color: primary ? "#fff" : "#F4EEE4",
        borderRadius: 100,
        padding: "13px 26px",
        fontFamily: "var(--font-quicksand)",
        fontWeight: 600,
        fontSize: 15,
        boxShadow: primary ? "0 10px 22px rgba(217,138,110,.4)" : "none",
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? "none" : "auto",
        cursor: disabled ? "default" : "pointer",
        transition: "transform .2s ease, box-shadow .2s ease, background .2s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.transform =
            "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "none";
      }}
    >
      {label}
    </button>
  );
}
