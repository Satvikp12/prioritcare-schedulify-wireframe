
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
        "priority-badge",
        {
          "priority-high": priority === "high",
          "priority-medium": priority === "medium",
          "priority-low": priority === "low",
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
