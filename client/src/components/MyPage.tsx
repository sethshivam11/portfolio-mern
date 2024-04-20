import React from "react";
import { Typography } from "@material-tailwind/react";
import { DialogWithForm } from "./DialogForm.tsx";
import { SimpleCard } from "./MessageCard.tsx";
import toast from "react-hot-toast";
import { Message } from "../App.tsx";

interface Props {
  isLoggedin: boolean;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
}

const MyPage = ({ isLoggedin, setLoggedin, setMessages, messages }: Props) => {
  const [password, setPassword] = React.useState("");
  const handleDelete = (messageId: string) => {
    if (messageId === "null") {
      return;
    }
    const toastLoading = toast.loading("Please wait...");
    fetch(`/api/delete?messageId=${messageId}&password=${password}`, {
      method: "DELETE",
    })
      .then((parsed) => parsed.json())
      .then((jsonData) => {
        if (jsonData.success) {
          setMessages((messages) =>
            messages.filter((message) => message._id !== messageId)
          );
          toast.success(jsonData.message, { id: toastLoading });
        } else {
          toast.error(jsonData.message, { id: toastLoading });
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong", { id: toastLoading });
        console.log(err);
      });
  };

  return (
    <section className="bg-black/95 scroll-smooth flex flex-col items-center justify-center min-h-screen w-full">
      <Typography
        placeholder=""
        className={`lg:text-5xl md:text-4xl text-3xl py-6 text-white ${
          isLoggedin ? "hidden" : ""
        }`}
      >
        Login to continue
      </Typography>
      <DialogWithForm
        isLoggedin={isLoggedin}
        setLoggedin={setLoggedin}
        setMessages={setMessages}
        toast={toast}
      />
      <div
        className={`w-full h-full min-h-screen ${isLoggedin ? "" : "hidden"}`}
      >
        <Typography
          placeholder=""
          className={`lg:text-5xl my-6 md:text-4xl text-3xl text-white block text-center ${
            isLoggedin ? "" : "hidden"
          }`}
        >
          All Messages
        </Typography>
        <div
          className={`w-full h-fit min-h-96 p-2 mb-2 flex flex-row flex-wrap items-start justify-around gap-2 ${
            isLoggedin ? "" : "hidden"
          }`}
        >
          {messages.length !== 0 ? (
            messages.map((msg, index) => {
              return (
                <SimpleCard
                  key={index}
                  name={msg.name}
                  email={msg.email}
                  phone={msg.phone}
                  message={msg.message}
                  _id={msg._id}
                  handleDelete={handleDelete}
                  password={password}
                  setPassword={setPassword}
                />
              );
            })
          ) : (
            <>
              <SimpleCard
                name="No Messages"
                email="N/A"
                phone="N/A"
                message="No messages since last update"
                _id="null"
                handleDelete={handleDelete}
                password={password}
                setPassword={setPassword}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyPage;
