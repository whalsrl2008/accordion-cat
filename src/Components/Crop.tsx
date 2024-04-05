import { useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";

// type Props = {
//   src: string | undefined;
// }

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function CropDemo() {
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const [aspect, setAspect] = useState<number | undefined>(16/9);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const imageRef = useRef<HTMLImageElement>(null);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),)
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const {width, height} = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  console.log(imgSrc);

  return (
    <div className="flex">
      <input type="file" accept="image/*" onChange={handleFileInput} />
      {!!imgSrc && (
        <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)} minHeight={100} aspect={16/9}>
          <img ref={imageRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad}/>
        </ReactCrop>
      )}
    </div>
   
  )
}