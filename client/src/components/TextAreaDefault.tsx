import { Textarea } from "@material-tailwind/react";
import { ChangeEventHandler } from "react";

interface Textarea {
  message: string;
  onChange: ChangeEventHandler;
  value: string;
}

export const TextareaDefault: React.FC<Textarea> = ({ value, message, onChange }) => {
  return (
    <div className="lg:w-3/5 md:w-4/5 sm:w-full p-4 pt-2">
      <Textarea
        label={message}
        value={value}
        name={message.toLowerCase()}
        onChange={onChange}
      />
    </div>
  );
};
