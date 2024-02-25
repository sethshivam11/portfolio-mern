import { StickyNavbar } from "./Navbar";
import { Button, Typography, Tooltip } from "@material-tailwind/react";
import { InputDefault } from "./InputDefault";
import { TextareaDefault } from "./TextAreaDefault";
import { CardDefault } from "./CardDefault";
import react from "../assets/react.svg";
import js from "../assets/js.svg";
import mongo from "../assets/mongo.svg";
import node from "../assets/node.svg";
import express from "../assets/express.svg";
import github from "../assets/github.svg";
import React from "react";
import { message, repo } from "../App";
import Typewriter from "typewriter-effect"
import Footer from "./Footer";

interface Props {
    avatar: string,
    message: message,
    inputChange: (e: React.ChangeEvent) => void,
    saveMessage(): void,
    loading: boolean,
    repos: repo[],
    saveMessage(): void,
}


const Hompage = ({ avatar, message, inputChange, saveMessage, loading, repos }: Props) => {
    const home = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const skills = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const projects = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    const contact = React.useRef() as React.MutableRefObject<HTMLDivElement>;
    

    return (
        <section className="overflow-hidden relative scroll-smooth dark:bg-black/95 dark:text-gray-200 transition-colors duration-400">
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
                className="flex flex-col items-start justify-center h-screen py-32 w-screen border-solid border-b-2 border-gray-300 z-10 lg:p-20 p-6"
            >
                <Typography
                    placeholder=""
                    className="inline-block text-green-600/50 lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-normal font-inika py-1 lg:pt-12 md:pt-12"
                >
                    Hi I'm a
                </Typography>
                <div className="inline-block text-slate-950 lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-normal font-istok pb-2">
                    <Typewriter options={{
                        strings: [
                            "Web Developer",
                            "MERN Developer",
                            "Frontend Developer",
                            "Backend Developer",
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 100,
                        deleteSpeed: 100
                    }} />

                </div>
                <Typography
                    placeholder=""
                    className="lg:text-xl md:text-lg md:text-md sm:text-md text-justify text-slate-700 lg:w-2/5 md:w-3/5 sm:w-4/5 w-4/5 mr-2 font-poppins pt-4"
                >
                    Shivam Soni, a passionate developer. Currently, pursuing
                    Bachelor's in Computer Science from ARSD College, DU. Looking
                    for Internships to gain some industry practices and upgrade my
                    skills accordingly.
                </Typography>
                <Button
                    placeholder=""
                    className="rounded-lg font-poppins bg-white text-gray-800 lg:text-3xl md:text-2xl sm:text-xl text-xl ml-8 mt-10 lg:px-14 lg:py-6 ring-1 ring-gray-400 font-normal capitalize"
                    onClick={() => contact.current.scrollIntoView()}
                >
                    Connect
                </Button>
            </div>
            <div ref={skills} className="h-fit w-screen z-10 pt-10 p-6">
                <Typography
                    placeholder=""
                    className="text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-normal font-serif"
                >
                    Major Skills
                </Typography>
                <div className="grid md:grid-cols-6 grid-cols-3 place-content-center mt-10 lg:mx-10 mx-4 font-poppins">
                    <Tooltip content="ReactJS" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={react} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip content="JavaScript" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={js} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip content="ExpressJS" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={express} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip content="NodeJS" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={node} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip content="Git & Github" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={github} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip content="MongoDB" placement="bottom">
                        <div className="basis-24 lg:basis-44 md:basis-36">
                            <img className="contain" src={mongo} alt="" />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <Typography
                placeholder=""
                className="w-full pb-6 ml-6 text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-normal font-serif"
            >
                All Skills
            </Typography>
            <ul className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 place-content-center border-solid border-b-2 border-gray-300 md:px-20 sm:px-12 px-8 pb-4">
                <li>
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
                            className="ring-1 ring-orange-700 px-3 py-2 rounded-lg"
                        >
                            HTML
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-cyan-400 px-3 py-2 rounded-lg"
                        >
                            CSS
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-amber-300 px-3 py-2 rounded-lg"
                        >
                            JavaScript
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-sky-600 px-3 py-2 rounded-lg"
                        >
                            Tailwind CSS
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-blue-500 px-3 py-2 rounded-lg"
                        >
                            ReactJS
                        </Typography>
                    </ul>
                </li>

                <li>
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
                            className="ring-1 ring-green-300 px-3 py-2 rounded-lg"
                        >
                            NodeJS
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-gray-300 px-3 py-2 rounded-lg"
                        >
                            ExpressJS
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-blue-300 px-3 py-2 rounded-lg"
                        >
                            TypeScript
                        </Typography>
                    </ul>
                </li>

                <li>
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
                            className="ring-1 ring-green-500 px-3 py-2 rounded-lg"
                        >
                            MongoDB
                        </Typography>
                    </ul>
                </li>

                <li>
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
                            className="ring-1 ring-gray-500 px-3 py-2 rounded-lg"
                        >
                            Git & Github
                        </Typography>
                        <Typography
                            placeholder=""
                            as="li"
                            className="ring-1 ring-orange-300 px-3 py-2 rounded-lg"
                        >
                            Linux Commands
                        </Typography>
                    </ul>
                </li>
            </ul>
            <div ref={projects} className="p-6 w-screen">
                <Typography
                    placeholder=""
                    className="mt-10 pb-8 text-black lg:text-4xl lg:pl-10 md:pl-6 text-3xl font-serif"
                >
                    Projects
                </Typography>
                <div className="flex justify-center w-fit sm:flex-col sm:gap-2 flex-col md:flex-col md:gap-2 lg:flex-row gap-6 font-poppins">
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
                className="w-full h-fit lg:px-20 md:px-10 px-6 mt-8 py-8 border-t-2 border-solid border-gray-200 font-poppins bg-gray-200"
            >
                <Typography
                    placeholder=""
                    className="bg-transparent lg:text-4xl text-3xl font-serif pb-6 pl-4"
                >
                    Connect with me...
                </Typography>
                <InputDefault
                    name="Name"
                    value={message.name}
                    onChange={inputChange}
                    title="Name"
                    autoComplete="given-name"
                />
                <InputDefault
                    name="Phone"
                    value={message.phone}
                    onChange={inputChange}
                    title="Phone"
                    autoComplete="tel"
                />
                <InputDefault
                    name="Email"
                    value={message.email}
                    onChange={inputChange}
                    title="Email"
                    autoComplete="email"
                />
                <TextareaDefault
                    message="Message"
                    value={message.message}
                    onChange={inputChange}
                    title="Message"
                />
                <Button
                    placeholder=""
                    onClick={saveMessage}
                    loading={loading}
                    className="ml-4 capitalize"
                    size="lg"
                    disabled={
                        message.name.trim().length == 0 ||
                        message.phone.trim().length == 0 ||
                        message.message.trim().length == 0 ||
                        message.email.trim().length == 0
                    }
                >
                    Submit
                </Button>
            </div>
            <Footer />
        </section>
    )
}

export default Hompage