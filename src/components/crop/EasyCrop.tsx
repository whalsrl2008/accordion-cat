import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

const CONTAINER_WIDTH = window.innerWidth;

type Props = {
  imageUrl: string;
  width: number;
  height: number;
  setCroppedAreaPixels: Area;
  cropShape: string;
};

export const ImageCropper = ({ imageUrl, width, height, cropShape }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = () => {
    (croppedArea: Area, croppedAreaPixels: Area) => {
      console.log(croppedArea, croppedAreaPixels);
    };
  };

  return (
    <div>
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        onMediaLoaded={(mediaSize) => {
          setZoom(CONTAINER_WIDTH / mediaSize.naturalWidth);
        }}
        disableAutomaticStylesInjection={true}
        classes={{
          containerClassName:
            "absolute flex w-full h-1/2 overflow-scroll select-none touch-none cursor-move justify-center items-center",
          mediaClassName:
            "max-w-full max-h-full m-auto absolute top-0 bottom-0 left-0 right-0",
          cropAreaClassName:
            "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white border-opacity-50 box-border shadow-huge overflow-hidden bg-rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
};
