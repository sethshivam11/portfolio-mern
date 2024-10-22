import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

interface CardDefault {
  image: string;
  code: string;
  heading: string;
  details: string;
  visit: string;
}

export const CardDefault: React.FC<CardDefault> = ({
  image,
  code,
  heading,
  details,
  visit,
}) => {
  return (
    <Card className="lg:mt-6 lg:w-1/3 md:w-full md:my-2 sm:my-2 sm:w-full sm:mx-auto w-full mx-auto my-2  font-poppins" placeholder="">
      <CardHeader color="white" className="grid items-center relative h-fit" placeholder="">
        <img src={image} className="object-fill" alt="" />
      </CardHeader>
      <CardBody placeholder="">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 capitalize"
          placeholder=""
        >
          {heading}
        </Typography>
        <Typography placeholder="">{details}</Typography>
      </CardBody>
      <CardFooter className="pt-0" placeholder="">
        <Button placeholder="" className="mr-4 mt-2" onClick={() => window.open(visit, "_blank")}>
          Visit
        </Button>
        <Button
          className="mt-2"
          placeholder=""
          variant="outlined"
          onClick={() => window.open(code, "_blank")}
        >
          Code
        </Button>
      </CardFooter>
    </Card>
  );
};
