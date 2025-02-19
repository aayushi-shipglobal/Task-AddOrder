import React from "react";
import { FormComponentProps, FormComponent } from "./FormComponent";

type WithValidationProps = {
  name: string;
  label?: string;
};

const withValidation = (WrappedComponent: React.ComponentType<FormComponentProps>) => {
  return ({  ...props }: FormComponentProps & WithValidationProps) => {
    return (
      <div>
        <WrappedComponent  {...props} />
      </div>
    );
  };
};

export const EnhancedFormComponent = withValidation(FormComponent);
