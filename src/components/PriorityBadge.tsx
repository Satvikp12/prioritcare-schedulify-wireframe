
import { PriorityLevel, UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
  role?: UserRole | null;
  hideDetails?: boolean;
}

const PriorityBadge = ({ priority, className, role = null, hideDetails = false }: PriorityBadgeProps) => {
  // Choose more prominent colors for high priority
  const getLabel = () => {
    // Hide specific priority levels from patients (when hideDetails is true)
    if (hideDetails && role !== "admin" && role !== "doctor") {
      return "Priority Patient";
    }
    
    return priority === "high" ? "High Priority" : 
           priority === "medium" ? "Medium Priority" : "Low Priority";
  };
  
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
      {getLabel()}
    </span>
  );
};

export default PriorityBadge;
