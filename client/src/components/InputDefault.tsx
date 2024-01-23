import { Input } from "@material-tailwind/react";
import { ChangeEventHandler } from "react";

interface InputDefault {
  name: string;
  onChange: ChangeEventHandler;
  value: string;
  title: string;
  autoComplete: string
}


export const InputDefault: React.FC<InputDefault> = ({ name, value, title,  autoComplete, onChange }) => {
  return (
    <div className="lg:w-3/5 md:w-4/5 sm:w-full py-2 px-4">
      <Input label={name} crossOrigin="" value={value} name={name.toLowerCase()} title={title} autoComplete={autoComplete} onChange={onChange}/>
    </div>
  );
};
