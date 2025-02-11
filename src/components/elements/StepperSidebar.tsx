type stepperProps={
  setActiveStep:any;
  activeStep:number;
}

export const StepperSidebar = ({ activeStep,setActiveStep}:stepperProps) => {

  const handleStep=(step:number)=>{
    setActiveStep(step);
  }
  return (
   
        <div className=" bg-white rounded-md lg:w-1/4  gap-x-2 flex lg:flex-col  items-center justify-center lg:pl-6 mb-4 px-6 lg:px-0">
        <div className="md:justify-center lg:mr-7 flex flex-col lg:flex-row items-center lg:ml-0 my-6 cursor-pointer" onClick={()=>handleStep(1)} >
          
          <p className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-md text-white text-xs md:text-base text-center lg:font-semibold pt-1 mb-1">1</p>
          <p className="lg:ml-3 text-xs md:text-base font-medium text-center">Buyer Details</p>
         
        </div>
        <div className="justify-center lg:mr-7 flex flex-col lg:flex-row items-center ml-6 lg:ml-0 my-6 cursor-pointer" onClick={()=>handleStep(2)} >
          <p className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-md text-white text-xs md:text-base text-center lg:font-semibold pt-1 mb-1">2</p>
          <p className="lg:ml-3 text-xs md:text-base font-medium text-center">Order Details</p>
        </div>
        <div className="justify-center flex flex-col lg:flex-row items-center ml-6  lg:ml-2 lg:mr-2 my-6 cursor-pointer"  onClick={()=>handleStep(3)}> 
          <p className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-md text-white text-xs md:text-base text-center lg:font-semibold pt-1 mb-1">3</p>
          <p className="lg:ml-3 text-xs md:text-base font-medium text-center">Shipping Partner</p>
        </div>
        <div className="justify-center lg:mr-7 flex flex-col lg:flex-row items-center ml-6 lg:-ml-2 my-6 cursor-pointer" onClick={()=>handleStep(4)}>
          <p className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-md text-white text-xs md:text-base text-center lg:font-semibold pt-1 mb-1">4</p>
          <p className="lg:ml-3 text-xs md:text-base font-medium text-center">Place Order</p>
        </div>
      </div>
    
  )
}

