import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
  currentValue?: number;
  handleValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
};

export interface VerticalSliderHandle {
  getDelta: () => number;
}

export const VerticalSlider = forwardRef<VerticalSliderHandle, Props>(
  ({ currentValue = 0, handleValue, min, max, step = 1 }: Props, ref) => {
    const prevValueRef = useRef(currentValue);

    useImperativeHandle(ref, () => ({
      getDelta() {
        const delta = currentValue - prevValueRef.current;
        prevValueRef.current = currentValue;
        return delta;
      },
    }));
    return (
      <input
        type="range"
        value={currentValue}
        onChange={handleValue}
        min={min}
        max={max}
        step={step}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 h-60 w-3 bg-gray-300 rounded-lg appearance-none"
        style={{ writingMode: "vertical-lr" }}
      ></input>
    );
  }
);

export default VerticalSlider;
