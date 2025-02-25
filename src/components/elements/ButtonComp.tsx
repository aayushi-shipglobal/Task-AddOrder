import { Button } from "@/components/ui/button";

export const ButtonComp = () => {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        className="bg-blue-800 rounded-md text-sm px-4 py-2 font-medium text-white hover:bg-blue-800/95"
      >
        Continue
      </Button>
    </div>
  );
};
