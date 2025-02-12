import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AccordionComponent from "./AccordionComponent";

export const StepAccordion = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { number: 1, label: "ConsignerDetails" },
    { number: 2, label: "Consignee Details" },
    { number: 3, label: "Shipment Information" },
    { number: 4, label: "Select Shipping Partner" },
  ];

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <Accordion type="single" collapsible key={step.number}>
          <AccordionItem value={`item-${step.number}`}>
            <AccordionTrigger>
              <div className="flex justify-between w-full">
                <AccordionComponent
                  text={step.label}
                  activeStep={activeStep}
                  stepNumber={step.number}
                  setActiveStep={setActiveStep}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
             
              <p>{step.label}</p>
              {activeStep === step.number && <step.component />}

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
