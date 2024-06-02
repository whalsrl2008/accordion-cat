import { Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group, Texture, Vector3 } from "three";
import Paper from "./Paper";

type Props = {
  texture?: Texture;
  progress?: number;
};

export default function Experience({ texture, progress }: Props) {
  // const cubeRef = useRef<Mesh>(null);

  // console.log(texture);
  const paperRef = useRef<Group>(null);

  const { camera } = useThree();

  const [isScaling, setIsScaling] = useState<boolean>(false);
  const [touchDistance, setTouchDistance] = useState<number>(0);
  const [touchDistanceDelta, setTouchDistanceDelta] = useState<number>(0);

  useEffect(() => {
    camera.position.set(0, 0, 2);
    camera.lookAt(paperRef.current?.position || new Vector3(0, 0, 0));
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      setIsScaling(true);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    // 두 손가락의 Touch 가 있을 때,
    if (isScaling) {
      // 두 손가락의 사이 거리는 distance
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      setTouchDistance(distance);
    }
  };

  const onTouchEnd = (e: TouchEvent) => {
    console.log(e);
    setIsScaling(false);
    setTouchDistance(0);
  };

  useEffect(() => {
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <Float>
      <Paper ref={paperRef} progress={progress ? progress : 0} />
    </Float>
  );
}
