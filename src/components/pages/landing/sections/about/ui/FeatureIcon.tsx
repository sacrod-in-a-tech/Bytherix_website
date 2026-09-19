import { CircleHelp, type LucideIcon } from "lucide-react";

interface FeatureIconProps {
  type?: LucideIcon;
  color: string;
}

export default function FeatureIcon({
  type: Icon = CircleHelp,
  color,
}: FeatureIconProps) {
  return (
    <Icon
      className="h-4 w-4 sm:h-5 sm:w-5"
      style={{ color }}
      strokeWidth={1.8}
    />
  );
}