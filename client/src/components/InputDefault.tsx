import { Input } from "@material-tailwind/react";

interface InputDefault {
  name: string;
}


export const InputDefault: React.FC<InputDefault> = ({ name }) => {
  return (
    <div className="w-3/5 pt-10 px-4">
      <Input label={name} crossOrigin="" />
    </div>
  );
};
