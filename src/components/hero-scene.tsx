"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MOBILE_THRESHOLD = 768;
const PARTICLE_COUNT_DESKTOP = 300;
const PARTICLE_COUNT_MOBILE = 40;
const SHARD_COUNT = 10;

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < MOBILE_THRESHOLD;
}

function HeroParticles() {
  const count = isMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  const meshRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    (geo as any).userData = { velocities: vel };
    return geo;
  }, [count]);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const vel = (geometry as any).userData.velocities as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];
      const dx = mouse.x * 4 - pos[i * 3];
      const dy = mouse.y * 3 - pos[i * 3 + 1];
      pos[i * 3] += dx * 0.00005;
      pos[i * 3 + 1] += dy * 0.00005;
      if (Math.abs(pos[i * 3]) > 10) vel[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 10) vel[i * 3 + 1] *= -1;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.05} color="#D4AF37" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function FloatingShards() {
  const groupRef = useRef<THREE.Group>(null);
  const shards = useMemo(() => {
    return Array.from({ length: SHARD_COUNT }, () => {
      const geom = Math.random() > 0.5 ? new THREE.IcosahedronGeometry(0.1 + Math.random() * 0.2, 0) : new THREE.TetrahedronGeometry(0.1 + Math.random() * 0.2, 0);
      return {
        geometry: geom,
        position: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        speed: 0.002 + Math.random() * 0.005,
      };
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += shards[i].speed;
      child.rotation.y += shards[i].speed * 1.5;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation}>
          <primitive object={s.geometry} />
          <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.3 + Math.random() * 0.2} />
        </mesh>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(({ mouse }) => {
    targetRot.current.y = mouse.x * 0.03;
    targetRot.current.x = mouse.y * 0.02;
    camera.position.x += (targetRot.current.y - camera.position.x) * 0.03;
    camera.position.y += (-targetRot.current.x - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  if (isMobile()) return null;

  return (
    <div className="absolute inset-0 z-[1]">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <HeroParticles />
        <FloatingShards />
        <CameraController />
      </Canvas>
    </div>
  );
}
