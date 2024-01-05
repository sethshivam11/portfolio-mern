import { Textarea } from "@material-tailwind/react";

interface Textarea {
  message: string;
}

export const TextareaDefault: React.FC<Textarea> = ({ message }) => {
  return (
    <div className="w-3/5 p-4">
      <Textarea label={message} />
    </div>
  );
};
