import { useEffect, useState } from "react";
import Profile from "./Profile.jsx";
import Project from "./Project.jsx";
import Achievement from "./Achievement.jsx";
import Certification from "./Certification.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = (tab) => {
    setActiveTab(tab === "contact" ? "about" : tab);
    window.scrollTo(0, 0);
  };
  const [time, setTime] = useState(new Date());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(clock);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <>
      <style>{`

        /* =====================================================
           RESET
        ===================================================== */

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          width: 100%;
          height: 100%;
          scroll-behavior: smooth;
        }

        body {
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          background: #090909;
          font-family: Arial, Helvetica, sans-serif;
        }

        #root {
          width: 100%;
          min-height: 100vh;
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .portfolio {
          position: relative;

          width: 100%;
          height: 100vh;
          height: 100dvh;

          min-height: 520px;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #fff;

          background:
            radial-gradient(
              circle at 50% 45%,
              #303130 0%,
              #292a29 25%,
              #222322 57%,
              #181918 100%
            );
        }


        /* =====================================================
           GRAIN
        ===================================================== */

        .grain {
          position: absolute;
          inset: 0;

          z-index: 50;

          pointer-events: none;

          opacity: 0.045;

          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");

          mix-blend-mode: screen;
        }


        /* =====================================================
           LIGHT
        ===================================================== */

        .light {
          position: absolute;

          left: 50%;
          top: 50%;

          width: clamp(
            180px,
            30vw,
            430px
          );

          aspect-ratio: 1;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.025);

          filter:
            blur(
              clamp(
                40px,
                5vw,
                85px
              )
            );

          pointer-events: none;

          animation:
            lightPulse 6s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%,
          100% {
            opacity: 0.2;
            scale: 0.85;
          }

          50% {
            opacity: 0.6;
            scale: 1.12;
          }
        }


        /* =====================================================
           GRID
        ===================================================== */

        .grid {
          position: absolute;

          left: 50%;
          top: 7%;

          width: min(48vw, 650px);

          height: clamp(
            90px,
            17vh,
            180px
          );

          transform: translateX(-50%);

          background-image:
            linear-gradient(
              rgba(150, 150, 150, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(150, 150, 150, 0.2) 1px,
              transparent 1px
            );

          background-size:
            clamp(18px, 2vw, 30px)
            clamp(18px, 2vw, 30px);

          opacity: 0.42;

          mask-image:
            linear-gradient(
              to bottom,
              black 0%,
              rgba(0, 0, 0, 0.45) 55%,
              transparent 100%
            );
        }

        .grid.bottom {
          top: auto;
          bottom: 12%;

          mask-image:
            linear-gradient(
              to top,
              black 0%,
              rgba(0, 0, 0, 0.45) 55%,
              transparent 100%
            );
        }


        /* =====================================================
           TIMER
        ===================================================== */

        .timer-background {
          position: absolute;

          left: 50%;
          top: 50%;

          z-index: 1;

          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          pointer-events: none;

          transform:
            translate(
              calc(-50% + ${mouse.x * 0.25}px),
              calc(-50% + ${mouse.y * 0.25}px)
            );

          transition:
            transform 0.15s ease-out;
        }

        .timer {
          color: #353635;

          font-size: clamp(
            64px,
            11vw,
            180px
          );

          line-height: 0.8;

          font-weight: 900;

          letter-spacing: -0.55vw;

          white-space: nowrap;

          font-variant-numeric: tabular-nums;

          opacity: 0.7;

          user-select: none;

          animation:
            timerAppear 1.2s ease-out both;
        }

        @keyframes timerAppear {
          from {
            opacity: 0;
            transform: scale(0.94);
          }

          to {
            opacity: 0.7;
            transform: scale(1);
          }
        }


        /* =====================================================
           TOP LABEL
        ===================================================== */

        .top-left,
        .top-right {
          position: absolute;

          top: clamp(
            20px,
            5.5vh,
            60px
          );

          z-index: 15;

          color: #858585;

          font-size: clamp(
            6px,
            0.55vw,
            9px
          );

          font-weight: 600;

          letter-spacing: clamp(
            2px,
            0.35vw,
            5px
          );

          text-transform: uppercase;

          white-space: nowrap;

          animation:
            topAppear 1s ease-out both;
        }

        .top-left {
          left: clamp(
            18px,
            4vw,
            60px
          );
        }

        .top-right {
          right: clamp(
            18px,
            4vw,
            60px
          );

          animation-delay: 0.15s;
        }

        @keyframes topAppear {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           HERO
        ===================================================== */

        .main {
          position: relative;

          z-index: 10;

          width: min(
            94vw,
            1150px
          );

          padding: 20px;

          text-align: center;
        }


        /* =====================================================
           HELLO
        ===================================================== */

        .hello {
          margin-bottom: clamp(
            13px,
            2vh,
            22px
          );

          color: #d2d2d2;

          font-size: clamp(
            14px,
            1.2vw,
            20px
          );

          font-weight: 700;

          letter-spacing: clamp(
            4px,
            0.65vw,
            9px
          );

          text-transform: uppercase;

          animation:
            heroTop 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.15s both;
        }


        /* =====================================================
           CATEGORY
        ===================================================== */

        .category {
          margin-bottom: clamp(
            18px,
            2.7vh,
            29px
          );

          color: #9b9b9b;

          font-size: clamp(
            10px,
            0.9vw,
            15px
          );

          font-weight: 600;

          letter-spacing: clamp(
            3px,
            0.58vw,
            8px
          );

          text-transform: uppercase;

          animation:
            heroTop 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.3s both;
        }

        @keyframes heroTop {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           TITLE
        ===================================================== */

        .title-row {
          width: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: clamp(
            8px,
            1.3vw,
            20px
          );

          animation:
            titleAppear 1.1s
            cubic-bezier(.2,.8,.2,1)
            0.45s both;
        }

        .line {
          flex: 1;

          max-width: clamp(
            45px,
            9vw,
            125px
          );

          height: 1px;

          background: #b0b0b0;

          opacity: 0.85;
        }

        .title {
          flex-shrink: 1;

          color: #f5f5f5;

          font-size: clamp(
            44px,
            6.5vw,
            90px
          );

          line-height: 0.9;

          font-weight: 900;

          letter-spacing: clamp(
            1px,
            0.25vw,
            3px
          );

          white-space: nowrap;

          text-shadow:
            0 0 30px
            rgba(
              255,
              255,
              255,
              0.05
            );
        }

        @keyframes titleAppear {
          from {
            opacity: 0;
            transform:
              translateY(25px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }


        /* =====================================================
           BUTTON CONTAINER
        ===================================================== */

        .buttons {
          display: flex;

          flex-wrap: wrap;

          align-items: center;
          justify-content: center;

          gap: clamp(
            7px,
            0.8vw,
            13px
          );

          margin-top: clamp(
            21px,
            3vh,
            32px
          );

          animation:
            buttonsEntrance 1s
            cubic-bezier(.2,.8,.2,1)
            0.65s both;
        }

        @keyframes buttonsEntrance {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        /* =====================================================
           BUTTON
        ===================================================== */

        .button {
          position: relative;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: clamp(
            105px,
            9vw,
            138px
          );

          height: clamp(
            32px,
            3.5vh,
            41px
          );

          padding:
            0 clamp(
              14px,
              1.5vw,
              23px
            );

          overflow: hidden;

          border: 1px solid #707070;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color: #dedede;

          font-size: clamp(
            7px,
            0.65vw,
            10px
          );

          font-weight: 700;

          letter-spacing: clamp(
            0.8px,
            0.14vw,
            1.7px
          );

          text-decoration: none;

          text-transform: uppercase;

          backdrop-filter: blur(8px);

          transform: translateY(0);

          transition:
            transform 0.35s
              cubic-bezier(.2,.8,.2,1),
            background 0.35s ease,
            color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;

          animation:
            buttonFloat 4s ease-in-out infinite;
        }


        /* =====================================================
           BUTTON DELAY
        ===================================================== */

        .button:nth-child(1) {
          animation-delay: 0s;
        }

        .button:nth-child(2) {
          animation-delay: 0.25s;
        }

        .button:nth-child(3) {
          animation-delay: 0.5s;
        }

        @keyframes buttonFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }


        /* =====================================================
           BUTTON LIGHT SWEEP
        ===================================================== */

        .button::before {
          content: "";

          position: absolute;

          top: 0;
          left: -130%;

          width: 75%;
          height: 100%;

          background:
            linear-gradient(
              100deg,
              transparent,
              rgba(
                255,
                255,
                255,
                0.22
              ),
              transparent
            );

          transform: skewX(-20deg);

          transition:
            left 0.65s ease;

          pointer-events: none;
        }

        .button:hover::before {
          left: 145%;
        }


        /* =====================================================
           BUTTON BORDER GLOW
        ===================================================== */

        .button::after {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: inherit;

          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.6
            );

          opacity: 0;

          transform: scale(0.96);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;

          pointer-events: none;
        }

        .button:hover::after {
          opacity: 1;

          transform: scale(1);
        }


        /* =====================================================
           BUTTON HOVER
        ===================================================== */

        .button:hover {
          transform:
            translateY(-7px)
            scale(1.045);

          background:
            rgba(
              255,
              255,
              255,
              0.12
            );

          color: #ffffff;

          border-color: #aaaaaa;

          box-shadow:
            0 10px 30px
            rgba(
              255,
              255,
              255,
              0.09
            ),
            0 0 20px
            rgba(
              255,
              255,
              255,
              0.07
            );

          animation-play-state: paused;
        }


        /* =====================================================
           BUTTON CLICK
        ===================================================== */

        .button:active {
          transform:
            translateY(-1px)
            scale(0.95);

          transition:
            transform 0.1s ease;
        }


        /* =====================================================
           PRIMARY BUTTON
        ===================================================== */

        .button.primary {
          background: #eeeeee;

          color: #1b1c1b;

          border-color: #eeeeee;

          box-shadow:
            0 0 0
            rgba(
              255,
              255,
              255,
              0
            );
        }

        .button.primary:hover {
          background: #ffffff;

          color: #111111;

          border-color: #ffffff;

          box-shadow:
            0 10px 35px
            rgba(
              255,
              255,
              255,
              0.18
            ),
            0 0 25px
            rgba(
              255,
              255,
              255,
              0.1
            );
        }


        /* =====================================================
           BOTTOM TEXT
        ===================================================== */

        .bottom {
          position: absolute;

          left: 50%;
          bottom: clamp(
            91px,
            13vh,
            128px
          );

          z-index: 10;

          width: 90%;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;
          justify-content: center;

          gap: clamp(
            12px,
            2vw,
            26px
          );

          color: #707070;

          font-size: clamp(
            5px,
            0.5vw,
            8px
          );

          font-weight: 600;

          letter-spacing: clamp(
            2px,
            0.35vw,
            5px
          );

          white-space: nowrap;

          animation:
            bottomAppear 1s ease-out 1s both;
        }

        .bottom-line {
          width: clamp(
            25px,
            4vw,
            60px
          );

          height: 1px;

          background: #646464;
        }

        @keyframes bottomAppear {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }


        /* =====================================================
           NAVBAR
        ===================================================== */

        .bottom-nav {
          position: absolute;

          left: 50%;
          bottom: clamp(
            15px,
            3.5vh,
            38px
          );

          z-index: 30;

          transform:
            translateX(-50%);

          display: flex;

          align-items: center;
          justify-content: center;

          width: max-content;

          max-width:
            calc(100vw - 30px);

          min-height: 52px;

          padding: 5px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.22
            );

          border-radius: 999px;

          background:
            rgba(
              34,
              35,
              34,
              0.82
            );

          box-shadow:
            0 12px 35px
            rgba(
              0,
              0,
              0,
              0.35
            );

          backdrop-filter:
            blur(15px);

          -webkit-backdrop-filter:
            blur(15px);

          animation:
            navAppear 0.9s
            cubic-bezier(.2,.8,.2,1)
            0.8s both;
        }

        @keyframes navAppear {
          from {
            opacity: 0;
            transform:
              translate(-50%, 25px);
          }

          to {
            opacity: 1;
            transform:
              translate(-50%, 0);
          }
        }


        /* =====================================================
           NAV ITEM
        ===================================================== */

        .nav-item {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          width: 50px;
          min-width: 50px;

          height: 42px;

          padding: 0 11px;

          border-radius: 999px;

          color: #dcdcdc;

          text-decoration: none;

          transition:
            width 0.3s ease,
            min-width 0.3s ease,
            background 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease;
        }

        .nav-icon {
          width: 19px;
          height: 19px;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }

        .nav-icon svg {
          width: 18px;
          height: 18px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.7;

          stroke-linecap: round;

          stroke-linejoin: round;

          transition:
            transform 0.3s ease;
        }

        .nav-label {
          max-width: 0;

          overflow: hidden;

          opacity: 0;

          white-space: nowrap;

          font-size: 10px;

          font-weight: 700;

          transition:
            max-width 0.3s ease,
            opacity 0.3s ease;
        }


        /* =====================================================
           ACTIVE
        ===================================================== */

        .nav-item.active {
          width: 101px;

          min-width: 101px;

          background:
            rgba(
              255,
              255,
              255,
              0.17
            );

          color: #ffffff;

          box-shadow:
            inset 0 1px
            rgba(
              255,
              255,
              255,
              0.08
            );
        }

        .nav-item.active .nav-label {
          max-width: 65px;

          opacity: 1;
        }


        /* =====================================================
           NAV HOVER
        ===================================================== */

        .nav-item:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.11
            );

          color: #ffffff;

          transform:
            translateY(-3px);
        }

        .nav-item:hover .nav-icon svg {
          transform:
            scale(1.12);
        }

        .nav-item:hover .nav-label {
          max-width: 80px;

          opacity: 1;
        }


        /* =====================================================
           CORNER
        ===================================================== */

        .mark {
          position: absolute;

          width: clamp(
            12px,
            1.4vw,
            20px
          );

          aspect-ratio: 1;

          opacity: 0.45;
        }

        .mark::before,
        .mark::after {
          content: "";

          position: absolute;

          background: #999999;
        }

        .mark::before {
          width: 100%;
          height: 1px;

          left: 0;
          top: 50%;
        }

        .mark::after {
          width: 1px;
          height: 100%;

          left: 50%;
          top: 0;
        }

        .mark.one {
          left: 4%;
          bottom: 4%;
        }

        .mark.two {
          right: 4%;
          bottom: 4%;
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .main {
            width: 95vw;
          }

          .grid {
            width: 72vw;
          }

          .timer {
            font-size:
              clamp(
                60px,
                14vw,
                160px
              );
          }

          .title {
            font-size:
              clamp(
                40px,
                7vw,
                70px
              );
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .portfolio {
            min-height: 100svh;
            height: 100svh;
          }


          /* GRID */

          .grid {
            width: 90vw;

            height: 90px;

            top: 11%;

            background-size:
              20px 20px;
          }

          .grid.bottom {
            bottom: 14%;
          }


          /* TIMER */

          .timer {
            font-size:
              clamp(
                48px,
                18vw,
                90px
              );

            letter-spacing: -4px;
          }


          /* TOP */

          .top-left,
          .top-right {
            top: 4%;

            font-size: 5px;

            letter-spacing: 1.5px;
          }

          .top-left {
            left: 5%;
          }

          .top-right {
            right: 5%;
          }


          /* HERO */

          .main {
            width: 100%;

            padding:
              15px 16px;
          }


          /* HELLO */

          .hello {
            margin-bottom: 14px;

            font-size: 11px;

            letter-spacing: 3.8px;
          }


          /* CATEGORY */

          .category {
            margin-bottom: 17px;

            font-size: 8px;

            letter-spacing: 3.2px;
          }


          /* TITLE */

          .title-row {
            gap: 6px;
          }

          .line {
            max-width: 34px;
          }

          .title {
            font-size:
              clamp(
                31px,
                9.5vw,
                46px
              );

            letter-spacing: 0.8px;
          }


          /* BUTTONS */

          .buttons {
            margin-top: 21px;

            gap: 7px;
          }

          .button {
            min-width: 91px;

            height: 30px;

            padding: 0 9px;

            font-size: 6.5px;
          }


          /* BOTTOM */

          .bottom {
            display: none;
          }


          /* NAV */

          .bottom-nav {
            bottom: 12px;

            min-height: 49px;

            padding: 4px;

            max-width:
              calc(100vw - 20px);
          }

          .nav-item {
            width: 43px;

            min-width: 43px;

            height: 39px;

            padding: 0;

            gap: 6px;
          }

          .nav-item.active {
            width: 84px;

            min-width: 84px;

            padding: 0 11px;
          }

          .nav-icon {
            width: 18px;
            height: 18px;
          }

          .nav-icon svg {
            width: 17px;
            height: 17px;
          }

          .nav-item.active .nav-label {
            max-width: 53px;

            font-size: 9px;
          }


          /* CORNER */

          .mark {
            display: none;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 380px) {

          .top-left,
          .top-right {
            font-size: 4.5px;

            letter-spacing: 1px;
          }

          .timer {
            font-size: 45px;

            letter-spacing: -3px;
          }

          .hello {
            font-size: 10px;

            letter-spacing: 3px;
          }

          .category {
            font-size: 7px;

            letter-spacing: 2.5px;
          }

          .title-row {
            gap: 4px;
          }

          .line {
            max-width: 21px;
          }

          .title {
            font-size: 27px;

            letter-spacing: 0.5px;
          }

          .buttons {
            gap: 4px;

            margin-top: 18px;
          }

          .button {
            min-width: 80px;

            height: 27px;

            font-size: 5.5px;
          }

          .bottom-nav {
            bottom: 9px;

            max-width:
              calc(100vw - 12px);
          }

          .nav-item {
            width: 39px;

            min-width: 39px;
          }

          .nav-item.active {
            width: 77px;

            min-width: 77px;
          }

          .nav-item.active .nav-label {
            font-size: 8px;
          }

        }


        /* =====================================================
           LANDSCAPE MOBILE
        ===================================================== */

        @media (
          max-height: 500px
        ) and (
          max-width: 900px
        ) {

          .main {
            transform: scale(0.8);
          }

          .timer {
            font-size: 100px;
          }

          .grid {
            top: 2%;
            height: 65px;
          }

          .grid.bottom {
            bottom: 2%;
          }

          .bottom {
            display: none;
          }

          .bottom-nav {
            bottom: 7px;

            transform:
              translateX(-50%)
              scale(0.85);
          }

        }


        /* =====================================================
           LARGE SCREEN
        ===================================================== */

        @media (min-width: 1600px) {

          .main {
            width: min(
              1050px,
              70vw
            );
          }

          .hello {
            font-size: 20px;
          }

          .category {
            font-size: 15px;
          }

          .title {
            font-size: 88px;
          }

          .timer {
            font-size: 180px;
          }

        }


        /* =====================================================
           REDUCE MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

        }

      `}</style>

      {activeTab === "about" ? (
        <Profile active={activeTab} onNavigate={navigate} />
      ) : activeTab === "project" ? (
        <Project active={activeTab} onNavigate={navigate} />
      ) : activeTab === "achievement" ? (
        <Achievement active={activeTab} onNavigate={navigate} />
      ) : activeTab === "certification" ? (
        <Certification active={activeTab} onNavigate={navigate} />
      ) : (
      <main className="portfolio">

        {/* BACKGROUND */}

        <div className="grain" />

        <div className="light" />

        <div className="grid" />

        <div className="grid bottom" />


        {/* TOP */}

        <div className="top-left">
          WEB / MOBILE / AI ENGINEER
        </div>

        <div className="top-right">
          BUILD · LEARN · GROW
        </div>


        {/* TIMER */}

        <div className="timer-background">

          <div className="timer">
            {hours}:{minutes}:{seconds}
          </div>

        </div>


        {/* HERO */}

        <section className="main">

          <div className="hello">
            HELLO
          </div>

          <div className="category">
            JUNIOR DEVELOPER
          </div>


          <div className="title-row">

            <div className="line" />

            <h1 className="title">
              SAIFUL RIZAL
            </h1>

            <div className="line" />

          </div>


          <div className="buttons">

            <a
              href="#about"
              className="button primary"
              onClick={(e) => { e.preventDefault(); navigate("about"); }}
            >
              Tentang Saya
            </a>

            <a
              href="#cv"
              className="button"
              onClick={(e) => { e.preventDefault(); navigate("about"); }}
            >
              Lihat CV
            </a>

            <a
              href="#certification"
              className="button"
              onClick={(e) => { e.preventDefault(); navigate("certification"); }}
            >
              Certification
            </a>

          </div>

        </section>


        {/* BOTTOM */}

        <div className="bottom">

          <div className="bottom-line" />

          <span>
            LIFE IS AN EXPERIMENTATION
          </span>

          <div className="bottom-line" />

        </div>


        {/* NAVBAR */}

        <nav className="bottom-nav">

          {/* BERANDA */}

          <a
            href="#home"
            className={`nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navigate("home"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M3 10.8
                  L12 3
                  L21 10.8
                  V21
                  H14.5
                  V14.5
                  H9.5
                  V21
                  H3
                  Z
                " />

              </svg>

            </span>

            <span className="nav-label">
              Beranda
            </span>

          </a>


          {/* PROFIL */}

          <a
            href="#about"
            className={`nav-item ${activeTab === "about" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navigate("about"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="
                  M4 21
                  C4 16.8
                  7.5 14.5
                  12 14.5
                  C16.5 14.5
                  20 16.8
                  20 21
                " />

              </svg>

            </span>

            <span className="nav-label">
              Profil
            </span>

          </a>


          {/* PROJECT */}

          <a
            href="#project"
            className={`nav-item ${activeTab === "project" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navigate("project"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M3 6
                  H9
                  L11 8
                  H21
                  V19
                  H3
                  Z
                " />

                <path d="
                  M3 9
                  H21
                " />

              </svg>

            </span>

            <span className="nav-label">
              Project
            </span>

          </a>


          {/* ACHIEVEMENT */}

          <a
            href="#achievement"
            className={`nav-item ${activeTab === "achievement" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navigate("achievement"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M7 4
                  H17
                  V8
                  C17 11
                  15 13
                  12 14
                  C9 13
                  7 11
                  7 8
                  Z
                " />

                <path d="
                  M7 6
                  H4
                  V8
                  C4 10
                  5.5 11
                  8 11
                " />

                <path d="
                  M17 6
                  H20
                  V8
                  C20 10
                  18.5 11
                  16 11
                " />

                <path d="
                  M12 14
                  V18
                " />

                <path d="
                  M8 21
                  H16
                " />

              </svg>

            </span>

            <span className="nav-label">
              Achievement
            </span>

          </a>


          {/* CERTIFICATION */}

          <a
            href="#certification"
            className={`nav-item ${activeTab === "certification" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); navigate("certification"); }}
          >

            <span className="nav-icon">

              <svg viewBox="0 0 24 24">

                <path d="
                  M4 4
                  H10
                  C11 4
                  12 5
                  12 6
                  V20
                  C11 19
                  10 18.5
                  8 18.5
                  H4
                  Z
                " />

                <path d="
                  M20 4
                  H14
                  C13 4
                  12 5
                  12 6
                  V20
                  C13 19
                  14 18.5
                  16 18.5
                  H20
                  Z
                " />

              </svg>

            </span>

            <span className="nav-label">
              Certification
            </span>

          </a>

        </nav>


        {/* CORNER */}

        <div className="mark one" />

        <div className="mark two" />

      </main>
      )}
    </>
  );
}
