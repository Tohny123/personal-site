import { IconType } from "react-icons";
import Link from "next/link";

interface buttonTypes {
    Icon?: IconType;
    text?: string;
    href: string;
    disabled?: boolean;
}

export function Button({ Icon, text, href = "/", disabled }: buttonTypes) {
    return (
        <Link href={href}>
            <button
                className="button before:gloss-effect flex flex-row gap-3 items-center"
                aria-label={text}
                title={text}
                disabled = {disabled}
            >
                {Icon ? <Icon size={26} /> : " "}
                {text ? text : ""}
            </button>
        </Link>
    );
}
