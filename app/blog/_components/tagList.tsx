function tagElement(tagName: string) {
    return (
        <div
            className="rounded-full bg-amber-500 px-[3%] py-[1%] font-normal drop-shadow-xl before:gloss-effect"
            key={tagName}
        >
            <h4>{tagName}</h4>
        </div>
    );
}

export function tagList(tagArr?: string[]) {
    if (!tagArr) {
        return null;
    }

    return (
        <div className="flex flex-row gap-4 text-white items-center flex-wrap">
            <h4>{tagArr ? "Tags:" : null} </h4>
            {tagArr ? tagArr.map((tag) => tagElement(tag)) : null}
        </div>
    );
}
