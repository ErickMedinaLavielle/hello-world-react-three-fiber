import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import "./App.css";

const Box = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setactive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  });

  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setactive(!active)}
      scale={props.scale}
    >
      <boxBufferGeometry attach="geometry" arcs={[1, 1, 1]} />
      <a.meshBasicMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

function App() {
  return (
    <Canvas>
      <Box></Box>
    </Canvas>
  );
}

export default App;