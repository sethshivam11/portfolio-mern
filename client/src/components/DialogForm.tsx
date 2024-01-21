import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

interface resData {
  success: Boolean;
  msg: Array<Object>;
  message: string;
}

export function DialogWithForm({ isLoggedin, setLoggedin, setMessages, toast }) {
  const [creds, setCreds] = React.useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };
  const handleSubmit = () => {
    fetch("/api/messages", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((res) => res.json())
      .then((resData: resData) => {
        if (resData.success) {
          setMessages(resData.msg);
          setOpen((cur) => !cur);
          setLoggedin(true);
          toast.success("Logged in successfully")
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen((cur) => !cur);
        toast.error("Something went wrong!")
      });
  };

  return (
    <>
      <Button
        placeholder=""
        size="lg"
        color="white"
        className={`m-4 capitalize text-xl ${isLoggedin ? "hidden" : ""}`}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Dialog
        placeholder=""
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card
          placeholder=""
          className="mx-auto w-full max-w-[24rem] bg-transparent ring-1 ring-white"
        >
          <CardBody placeholder="" className="flex flex-col gap-4">
            <Typography placeholder="" variant="h4" color="white">
              Login
            </Typography>
            <Typography
              placeholder=""
              className="mb-3 font-normal"
              variant="paragraph"
              color="white"
            >
              Enter your username and password to login.
            </Typography>
            <Typography
              placeholder=""
              className="-mb-2"
              variant="h6"
              color="white"
            >
              Username
            </Typography>
            <Input
              placeholder=""
              autoComplete="off"
              crossOrigin={1}
              label="Username"
              size="lg"
              type="text"
              value={creds.username}
              name="username"
              color="white"
              onChange={(e) =>
                setCreds({ ...creds, [e.target.name]: e.target.value })
              }
            />
            <Typography
              placeholder=""
              className="-mb-2"
              variant="h6"
              color="white"
            >
              Password
            </Typography>
            <Input
              placeholder=""
              crossOrigin={1}
              label="Password"
              autoComplete="off"
              size="lg"
              type={showPassword ? "text" : "password"}
              value={creds.password}
              name="password"
              color="white"
              onChange={(e) =>
                setCreds({ ...creds, [e.target.name]: e.target.value })
              }
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox
                placeholder=""
                crossOrigin={0}
                label="Show Password"
                onChange={() => setShowPassword((show) => !show)}
              />
            </div>
          </CardBody>
          <CardFooter placeholder="" className="pt-0">
            <Button
              placeholder=""
              variant="gradient"
              color="white"
              onClick={handleSubmit}
              fullWidth
              disabled={creds.username.length < 1 || creds.password.length < 1}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
