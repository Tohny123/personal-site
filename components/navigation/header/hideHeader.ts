"use client";
import { useEffect, useState } from 'react';

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<string | null>(null); //idealy the type would be just "down" "up" and null, but whatever
    /** Thanks to this for the header! https://www.codemzy.com/blog/react-sticky-header-disappear-scroll */

    const scrollUnit = 5;

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > scrollUnit || scrollY - lastScrollY < -scrollUnit)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener("scroll", updateScrollDirection); // add event listener
        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up
        }
    }, [scrollDirection]);

    return scrollDirection;
};

function useMousePos() {
    const [mousePos, setMousePos] = useState<number>(0);

    useEffect(() => {
        const updateMousePos = (e: MouseEvent) : void => {
            setMousePos(e.clientY)
        }
    window.addEventListener("mousemove", updateMousePos)
    
    return () => {
    window.removeEventListener("mousemove", updateMousePos)
    }
    }, [mousePos])
    return mousePos
}

export function HideHeader() : boolean {

    const scrollDirecton = useScrollDirection()
    const mousePos = useMousePos()
    return scrollDirecton === "down" && mousePos > 100;
}