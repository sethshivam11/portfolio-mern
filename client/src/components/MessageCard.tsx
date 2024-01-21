import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Tooltip
} from "@material-tailwind/react";

export function SimpleCard({ email, phone, message, name }) {
  return (
    <Card
      placeholder=""
      className="mt-6 w-96 bg-transparent ring-1 ring-gray-400"
    >
      <CardBody placeholder="">
        <Typography placeholder="" variant="h5" color="white" className="mb-2">
          {name}
        </Typography>
        <Typography placeholder="" color="white">
          {message}
        </Typography>
      </CardBody>
      <CardFooter placeholder="" className="pt-0">
        <Tooltip
          content={phone}
          placement="top"
          className="bg-white text-black"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 5 },
          }}
        >
          <Button
            placeholder=""
            className="capitalize"
            color="white"
            fullWidth
            onClick={() => (window.location.href = `tel:${phone}`)}
          >
            Call
          </Button>
        </Tooltip>
        <Tooltip
          content={email}
          className="bg-white text-black"
          placement="bottom"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: -5 },
          }}
        >
          <Button
            placeholder=""
            className="capitalize mt-2"
            variant="outlined"
            color="white"
            fullWidth
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            Mail
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
