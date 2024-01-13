import { Input } from "@material-tailwind/react";
import { ChangeEventHandler } from "react";

interface InputDefault {
  name: string;
  onChange: ChangeEventHandler;
  value: string;
}


export const InputDefault: React.FC<InputDefault> = ({ name, value, onChange }) => {
  return (
    <div className="w-3/5 py-2 px-4">
      <Input label={name} crossOrigin="" value={value} name={name.toLowerCase()} onChange={onChange}/>
    </div>
  );
};
