import { useRef } from "react";
import { DoubleSide, Mesh, Texture } from "three";

type Props = {
  texture?: Texture;
};

export default function Experience({ texture }: Props) {
  const cubeRef = useRef<Mesh>(null);

  return (
    <>
      <mesh ref={cubeRef} scale={[1, 1, 1]}>
        <planeGeometry args={[2, 2]} />
        {texture && <meshBasicMaterial map={texture} side={DoubleSide} />}
      </mesh>
      <mesh position={[-3, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="cyan" />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
}
