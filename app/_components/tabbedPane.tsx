"use client";
import { useState, ViewTransition, startTransition } from "react";
import { JSX } from "react";

type tabType = "about" | "experience" | "education" | "languages";

export function TabbedPane() {
    const [currentTab, changeTab] = useState<tabType>("about");

    const newTab = (tab: tabType) => {
        startTransition(() => {
            changeTab(tab);
        });
    };

    return (
        <div>
            <ViewTransition name="contentParent">
                <div className="">
                    <button
                        className="before:gloss-effect rounded-b-none"
                        onClick={() => {
                            newTab("about");
                        }}
                        disabled={currentTab === "about"}
                    >
                        About
                    </button>
                    <button
                        className="before:gloss-effect rounded-b-none"
                        onClick={() => {
                            newTab("experience");
                        }}
                        disabled={currentTab === "experience"}
                    >
                        Experience
                    </button>
                    <button
                        className="before:gloss-effect rounded-b-none"
                        onClick={() => {
                            newTab("education");
                        }}
                        disabled={currentTab === "education"}
                    >
                        Education
                    </button>
                    <button
                        className="before:gloss-effect rounded-b-none"
                        onClick={() => {
                            newTab("languages");
                        }}
                        disabled={currentTab === "languages"}
                    >
                        Languages
                    </button>
                </div>

                <div className="light-gradient w-full p-5 rounded-2xl rounded-tl-none flex flex-row text-white">
                    {currentPane(currentTab)}
                </div>
            </ViewTransition>
        </div>
    );
}

function currentPane(currentTab: tabType) {
    let content: JSX.Element = <div></div>;
    switch (currentTab) {
        case "about":
            content = (
                <div>
                    <h3>About me!</h3> <br />
                    Hi, My name is Tony Cui, and currently, I am a student at
                    NYIT
                </div>
            );
            break;
        case "experience":
            content = <div>My experiences!</div>;
            break;
        case "education":
            content = <div>education</div>;
            break;
        case "languages":
            content = <div>languages</div>;
            break;
    }
    return <ViewTransition name="contentPane">{content}</ViewTransition>;
}
