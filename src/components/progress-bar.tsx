import { LinearProgress, LinearProgressProps } from "@mui/material";

type Props = LinearProgressProps & { value: number };

export default function ProgressBar({ value, ...props }: Props) {
  console.log(value, "value");

  return (
    <div className="flex items-center">
      <div className="w-full mr-1">
        <LinearProgress variant="determinate" {...props} value={value} />
      </div>
      <div className="min-w-[35px]">
        <p className="text-sm">{`${Math.round(value)}%`}</p>
      </div>
    </div>
  );
}
