import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, MeshStandardMaterial, SkinnedMesh } from "three";

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "src/assets/Rigging_test_2.glb"
  );
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions);
    // const animationA = mixer.clipAction(animations[0]);
    const animationB = mixer.clipAction(animations[1]);
    // animationA.play();
    animationB.play();
  }, []);

  const PaperGeo = (nodes.Paper as SkinnedMesh).geometry;
  const PaperMat = materials["Material.001"] as MeshStandardMaterial;
  const PaperBone = (nodes.Paper as SkinnedMesh).skeleton;

  return (
    <group ref={group} dispose={null} castShadow receiveShadow>
      <group name="Scene">
        <group name="Accordion_Armature" position={[0, 0, 0]}>
          <skinnedMesh
            name="Paper"
            geometry={PaperGeo}
            material={PaperMat}
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
  );
}

useGLTF.preload("src/assets/Rigging_test_2.glb");
