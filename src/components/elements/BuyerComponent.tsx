import { FormComponent } from "./FormComponent";

const withValidation = (WrappedComponent: any) => {
  return ({ form, ...props }: any) => {
    return (
      <div>
        <WrappedComponent {...props} form={form} />
      </div>
    );
  };
};

const EnhancedFormComponent = withValidation(FormComponent);

export const BuyerComponent = ({form}:{form:any}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
      <EnhancedFormComponent name="firstName" label="First Name" form={form}/>
      <EnhancedFormComponent name="lastName" label="Last Name" form={form}/>
      <EnhancedFormComponent name="mobileNo" label="Mobile No." form={form}/>
      <EnhancedFormComponent name="email" label="Email Id" form={form}/>
    </div>
  );
};
