import "./footer.css";
//Icons from https://react-icons.github.io/react-icons/ 
import { PiEnvelope } from "react-icons/pi";
import { PiLinkedinLogo } from "react-icons/pi";
import { PiGithubLogo } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";

import { IconType } from "react-icons";

function linkElement(Icon: IconType, text: string, link: string, linkText: string) {
  const iconScale: number = 35;

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-row gap-2 items-center">
        <Icon color="white" size={iconScale}/>
        {text} <a className="footer-link" href={link}>{linkText}</a>
      </div>
    </div>
  )
}


export function Footer() {
  return (
    <footer className="footer grid grid-cols-5 p-14 pb-25">
      <div className=" justify-center items-center col-span-2 px-25 flex flex-col gap-5">
        <h2 className="thanks-text text-center text-base/19 "> Thanks for stopping by! </h2>
        <PiHeart size={70} color="white" />
      </div>
      <div className="col-span-3 p-2 text-white">
        <h3 className="font-bold">Where to find me!:</h3>
        <ul>
          <li>
            {linkElement(PiLinkedinLogo, "LinkedIn:", "https://www.linkedin.com/in/tony-cui-729b3a326/", "linkedin.com/in/tony-cui-729b3a326/")}
          </li>
          <li>
            {linkElement(PiGithubLogo, "Github:", "https://github.com/Tohny123", "github.com/Tohny123")}
          </li>
          <li>
            {linkElement(PiEnvelope, "Email:", "mailto:tcui3661@gmail.com", "tcui3661@gmail.com")}
          </li>
        </ul>
      </div>
    </footer>
  );
}
