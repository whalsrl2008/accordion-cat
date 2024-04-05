import CropDemo from "./Components/Crop";

// 종이 애니메이션 베이킹 / Pinch 인터랙션 테스트
// 텍스쳐 변경 기능 테스트
// 사진찍기 / 사진첩 테스트
// Crop 기능 리서치 / 테스트
// 업로드
// 화면 캡쳐 -> GIF 되는 지 테스트

function App() {
  // Button 두 개 주기
  // Use Default / Use Photo

  // const imageInputRef = useRef<HTMLInputElement>(null);

  // const [texture, setTexture] = useState<Texture | undefined>(undefined);

  // const handleTextureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     const imageUrl = URL.createObjectURL(file);
  //     const loader = new TextureLoader();

  //     loader.load(
  //       imageUrl,
  //       (loadedTexture) => {
  //         setTexture(loadedTexture);
  //       },
  //       undefined,
  //       (error) => {
  //         console.error("Error loading texture : ", error);
  //       }
  //     );
  //   }
  // };

  return (
    <>
      <div className="text-3xl">hi</div>
      {/* <input
        type="file"
        onChange={handleTextureInput}
        ref={imageInputRef}
        className="absolute ml-auto z-100"
      />
      <button onClick={() => console.log(imageInputRef.current?.value)}>
        Check data
      </button> */}
      <CropDemo />
      {/* <Canvas className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <Experience texture={texture} />
      </Canvas> */}
    </>
  );
}

export default App;