"use client"; //im not sure this is the *best* but idk how else to call elements of the client
import { Button } from "../../ui/button/button";
import { HideHeader } from "./headerUtil";
import { PiHouse } from "react-icons/pi";
import { PiBookOpen } from "react-icons/pi";
import { PiHammer } from "react-icons/pi";
import { PiCaretDownBold } from "react-icons/pi";


export function Header() {
    const isHidden: boolean = HideHeader();
    //default consts of the header, and we adjust the offsets depending on scrollDirection
    const headerClass =
        "sticky z-100 " +
        "flex flex-col " +
        "flex items-center justify-start " +
        "bounce-transition " +
        (isHidden ? " -top-24" : " top-0");

    //show or hide the little down arrow
    return (
        <div className={headerClass}>
            <div className="flex flex-row items-center w-full shadow-xl bg-transparent backdrop-blur-md h-24 p-4">
                <div className="flex-auto ">
                    <Button Icon={PiHouse} text="Home" href="/" />
                </div>

                <div className="flex-auto flex flex-row justify-end gap-3">
                    {/* ?        <Button text='Hi2' /> */}
                    <Button Icon={PiBookOpen} text="Blog" href="/blog" />
                    <Button Icon={PiHammer} text="Projects" href="/projects" />

                    {/* <Button text='Hi3' /> */}
                </div>
            </div>
            <div
                className={`transition-all duration-250 text-white *:drop-shadow-xl mt-2 ${isHidden ? " opacity-100" : " opacity-0"}`}
            >
                <PiCaretDownBold />
            </div>
        </div>
    );
}
