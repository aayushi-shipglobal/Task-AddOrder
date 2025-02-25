import Box from "/box.jpg";

export const QuickTips = () => {
  return (
    <div>
      <p className="text-base font-semibold text-center mt-2">Quick Tips</p>
      <img src={Box} className="h-40 w-40 mx-16" />
      <p className="font-semibold text-sm mt-3">Dead Weight:</p>
      <div className="text-xs mt-3">
        <p>
          Dead/Dry weight or volumetric weight, whichever is higher, will be taken while calculating the freight rates.
        </p>
        <p className="mt-3">
          Fixed COD charge or COD % of the order value, whichever is higher, will be taken while calculating the COD
          fee.
        </p>
        <p className="mt-3">Above prices are exclusive of GST.</p>
        <p className="mt-3">
          The above pricing is subject to change based on fuel surcharges and courier company base rates.
        </p>
      </div>
      <p className="font-semibold text-sm mt-6">Volumetric Weight: (L X W X H / 5000)</p>
      <p className="mt-3 text-xs">
        Volumetric Weight (or DIM weight) is calculated based on the dimensions of the package.
      </p>
      <p className="mt-5 text-xs">
        The formula for calculating volumetric weight involves multiplying the length, width, and height of the package
        and then dividing by 5000.
      </p>
    </div>
  );
};
