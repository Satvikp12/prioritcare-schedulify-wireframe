import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PriorityLevel } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PriorityBadge from "@/components/PriorityBadge";

const formSchema = z.object({
  breathingDifficulty: z.enum(["none", "mild", "severe"]),
  painLevel: z.enum(["none", "mild", "moderate", "severe"]),
  mobilityIssue: z.enum(["none", "limited", "unable"]),
  chronicCondition: z.enum(["none", "controlled", "uncontrolled"]),
  recentHospitalization: z.enum(["no", "yes_over_month", "yes_under_month"]),
});

type FormValues = z.infer<typeof formSchema>;

interface PriorityAssessmentFormProps {
  onPriorityDetermined: (priority: PriorityLevel) => void;
}

const PriorityAssessmentForm = ({ onPriorityDetermined }: PriorityAssessmentFormProps) => {
  const { toast } = useToast();
  const [calculatedPriority, setCalculatedPriority] = useState<PriorityLevel | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      breathingDifficulty: "none",
      painLevel: "none",
      mobilityIssue: "none",
      chronicCondition: "none",
      recentHospitalization: "no",
    },
  });

  const calculatePriority = (data: FormValues): PriorityLevel => {
    let score = 0;
    
    if (data.breathingDifficulty === "severe") score += 5;
    else if (data.breathingDifficulty === "mild") score += 2;
    
    if (data.painLevel === "severe") score += 5;
    else if (data.painLevel === "moderate") score += 3;
    else if (data.painLevel === "mild") score += 1;
    
    if (data.mobilityIssue === "unable") score += 4;
    else if (data.mobilityIssue === "limited") score += 2;
    
    if (data.chronicCondition === "uncontrolled") score += 5;
    else if (data.chronicCondition === "controlled") score += 2;
    
    if (data.recentHospitalization === "yes_under_month") score += 5;
    else if (data.recentHospitalization === "yes_over_month") score += 2;
    
    if (score >= 10) return "high";
    else if (score >= 5) return "medium";
    else return "low";
  };
  
  const onSubmit = (data: FormValues) => {
    const priority = calculatePriority(data);
    setCalculatedPriority(priority);
    onPriorityDetermined(priority);
    
    toast({
      title: "Assessment Complete",
      description: `Based on your responses, your priority level is: ${priority === "high" ? "High" : priority === "medium" ? "Medium" : "Low"}`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Health Assessment</CardTitle>
        <CardDescription>
          Please answer these questions to help us determine your priority level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="breathingDifficulty"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Are you experiencing any breathing difficulties?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No difficulties</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mild" />
                        </FormControl>
                        <FormLabel className="font-normal">Some shortness of breath</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="severe" />
                        </FormControl>
                        <FormLabel className="font-normal">Significant trouble breathing</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="painLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How would you rate your pain level?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No pain</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mild" />
                        </FormControl>
                        <FormLabel className="font-normal">Mild pain</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="moderate" />
                        </FormControl>
                        <FormLabel className="font-normal">Moderate pain</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="severe" />
                        </FormControl>
                        <FormLabel className="font-normal">Severe pain</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobilityIssue"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you have any mobility issues?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No mobility issues</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="limited" />
                        </FormControl>
                        <FormLabel className="font-normal">Limited mobility</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unable" />
                        </FormControl>
                        <FormLabel className="font-normal">Unable to move without assistance</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chronicCondition"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you have any chronic medical conditions?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">No chronic conditions</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="controlled" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes, but well-controlled</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="uncontrolled" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes, poorly controlled</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recentHospitalization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Have you been hospitalized recently?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No recent hospitalization</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes_over_month" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes, more than a month ago</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes_under_month" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes, within the last month</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Complete Assessment</Button>
          </form>
        </Form>
      </CardContent>
      {calculatedPriority && (
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm font-medium">Your Assessed Priority Level:</p>
          <div className="mt-2">
            <PriorityBadge priority={calculatedPriority} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            This assessment helps us prioritize appointments based on medical needs. 
            The final priority may be adjusted by medical staff.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PriorityAssessmentForm;
