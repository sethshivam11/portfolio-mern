import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Tooltip,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";

export function SimpleCard({
  email,
  phone,
  message,
  name,
  _id,
  handleDelete,
  password,
  setPassword,
}) {
  const [open, setOpen] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <Card
      placeholder=""
      className="w-full bg-transparent ring-1 ring-gray-400 max-w-96"
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
        <div className="flex items-center justify-center gap-2">
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
            placement="top"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: -5 },
            }}
          >
            <Button
              placeholder=""
              className="capitalize"
              variant="outlined"
              color="white"
              fullWidth
              onClick={() => (window.location.href = `mailto:${email}`)}
            >
              Mail
            </Button>
          </Tooltip>
        </div>
        <>
          <Button
            onClick={handleOpen}
            variant="text"
            size="md"
            color="red"
            placeholder=""
            className="mt-2 capitalize w-full"
            disabled={_id === "null"}
          >
            Delete
          </Button>
          <Dialog
            open={open}
            handler={handleOpen}
            placeholder=""
            className="bg-black/90 ring-2 ring-gray-500 text-white"
          >
            <DialogHeader placeholder="" className="text-gray-200">
              Delete Message
            </DialogHeader>
            <DialogBody placeholder="" className="text-gray-300">
              Are you sure you want to delete this message. This action cannot
              be undone. Please enter password to continue
              <div className="space-y-1 my-3">
                <Input
                  placeholder=""
                  autoComplete="off"
                  crossOrigin={1}
                  label="Password"
                  size="lg"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  name="password"
                  color="white"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="-ml-2.5 -mt-3">
                  <Checkbox
                    placeholder=""
                    crossOrigin={0}
                    label="Show Password"
                    onChange={() => setShowPwd((show) => !show)}
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter placeholder="">
              <Button
                variant="text"
                placeholder=""
                onClick={() => {
                  handleOpen();
                  setPassword("");
                  setShowPwd(false);
                }}
                className="mr-1 text-gray-200 hover:bg-gray-800"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={() => {
                  handleOpen();
                  setPassword("");
                  setShowPwd(false);
                  handleDelete(_id);
                }}
                placeholder=""
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </>
      </CardFooter>
    </Card>
  );
}
