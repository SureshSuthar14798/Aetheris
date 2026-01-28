
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  useScroll, 
  Float, 
  MeshDistortMaterial, 
  Stars, 
  Icosahedron, 
  Torus, 
  ContactShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { ViewState } from '../App';

// Fix: Define intrinsic elements as any-typed constants to bypass JSX.IntrinsicElements missing property errors
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;
const Group = 'group' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const InstancedMesh = 'instancedMesh' as any;
const BoxGeometry = 'boxGeometry' as any;

interface SceneProps {
  view: ViewState;
}

const Scene: React.FC<SceneProps> = ({ view }) => {
  const scroll = useScroll();
  const { viewport } = useThree();
  
  const mainObjectRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Determine scroll offset safely
    const offset = view === 'landing' ? (scroll ? scroll.offset : 0) : 0.5;
    
    if (mainObjectRef.current) {
      // Rotation logic
      const targetRotationY = view === 'landing' 
        ? offset * Math.PI * 4 
        : state.clock.elapsedTime * 0.1;
      
      mainObjectRef.current.rotation.y = THREE.MathUtils.lerp(mainObjectRef.current.rotation.y, targetRotationY, 0.05);
      mainObjectRef.current.rotation.x = THREE.MathUtils.lerp(mainObjectRef.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.5) * 0.2, 0.05);
      
      // Scaling
      let targetScale = 1;
      if (view === 'landing') {
        targetScale = 1 + Math.sin(offset * Math.PI) * 0.5;
      } else {
        targetScale = view === 'markets' ? 0.6 : 0.8;
      }
      mainObjectRef.current.scale.setScalar(THREE.MathUtils.lerp(mainObjectRef.current.scale.x, targetScale, 0.05));

      // Positioning
      let targetX = (state.mouse.x * viewport.width) / 10;
      let targetY = (state.mouse.y * viewport.height) / 10;
      let targetZ = 0;

      if (view !== 'landing') {
        targetX = view === 'markets' ? -viewport.width / 3 : viewport.width / 4; 
        targetY = 0;
        targetZ = -2;
      }

      mainObjectRef.current.position.x = THREE.MathUtils.lerp(mainObjectRef.current.position.x, targetX, 0.05);
      mainObjectRef.current.position.y = THREE.MathUtils.lerp(mainObjectRef.current.position.y, targetY, 0.05);
      mainObjectRef.current.position.z = THREE.MathUtils.lerp(mainObjectRef.current.position.z, targetZ, 0.05);
    }

    // Core pulsing
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.setScalar(pulse);
    }

    // Rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01;
    if (ring2Ref.current) ring2Ref.current.rotation.x += 0.005;

    // Camera
    const targetCamZ = view === 'landing' ? 5 + offset * 5 : 6;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <AmbientLight intensity={0.2} />
      <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <PointLight position={[-10, -10, -10]} color="cyan" intensity={2} />
      <PointLight position={[10, 5, 5]} color="magenta" intensity={2} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Group ref={mainObjectRef}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Icosahedron ref={coreRef} args={[1, 15]} scale={1}>
            <MeshDistortMaterial
              color="#22d3ee"
              roughness={0.1}
              metalness={0.8}
              distort={0.4}
              speed={2}
            />
          </Icosahedron>
        </Float>

        <Torus ref={ring1Ref} args={[1.8, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <MeshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
        </Torus>
        <Torus ref={ring2Ref} args={[2.2, 0.01, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
          <MeshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={1} />
        </Torus>

        <Debris count={view === 'landing' ? 40 : 20} />
      </Group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  );
};

const Debris = ({ count = 20 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      dummy.position.set(
        (xFactor + Math.cos(t / 10) * factor + (Math.sin(t * 1) * factor) / 10) / 15,
        (yFactor + Math.sin(t / 10) * factor + (Math.cos(t * 2) * factor) / 10) / 15,
        (zFactor + Math.cos(t / 10) * factor + (Math.sin(t * 3) * factor) / 10) / 15
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <InstancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <BoxGeometry args={[0.1, 0.1, 0.1]} />
      <MeshStandardMaterial color="#ffffff" metalness={0.8} roughness={0} />
    </InstancedMesh>
  );
};

export default Scene;
