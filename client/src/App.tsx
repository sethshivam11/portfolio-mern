import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { StickyNavbar } from "./components/Navbar.tsx";
import react from "./assets/react.svg";
import js from "./assets/js.svg";
import mongo from "./assets/mongo.svg";
import node from "./assets/node.svg";
import express from "./assets/express.svg";
import github from "./assets/github.svg";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { CardDefault } from "./components/CardDefault.tsx";
import { InputDefault } from "./components/InputDefault.tsx";
import { TextareaDefault } from "./components/TextAreaDefault.tsx";
import Typewriter from "typewriter-effect/dist/core";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

interface repo {
  homepage: string;
  name: string;
  description: string;
  html_url: string;
  image: string;
}

function App() {
  const writeText = useRef() as React.MutableRefObject<HTMLDivElement>;
  const home = useRef() as React.MutableRefObject<HTMLDivElement>;
  const skills = useRef() as React.MutableRefObject<HTMLDivElement>;
  const projects = useRef() as React.MutableRefObject<HTMLDivElement>;
  const contact = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [avatar, setAvatar] = useState<string>("");
  const [repos, setRepos] = useState<repo[]>([]);
  const [loading, setLoading] = useState(false);
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
    "moviesandtv!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/zoyi2vcglcrtm2svtsvc.png",
    "2048!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456420/gadget-store/kfhxvzhotnfbukmb69hy.png",
    "copypaste!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456418/gadget-store/flolutsgg2ei8goxnslg.png",
    "grosery!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456425/gadget-store/ed7l6bcujfqy1cnaapt1.png",
    "myonline!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456424/gadget-store/lfbl4cvuvf92xtyz2vk0.png",
    "newsapp!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/dl8ytjgggiuwcnejk0ym.png",
    "robospeaker!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456912/gadget-store/vgchgwjhexbnut7duthn.png",
    "scholarship!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/kh0cum8cfkb4hwa6dg7l.png",
    "sda!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456889/gadget-store/tmafjkxcttnzqjnpdi93.png",
    "sudoku!https://res.cloudinary.com/dv3qbj0bn/image/upload/v1704456421/gadget-store/sl8tmc385fkothhl8g0x.png",
    "weather!http://res.cloudinary.com/dv3qbj0bn/image/upload/v1705748723/gadget-store/e2glyvsyxj5ad1t8m0w4.png",
  ];
  const gitUrl: string = import.meta.env.VITE_GITHUB_URL;
  const getRepos = useCallback(() => {
    fetch(`${gitUrl}/repos`)
      .then((res) => res.json())
      .then((data) => {
        let mapData: repo[] = [];
        data.forEach((repository: repo) => {
          if (
            repository.name === "gadgetstore" ||
            repository.name === "moviesandtv" ||
            repository.name === "weather"
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
    new Typewriter(writeText.current, {
      strings: [
        "Web Developer",
        "MERN Developer",
        "Frontend Developer",
        "Backend Developer",
      ],
      autoStart: true,
      loop: true,
      delay: 100,
      deleteSpeed: 100,
    });
    getRepos();
  }, [getRepos]);

  return (
    <section className="overflow-hidden relative scroll-smooth">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="ellipse-red" />
      <div className="ellipse-green" />
      <StickyNavbar
        avatar={avatar}
        home={home}
        skills={skills}
        projects={projects}
        contact={contact}
      />
      <div
        ref={home}
        className="flex flex-col items-start justify-center h-fit py-32 w-screen z-10 border-solid border-b-2 border-gray-300 z-10 lg:p-20 p-6"
      >
        <Typography
          placeholder=""
          className="inline-block text-[#54877BB9] lg:text-5xl md:text-4xl sm:text-3xl  text-3xl font-normal font-inika py-1"
        >
          Hi I'm a
        </Typography>
        <Typography
          placeholder=""
          ref={writeText}
          className="inline-block text-gray-900 lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-normal font-istok pb-2"
        >
          Web Developer
        </Typography>
        <Typography
          placeholder=""
          className="lg:text-xl md:text-lg md:text-md sm:text-md text-justify lg:w-2/5 md:w-3/5 sm:w-4/5 w-4/5 mr-2 font-poppins pt-4"
        >
          Shivam Soni, an passionate developer. Currently, pursuing my
          Bachelor's in Computer Science from Atma Ram Sanatan Dharma College.
          Looking for Internships to gain some industry practices and upgrade my
          skills accordingly.
        </Typography>
        <Button
          placeholder=""
          className="rounded-lg font-poppins bg-white text-gray-800 lg:text-3xl md:text-2xl sm:text-xl text-xl ml-8 mt-10 lg:px-14 lg:py-6 border-solid border-2 border-gray-400 font-normal capitalize"
          onClick={() => contact.current.scrollIntoView()}
        >
          Connect
        </Button>
      </div>
      <div ref={skills} className="h-fit w-screen z-10 pt-10 p-6">
        <Typography
          placeholder=""
          className="mx-auto text-black lg:text-4xl text-3xl font-normal font-serif"
        >
          Major Skills
        </Typography>
        <div className="flex flex-row flex-wrap justify-center align-center mt-10 lg:mx-10 mx-4 font-poppins">
          <Tooltip content="ReactJS" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={react} alt="" />
            </div>
          </Tooltip>
          <Tooltip content="JavaScript" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={js} alt="" />
            </div>
          </Tooltip>
          <Tooltip content="ExpressJS" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={express} alt="" />
            </div>
          </Tooltip>
          <Tooltip content="NodeJS" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={node} alt="" />
            </div>
          </Tooltip>
          <Tooltip content="Git & Github" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={github} alt="" />
            </div>
          </Tooltip>
          <Tooltip content="MongoDB" placement="bottom">
            <div className="basis-44 p-4 m-1">
              <img className="contain" src={mongo} alt="" />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-evenly pt-10 pb-4 border-solid border-b-2 border-gray-300 p-6">
        <Typography
          placeholder=""
          className="w-full pb-6 text-black lg:text-4xl text-3xl font-normal font-serif"
        >
          All Skills
        </Typography>
        <div className="w-1/4 pb-8 basis-40">
          <Typography
            placeholder=""
            className="text-black text-2xl font-poppins py-4"
          >
            Frontend
          </Typography>
          <ul className="flex flex-row flex-wrap gap-4">
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-orange-700 px-3 py-2 rounded-lg"
            >
              HTML
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-cyan-400 px-3 py-2 rounded-lg"
            >
              CSS
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-amber-300 px-3 py-2 rounded-lg"
            >
              JavaScript
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-blue-500 px-3 py-2 rounded-lg"
            >
              ReactJS
            </Typography>
          </ul>
        </div>

        <div className="w-1/4 pb-8 basis-40">
          <Typography
            placeholder=""
            className="pt-4 text-black text-2xl font-poppins py-4"
          >
            Backend
          </Typography>
          <ul className="flex flex-row flex-wrap gap-4">
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-green-300 px-3 py-2 rounded-lg"
            >
              NodeJS
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-gray-300 px-3 py-2 rounded-lg"
            >
              ExpressJS
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-blue-300 px-3 py-2 rounded-lg"
            >
              TypeScript
            </Typography>
          </ul>
        </div>

        <div className="w-1/4 pb-8 basis-40">
          <Typography
            placeholder=""
            className="pt-4 text-black text-2xl font-poppins py-4"
          >
            Database
          </Typography>
          <ul className="flex flex-row flex-wrap gap-4">
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-green-500 px-3 py-2 rounded-lg"
            >
              MongoDB
            </Typography>
          </ul>
        </div>
        <div className="w-1/4 pb-8 basis-40 ">
          <Typography
            placeholder=""
            className="pt-4 text-black text-2xl font-poppins py-4"
          >
            Others
          </Typography>
          <ul className="flex flex-row flex-wrap gap-4">
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-gray-500 px-3 py-2 rounded-lg"
            >
              Git & Github
            </Typography>
            <Typography
              placeholder=""
              as="li"
              className="border-solid border-2 border-orange-300 px-3 py-2 rounded-lg"
            >
              Linux Commands
            </Typography>
          </ul>
        </div>
      </div>
      <div ref={projects} className="p-6 w-screen">
        <Typography
          placeholder=""
          className="mt-10 pb-8 text-black lg:text-4xl text-3xl font-serif"
        >
          Projects
        </Typography>
        <div className="flex justify-center w-screen sm:flex-col sm:gap-2 flex-col md:flex-col md:gap-2 lg:flex-row gap-6 font-poppins">
          {repos.map((repo) => {
            return (
              <CardDefault
                key={repo.name}
                image={repo.image}
                heading={repo.name}
                details={repo.description}
                visit={repo.homepage}
                code={repo.html_url}
              />
            );
          })}
        </div>
      </div>
      <div
        ref={contact}
        className="w-full h-fit px-20 my-8 py-8 border-t-2 border-solid border-gray-200 font-poppins"
      >
        <Typography
          placeholder=""
          className="bg-white text-4xl font-serif pb-6"
        >
          Connect with me...
        </Typography>
        <InputDefault name="Name" value={message.name} onChange={inputChange} />
        <InputDefault
          name="Phone"
          value={message.phone}
          onChange={inputChange}
        />
        <InputDefault
          name="Email"
          value={message.email}
          onChange={inputChange}
        />
        <TextareaDefault
          message="Message"
          value={message.message}
          onChange={inputChange}
        />
        <Button
          placeholder=""
          onClick={saveMessage}
          loading={loading}
          className="ml-4 capitalize"
          size="lg"
          disabled={
            message.name.length == 0 ||
            message.phone.length == 0 ||
            message.message.length == 0 ||
            message.email.length == 0
          }
        >
          Submit
        </Button>
      </div>
    </section>
  );
}
export default App;
