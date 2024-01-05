type Props = {
  // setViewImage: Dispatch<SetStateAction<State>>;
  home: React.MutableRefObject<HTMLDivElement>;
  skills: React.MutableRefObject<HTMLDivElement>;
  projects: React.MutableRefObject<HTMLDivElement>;
  contact: React.MutableRefObject<HTMLDivElement>;
  avatar: string
};

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import logo from "../assets/logo.jpeg";

export function StickyNavbar({ home, skills, projects, contact, avatar }: Props) {
  // { setViewImage }: Props
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 w-full justify-evenly">
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        onClick={() => home.current.scrollIntoView()}
        className="p-1 font-normal text-xl cursor-pointer font-poppins"
      >
        Home
      </Typography>
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        onClick={() => skills.current.scrollIntoView()}
        className="p-1 font-normal text-xl cursor-pointer font-poppins"
      >
        Skills
      </Typography>
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        onClick={() => projects.current.scrollIntoView()}
        className="p-1 font-normal text-xl cursor-pointer font-poppins"
      >
        Projects
      </Typography>
      <Typography
        placeholder=""
        as="li"
        variant="small"
        color="blue-gray"
        onClick={() => contact.current.scrollIntoView()}
        className="p-1 font-normal text-xl cursor-pointer font-poppins"
      >
        Contact
      </Typography>
    </ul>
  );

  return (
    <div className="max-h-[768px] w-[calc(100%+48px)] overflow-scroll text-2xl">
      <Navbar
        placeholder=""
        className="fixed top-0 z-10 h-max max-w-full align-center rounded-none px-4 py-2 lg:px-8 lg:py-4 left-0"
      >
        <div className="flex items-center justify-start w-full text-blue-gray-900">
          <img className="rounded-full contain w-10 mr-2" src={avatar} alt="" />
          <Typography
            placeholder=""
            onClick={() => home.current.scrollIntoView()}
            className="mr-1 cursor-pointer py-1.5 font-medium text-xl"
          >
            Shivam
          </Typography>
          <div className="flex items-center gap-4 w-full">
            <div className="mr-4 hidden lg:block w-full">{navList}</div>
            {/* Mobile Navbar */}
            <IconButton
              placeholder=""
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
