import "./footer.css";
import githubIcon from './components/githubIcon.svg'
import linkedinIcon from './components/linkedinIcon.svg'
import mailIcon from "./components/mailIcon.svg"
import heartIcon from "./components/hearticon.svg"
import Image from "next/image";

/**linkedin and github icons are both from akar-icons, all other icons should be from google material icons */
//TODO: ideally i should render the svgs as NOT an <Image> element, bc that element is pretty limited, but that is for later

function linkElement(icon: string, alt: string, text: string, link: string, linkText: string) {
  const iconScale: number = 35;

  return (
    <div className="flex flex-row gap-4">
      {<Image
        className="invert"
        src={icon}
        alt={alt}
        width={iconScale}
        height={iconScale}
      />}
      <div className="flex flex-row gap-2 items-center">
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
        <Image className="invert" src={heartIcon} width={60} height={60} alt="Thank you! <3" />

      </div>
      <div className="col-span-3 p-2 text-white">
        <h3 className="font-bold">Where to find me!:</h3>
        <ul>
          <li>
            {linkElement(linkedinIcon, "LinkedIn", "LinkedIn:", "https://www.linkedin.com/in/tony-cui-729b3a326/", "linkedin.com/in/tony-cui-729b3a326/")}
          </li>
          <li>
            {linkElement(githubIcon, "Github", "Github:", "https://github.com/Tohny123", "github.com/Tohny123")}
          </li>
          <li>
            {linkElement(mailIcon, "Email", "Email:", "mailto:tcui3661@gmail.com", "tcui3661@gmail.com")}
          </li>
        </ul>
      </div>
    </footer>
  );
}
