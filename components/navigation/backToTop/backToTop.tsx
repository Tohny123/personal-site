"use client";
import { PiArrowUp } from "react-icons/pi";
import { useState, useEffect } from "react";

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState<number>(0);

    useEffect(() => {
        const updateScrollPosition = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener("scroll", updateScrollPosition);

        return () => {
            window.removeEventListener("scroll", updateScrollPosition);
        };
    }, [scrollPosition]);

    return scrollPosition;
}

export function BackToTop() {
    return (
        <div className={`fixed right-0 m-10 z-100 bounce-transition duration-500 ${useScrollPosition() < 500 ?  "-bottom-25" : "bottom-0"} `}>
            <button
                onClick={scrollToTop}
                className="before:gloss-effect"
            >
                <PiArrowUp size={40} />
            </button>
        </div>
    );
}
