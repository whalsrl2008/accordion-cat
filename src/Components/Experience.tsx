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
    </>
  );
}
