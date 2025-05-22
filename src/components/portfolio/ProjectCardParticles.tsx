import React from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

// Initialize tsParticles engine once outside the component
loadBasic(tsParticles).catch((error) => {
  console.error("Failed to load tsParticles basic engine:", error);
});

interface ProjectCardParticlesProps {
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCardParticles: React.FC<ProjectCardParticlesProps> = ({ className, style }) => {
  return (
    <Particles
      id={`tsparticles-card-${Math.random().toString(36).substring(7)}`}
      className={className}
      style={style}
      options={{
        autoPlay: true,
        background: {
          // color: { value: "#232741" },
          image: "url('http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1237px-NASA_logo.svg.png')",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "20%",
          opacity: 1,
        },
        fullScreen: { enable: false, zIndex: 0 },
        fpsLimit: 120,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: { enable: true, mode: "repulse" },
            onHover: { enable: true, mode: "bubble" },
            resize: { enable: true, delay: 0.5 },
          },
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              mix: false,
              opacity: 0,
              size: 0,
            },
            repulse: {
              distance: 400,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
            },
          },
        },
        particles: {
          bounce: {
            horizontal: { value: 1 },
            vertical: { value: 1 },
          },
          collisions: { enable: false, mode: "bounce" },
          color: { value: "#ffffff" },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "out" },
            random: false,
            speed: { min: 0.1, max: 1 },
            straight: false,
          },
          number: {
            density: { enable: true, width: 1920, height: 1080 },
            value: 160,
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 1,
              sync: false,
              startValue: "random",
              destroy: "none",
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        zLayers: 100,
        name: "NASA",
      }}
    />
  );
};

export default ProjectCardParticles;