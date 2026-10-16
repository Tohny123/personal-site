import { Button } from "@/components/ui/button/button";
import { PiArrowArcLeft } from "react-icons/pi";

export default function NotFound() {
    return (
        <div className="flex gap-3 flex-col">
            <h1>404 :(</h1>
            <p className="text-white">
                It seems like you are lost!, try heading back home!
            </p>
            <Button Icon={PiArrowArcLeft} text="Go Back" href="/" />
        </div>
    );
}
