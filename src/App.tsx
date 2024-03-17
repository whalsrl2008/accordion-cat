import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { Canvas } from "@react-three/fiber";

function App() {
  // Landing Page 짜기
  // Three.js 씬 구성
  // 종이 애니메이션 베이킹 / Pinch 인터랙션 테스트
  // 텍스쳐 변경 기능 테스트
  // 사진찍기 / 사진첩 테스트
  // Crop 기능 리서치 / 테스트
  // 업로드
  // 화면 캡쳐 -> GIF 되는 지 테스트
  return (
    <Canvas className="overflow-hidden top-0 left-0 w-full h-full fixed">
      <OrbitControls />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
}

export default App;
