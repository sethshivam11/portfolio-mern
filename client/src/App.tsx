import "./App.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Hompage from "./components/Hompage.tsx";
import MyPage from "./components/MyPage.tsx";

export interface Repo {
  homepage: string;
  name: string;
  description: string;
  html_url: string;
  image: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

function App() {
  const [avatar, setAvatar] = useState<string>("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedin, setLoggedin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState({
    name: "",
    message: "",
    email: "",
  });

  const images = [
    "gadget-store!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524957/portfolio/chzs9wo4zdhekhzxlb6d.png",
    "campus-space!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1744524945/portfolio/rr97kg4geno54vfoo8od.png",
    "sociial!https://sociial.vercel.app/hero-light.png",
  ];

  const gitUrl: string = import.meta.env.VITE_GITHUB_URL;
  const getRepos = useCallback(() => {
    fetch(`${gitUrl}/repos`)
      .then((res) => res.json())
      .then((data) => {
        let mapData: Repo[] = [];
        data.forEach((repository: Repo) => {
          if (
            repository.name === "sociial" ||
            repository.name === "campus-space" ||
            repository.name === "gadget-store"
          ) {
            mapData.push(repository);
            let name: string = repository.name;
            images.forEach((link) => {
              if (link.includes(name)) {
                repository.image = link.split("!")[1];
              }
            });
          }
        });
        setRepos(mapData);
        setAvatar(data[0].owner.avatar_url);
      })
      .catch((err) => console.log(err));
  }, []);

  const inputChange = (e: ChangeEvent) => {
    let input = e.target as HTMLInputElement;
    e.preventDefault();
    setMessage({ ...message, [input.name]: input.value });
  };

  const saveMessage = async () => {
    setLoading(true);
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.message === "Message saved successfully") {
          setLoading(false);
          setMessage({ name: "", message: "", email: "" });
          toast.success("Message sent successfully");
        }
      })
      .catch((err) => {
        console.log(`Some Error Occured \n${err}`);
        setLoading(false);
        toast.error("Some error occured");
      });
  };

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route
          element={
            <Hompage
              avatar={avatar}
              inputChange={inputChange}
              saveMessage={saveMessage}
              loading={loading}
              repos={repos}
              message={message}
            />
          }
          path="/"
        />
        <Route
          element={
            <MyPage
              isLoggedin={isLoggedin}
              messages={messages}
              setLoggedin={setLoggedin}
              setMessages={setMessages}
            />
          }
          path="/me"
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
