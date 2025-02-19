import { Check } from "lucide-react";

type AccordionProps = {
  text: string;
  activeStep: number;
  setActiveStep: (step: number) => void;
  stepNumber: number;
  isOpen: boolean;
  content: JSX.Element;
  className?: string;
};

export const AccordionComponent = ({
  text,
  activeStep,
  stepNumber,
  setActiveStep,
  isOpen,
  content,
  className,
}: AccordionProps) => {
  const isCurrentStep = activeStep === stepNumber;
  const isStepCompleted = activeStep > stepNumber;
  const stepStyles = isStepCompleted
    ? "bg-green-500 text-black"
    : isCurrentStep
    ? "bg-black text-white"
    : "bg-gray-200 text-black";
  const textColor = isCurrentStep ? "text-black" : "text-gray-500";
  const maxHeightClass = isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0";

  return (
    <div className={`border rounded-sm mt-2 w-full ${isOpen ? "bg-gray-50" : "bg-white"} ${className}`}>
      <div className="flex items-center justify-between py-2.5 cursor-pointer transition duration-200">
        <div className={`flex items-center gap-x-2 px-2 lg:px-4 text-sm font-medium ${textColor}`}>
          <div className={`text-center w-6 h-6 py-0.5 rounded-sm ${stepStyles}`}>
            {isStepCompleted ? (
              <Check className="text-white size-5 pt-1 pl-1" />
            ) : (
              stepNumber
            )}
          </div>
          {text}
        </div>

        {isStepCompleted && (
          <button
            className="text-blue-800 underline text-sm mr-8 font-semibold"
            onClick={() => setActiveStep(stepNumber)}
          >
            Change
          </button>
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${maxHeightClass}`}>
        <div className={`${!isOpen && "hidden"} border-t-[1px] bg-white text-black`}>
          {content}
        </div>
      </div>
    </div>
  );
};

