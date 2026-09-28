import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Jura, Rubik, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/navigation/header/header";
import { Footer } from "../components/navigation/footer/footer";
import { Background } from "../components/background/background";
import { BackToTop } from "../components/navigation/backToTop/backToTop";

const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
});
const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
});
const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tony Cui's Website",
    description: "Welcome to my personal site!",
};

// TODO: uncomment non bg elements when done
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${jura.variable} ${rubik.variable} ${jetBrainsMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {/**accessibility button, hidden normally but usable via tab, nice to have :D */}
                <a
                    href="#main-content"
                    className=" z-200 absolute left-0 top-0 bg-blue-500 text-white py-2 px-4 transform -translate-y-full focus:translate-y-0 transition bounce-transition"
                >
                    Skip to main content
                </a>

                {/* <Background className='fixed w-full h-full -z-10' /> */}
                <div className="bg-[#7096d4] fixed w-screen h-screen -z-10" />
                {/*^^^^ TEMPORARY TODO CHANGE LATER */}
                <Header />
                <BackToTop />
                <div
                    className="flex flex-col flex-1 items-center justify-center font-sans "
                    id="main-content"
                >
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
