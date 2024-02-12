import "./App.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Hompage from "./components/Hompage.tsx";
import MyPage from "./components/MyPage.tsx";

export interface repo {
  homepage: string;
  name: string;
  description: string;
  html_url: string;
  image: string;
}

export interface message {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function App() {

  const [avatar, setAvatar] = useState<string>("");
  const [repos, setRepos] = useState<repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedin, setLoggedin] = useState(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState({
    name: "",
    phone: "",
    message: "",
    email: "",
  });
  const images: string[] = [
    "gadgetstore!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704454805/gadget-store/wanff6jdipyajbvr0ivy.png",
    "chatapp!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456419/gadget-store/coz0elqxhrucgsfefwf8.png",
    "cloudnotebook!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456418/gadget-store/zxbhft8dxwdwwcyiikf4.png",
    "moviesandtv!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1706461801/gadget-store/wtjjddmuatsxzvpbyjps.png",
    "2048!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456420/gadget-store/kfhxvzhotnfbukmb69hy.png",
    "copypaste!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456418/gadget-store/flolutsgg2ei8goxnslg.png",
    "grosery!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456425/gadget-store/ed7l6bcujfqy1cnaapt1.png",
    "myonline!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456424/gadget-store/lfbl4cvuvf92xtyz2vk0.png",
    "newsapp!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/dl8ytjgggiuwcnejk0ym.png",
    "robospeaker!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456912/gadget-store/vgchgwjhexbnut7duthn.png",
    "scholarship!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/kh0cum8cfkb4hwa6dg7l.png",
    "sda!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456889/gadget-store/tmafjkxcttnzqjnpdi93.png",
    "sudoku!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/sl8tmc385fkothhl8g0x.png",
    "weather!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1705748723/gadget-store/e2glyvsyxj5ad1t8m0w4.png",
    "gpt-clone!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707051362/gadget-store/fgkfhdy057qwcg3bpuar.png",
    "todo!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707051363/gadget-store/omkupcly4hprbbtbivql.png",
  ];
  const gitUrl: string = import.meta.env.VITE_GITHUB_URL;
  const getRepos = useCallback(() => {
    fetch(`${gitUrl}/repos`)
      .then((res) => res.json())
      .then((data) => {
        let mapData: repo[] = [];
        data.forEach((repository: repo) => {
          if (
            repository.name === "todo" ||
            repository.name === "gadgetstore" ||
            repository.name === "moviesandtv"
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
    if (
      !(
        message.name.length ||
        message.email.length ||
        message.message.length ||
        message.phone.length
      )
    )
      return;
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
          setMessage({ name: "", message: "", phone: "", email: "" });
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
