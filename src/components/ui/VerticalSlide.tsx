type Props = {
  currentValue?: number;
  handleValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
};

export default function VerticalSlide({
  currentValue,
  handleValue,
  min,
  max,
  step = 1,
}: Props) {
  console.log("min : ", min);
  console.log("max : ", max);

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
