
import { PriorityLevel } from "@/types";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  // Choose more prominent colors for high priority
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-red-200 text-red-900 border border-red-300 font-bold": priority === "high",
          "bg-yellow-100 text-yellow-800 border border-yellow-200": priority === "medium",
          "bg-green-100 text-green-800 border border-green-200": priority === "low",
        },
        className
      )}
    >
      {priority === "high" ? "High Priority" : 
       priority === "medium" ? "Medium Priority" : "Low Priority"}
    </span>
  );
};

export default PriorityBadge;
