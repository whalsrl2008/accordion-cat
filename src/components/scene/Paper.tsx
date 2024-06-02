import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import {
  DoubleSide,
  Group,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SkinnedMesh,
} from "three";

type PaperProps = {};

const Paper = React.forwardRef<Group, PaperProps>((props, forwardedRef) => {
  // GroupRef For Playing Animation
  const group = useRef<Group>(null);

  // Model Load
  const { nodes, materials, animations } = useGLTF(
    "src/assets/Rigging_test_2.glb"
  );

  // Animations
  const { actions, mixer } = useAnimations(animations, group);

  // Play when Mounted
  useEffect(() => {
    console.log(actions);
    const animationB = mixer.clipAction(animations[1]);
    animationB.play();
  }, []);

  // Geo, Mat, Bone Type
  const PaperGeo = (nodes.Paper as SkinnedMesh).geometry;
  const PaperMat = materials["Material.001"] as MeshStandardMaterial;
  const PaperBone = (nodes.Paper as SkinnedMesh).skeleton;

  const newPaperMat = new MeshBasicMaterial({
    map: PaperMat.map,
    side: DoubleSide,
  });

  return (
    <group ref={forwardedRef}>
      <group ref={group} dispose={null} castShadow receiveShadow>
        <group name="Scene">
          <group name="Accordion_Armature" position={[0, 0, 0]}>
            <skinnedMesh
              name="Paper"
              geometry={PaperGeo}
              material={newPaperMat}
              skeleton={PaperBone}
            />
            <primitive object={nodes.Middle_Holder} />
            <primitive object={nodes.Top_IK} />
            <primitive object={nodes.Bottom_IK} />
            <primitive object={nodes.Tail_Top} />
            <primitive object={nodes.Tail_Bottom} />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("src/assets/Rigging_test_2.glb");

export default Paper;
