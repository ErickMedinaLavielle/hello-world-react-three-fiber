import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";

import { useSpring, a } from "react-spring/three";
import "./App.css";

extend({ OrbitControls });

const SpaceShip = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load("../scene.gltf", setModel);
  }, []);
  console.log(model);
  return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <a.meshPhysicalMaterial attach="material" color={"white"} />
  </mesh>
);

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setactive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setactive(!active)}
      scale={props.scale}
      castShadow
    >
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
      <fog attach="fog" args={["black", 10, 25]} />
      <Controls />
      {/*<Box />*/}
      {/*<Plane />*/}
      <SpaceShip />
    </Canvas>
  );
}

export default App;
