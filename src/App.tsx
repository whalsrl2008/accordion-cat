import { Canvas } from "@react-three/fiber";
import {
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import {
  CameraIcon,
  ImageUpIcon,
  ImagesIcon,
  MenuIcon,
  Share2Icon,
} from "lucide-react";
import { useRef, useState } from "react";
import { Texture, TextureLoader, Vector2 } from "three";
import Experience from "./components/scene/Experience";
import Dialog from "./components/ui/Dialog";
// import Cropper from "react-easy-crop";

function App() {
  // States
  const [texture, setTexture] = useState<Texture | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isCropModalOpen, setCropModalOpen] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<
    string | ArrayBuffer | null
  >();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  // Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handler

  // const handleInputImageChange = (e) => {
  //   const reader = new FileReader();
  //   if (e.target.files[0]) {
  //     setCropModalOpen(true);
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = () => {
  //       setCroppedImage(reader.result);
  //     };
  //   }
  // };

  // const handleCropImage = async () => {
  //   try {
  //     const cropped = await getCroppedImg(croppedImage, croppedAreaPixels);
  //     const data = new FormData();
  //     data.append('background')
  //   };
  // }

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      const loader = new TextureLoader();

      loader.load(
        imageUrl,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error("Error loading texture : ", error);
        }
      );
    }
    setDialogOpen(false);
  };

  const EffectVar = new Vector2(0.01, 0.001);

  return (
    <main className="px-[240px]">
      <div className="text-3xl">Accordion-Cat</div>
      <Canvas
        className="canvas"
        ref={canvasRef}
        style={{ display: "relative", height: `500px` }}
      >
        <color attach="background" args={["white"]} />
        <Experience texture={texture} />
        <EffectComposer>
          <ChromaticAberration
            offset={EffectVar}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>

      {/* Input */}
      <input
        type="file"
        accept="img/*"
        className="hidden"
        ref={imageInputRef}
        onChange={handleImageInput}
      />

      {/* Dialog for image select */}
      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <h1 className="text-xl font-bold mb-4">Select Option</h1>
        <p>You can put your own image in album or take a new photo right now</p>
        <div className="pt-5 pb-2 flex flex-grow flex-auto justify-center items-center gap-2">
          <div
            onClick={() => imageInputRef.current?.click()}
            className="flex flex-col justify-center items-center w-full h-[160px] border rounded-xl"
          >
            <ImagesIcon size={80} />
            <p>Album</p>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-[160px] border rounded-xl">
            <CameraIcon size={80} />
            <p>Camera</p>
          </div>
        </div>
      </Dialog>

      <aside className="flex justify-center gap-1">
        <button onClick={() => console.log("menu")} className="p-2">
          <MenuIcon size={30} />
        </button>
        <button onClick={() => setDialogOpen(true)} className="p-2">
          <ImageUpIcon size={30} />
        </button>
        <button onClick={() => console.log("share")} className="p-2">
          <Share2Icon size={30} />
        </button>
      </aside>

      <Dialog isOpen={isCropModalOpen} onClose={() => setCropModalOpen(false)}>
        <div>hi</div>
      </Dialog>
    </main>
  );
}

export default App;
