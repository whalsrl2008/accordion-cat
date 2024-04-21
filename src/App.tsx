import { useRef, useState } from "react";
import { CloudUploadIcon, MenuIcon, Share2Icon } from "lucide-react";
import Experience from "./Components/Experience";
import { Canvas } from "@react-three/fiber";

function App() {
  // States
  const [imageSrc, setImageSrc] = useState<string>("");

  // Refs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Size
  // const windowHeight = window.innerHeight;

  return (
    <main className="px-[240px]">
      <div className="text-3xl">Accordion-Cat</div>
      <Canvas ref={canvasRef} style={{ display: "relative", height: `500px` }}>
        <Experience />
      </Canvas>
      {/* Input */}
      <input
        type="file"
        accept="img/*"
        className="hidden"
        ref={imageInputRef}
      />

      <aside className="flex justify-center gap-1">
        <button onClick={() => console.log("menu")} className="p-2">
          <MenuIcon size={30} />
        </button>
        <button onClick={() => imageInputRef.current?.click()} className="p-2">
          <CloudUploadIcon size={30} />
        </button>
        <button onClick={() => console.log("share")} className="p-2">
          <Share2Icon size={30} />
        </button>
      </aside>
    </main>
  );
}

export default App;
