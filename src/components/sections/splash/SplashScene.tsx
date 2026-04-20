"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Invitation3D } from "./Invitation3D";
import { ScrollControls, useScroll } from "@react-three/drei";
import { Loader } from "lucide-react";

export default function SplashScene() {
  return (
    <section id="home" className="relative h-[400vh] w-full bg-cream">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="bg-transparent"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <spotLight
            position={[-10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.8}
          />
          
          <Suspense fallback={null}>
            <Invitation3D />
          </Suspense>
        </Canvas>

        {/* Scroll Prompt */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-champagne/60 z-10">
          <p className="text-xs uppercase tracking-[0.3em] font-sans">Scroll to Open</p>
          <div className="w-[1px] h-12 bg-champagne/30 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-champagne animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
