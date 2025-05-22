"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useThemeContext } from '@/contexts/ThemeContext';

const NUM_STAR_PARTICLES = 15000;
const NUM_SPIRAL_POINTS_MAIN = 20000;
const NUM_SPIRAL_POINTS_SECONDARY = 15000;

const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const { theme } = useThemeContext();

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const starFieldRef = useRef<THREE.Points | null>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  const spiral1Ref = useRef<THREE.Points | null>(null);
  const spiral1MaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const spiral2Ref = useRef<THREE.Points | null>(null);
  const spiral2MaterialRef = useRef<THREE.PointsMaterial | null>(null);

  const [currentThemeColors, setCurrentThemeColors] = useState({
    primary: new THREE.Color(0x0abfbc), // Default Vizioon Primary (Cyan-ish blue)
    secondary: new THREE.Color(0x93c5fd), // Default Vizioon Secondary (Lighter blue)
    foreground: new THREE.Color(theme === 'dark' ? 0xEBF4F1 : 0x1e293b), // Default Vizioon Foreground
  });

  const updateThemeColors = useCallback(() => {
    if (typeof document === 'undefined') return;
    const computedRootStyle = getComputedStyle(document.documentElement);
    
    const getHSLColor = (cssVar: string, fallbackHex: string | number) => {
      const hslString = computedRootStyle.getPropertyValue(cssVar).trim();
      if (hslString) {
        const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
        if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
          const color = new THREE.Color();
          color.setHSL(h / 360, s / 100, l / 100);
          return color;
        }
      }
      return new THREE.Color(fallbackHex);
    };
    
    setCurrentThemeColors({
      primary: getHSLColor('--primary', 0x0abfbc),
      secondary: getHSLColor('--secondary', 0x93c5fd),
      foreground: getHSLColor('--foreground', theme === 'dark' ? 0xEBF4F1 : 0x1e293b),
    });
  }, [theme]);

  useEffect(() => {
    updateThemeColors();
  }, [theme, updateThemeColors]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || typeof window === 'undefined') return;

    let canvasWidth = currentMount.clientWidth;
    let canvasHeight = currentMount.clientHeight;

    if (canvasWidth === 0 || canvasHeight === 0) {
      console.warn("ThreeCanvas: Mount point has zero dimensions. Setup deferred.");
      return;
    }
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 5; // As per user example
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear previous canvas if any
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    currentMount.appendChild(renderer.domElement);

    // --- Stars ---
    const starsGeometry = new THREE.BufferGeometry();
    starsMaterialRef.current = new THREE.PointsMaterial({
      size: 0.05, // As per user example
      transparent: true,
      opacity: 0.7 // Default opacity, color will be set by theme
    });
    const starsVertices: number[] = [];
    for (let i = 0; i < NUM_STAR_PARTICLES; i++) { // User example 15000-20000
      const x = (Math.random() - 0.5) * 30; // User example *20 or *30
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starFieldRef.current = new THREE.Points(starsGeometry, starsMaterialRef.current);
    scene.add(starFieldRef.current);

    // --- Spiral 1 (Primary Color) ---
    const spiralGeometry1 = new THREE.BufferGeometry();
    spiral1MaterialRef.current = new THREE.PointsMaterial({
      size: 0.08, // As per user example
      transparent: true,
      opacity: 0.6
    });
    const spiralPoints1: number[] = [];
    const a1 = 0.17; 
    const b1 = 0.1; 
    for (let i = 0; i < NUM_SPIRAL_POINTS_MAIN; i++) {
      const t = i * 0.01;
      const x = a1 * Math.exp(b1 * t) * Math.cos(t);
      const y = a1 * Math.exp(b1 * t) * Math.sin(t);
      const z = 0; // (i / NUM_SPIRAL_POINTS_MAIN - 0.5) * 5; // Make it 3D
      const jitter = (Math.random() - 0.5) * 0.015;
      spiralPoints1.push(x + jitter, y + jitter, z + jitter);
    }
    spiralGeometry1.setAttribute('position', new THREE.Float32BufferAttribute(spiralPoints1, 3));
    spiral1Ref.current = new THREE.Points(spiralGeometry1, spiral1MaterialRef.current);
    scene.add(spiral1Ref.current);

    // --- Spiral 2 (Secondary Color) ---
    const spiralGeometry2 = new THREE.BufferGeometry();
    spiral2MaterialRef.current = new THREE.PointsMaterial({
      size: 0.05, // As per user example
      transparent: true,
      opacity: 0.6
    });
    const spiralPoints2: number[] = [];
    // Using same a, b for consistency with example, but could vary
    for (let i = 0; i < NUM_SPIRAL_POINTS_SECONDARY; i++) {
      const t = i * 0.01;
      const x = a1 * Math.exp(b1 * t) * Math.cos(t + Math.PI); // Offset phase
      const y = a1 * Math.exp(b1 * t) * Math.sin(t + Math.PI);
      const z = 0; //(i / NUM_SPIRAL_POINTS_SECONDARY - 0.5) * 4; // Slightly different 3D spread
      const jitter = (Math.random() - 0.5) * 0.015;
      spiralPoints2.push(x + jitter, y + jitter, z + jitter);
    }
    spiralGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(spiralPoints2, 3));
    spiral2Ref.current = new THREE.Points(spiralGeometry2, spiral2MaterialRef.current);
    scene.add(spiral2Ref.current);

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const sf = starFieldRef.current;
      const sp1 = spiral1Ref.current;
      const sp2 = spiral2Ref.current;
      const rend = rendererRef.current;
      const sc = sceneRef.current;
      const cam = cameraRef.current;

      if (!rend || !sc || !cam) return;

      if (sf) {
        sf.rotation.y += 0.0002; // Slower star rotation from example: 0.0005
        sf.rotation.x += 0.0001;
      }
      if (sp1) {
        sp1.rotation.z += 0.001; // As per example
      }
      if (sp2) {
        sp2.rotation.z += 0.001; // As per example, could be opposite: -= 0.0007
      }
      
      rend.render(sc, cam);
    };

    animate();

    const handleResize = () => {
      const cam = cameraRef.current;
      const rend = rendererRef.current;
      const mount = mountRef.current;

      if (!mount || !cam || !rend) return;
      
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;

      if (newWidth > 0 && newHeight > 0) {
        cam.aspect = newWidth / newHeight;
        cam.updateProjectionMatrix();
        rend.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial call to set size
    setTimeout(handleResize, 0); 

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);

      starsGeometry?.dispose();
      starsMaterialRef.current?.dispose();
      spiralGeometry1?.dispose();
      spiral1MaterialRef.current?.dispose();
      spiralGeometry2?.dispose();
      spiral2MaterialRef.current?.dispose();

      if (rendererRef.current && currentMount && rendererRef.current.domElement.parentNode === currentMount) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      starFieldRef.current = null;
      starsMaterialRef.current = null;
      spiral1Ref.current = null;
      spiral1MaterialRef.current = null;
      spiral2Ref.current = null;
      spiral2MaterialRef.current = null;
    };
  }, []); // Removed dependencies that might cause re-renders, theme updates are handled by internal useEffect

  // This useEffect updates the material colors smoothly when currentThemeColors changes
  useEffect(() => {
    if (starsMaterialRef.current) {
      starsMaterialRef.current.color.set(currentThemeColors.foreground);
    }
    if (spiral1MaterialRef.current) {
      spiral1MaterialRef.current.color.set(currentThemeColors.primary);
    }
    if (spiral2MaterialRef.current) {
      spiral2MaterialRef.current.color.set(currentThemeColors.secondary);
    }
  }, [currentThemeColors]);

  return <div id="three-background-canvas" ref={mountRef} />;
};

export default ThreeCanvas;

    