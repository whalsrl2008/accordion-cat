import { useRef, useState } from "react";
import {
  CameraIcon,
  ImageUpIcon,
  ImagesIcon,
  MenuIcon,
  Share2Icon,
} from "lucide-react";
import Experience from "./Components/Experience";
import { Canvas } from "@react-three/fiber";
import Dialog from "./Components/Dialog";
import { Texture, TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";
// import Cropper from "react-easy-crop";

function App() {
  // States
  // const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [texture, setTexture] = useState<Texture | undefined>(undefined);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isCropModalOpen, setCropModalOpen] = useState<boolean>(false);
  // const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState<number>(1);

  // Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handler
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

  // const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();
  //   const file = e.target.files?.[0];
  //   if (file && file !== null) {
  //     setCropModalOpen(true);
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setImageSrc(reader.result);
  //     };
  //   }
  // };

  // const onCropComplete = (croppedArea, croppedAreaPixels) => {
  //   console.log(croppedArea, croppedAreaPixels);
  // };

  // Size
  // const windowHeight = window.innerHeight;

  return (
    <main className="px-[240px]">
      <div className="text-3xl">Accordion-Cat</div>
      <Canvas ref={canvasRef} style={{ display: "relative", height: `500px` }}>
        <OrbitControls />
        <Experience texture={texture} />
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
        {/* <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        /> */}
      </Dialog>
    </main>
  );
}

export default App;
