
import { PriorityLevel } from "@/types";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-red-100 text-red-800 border border-red-200": priority === "high",
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
