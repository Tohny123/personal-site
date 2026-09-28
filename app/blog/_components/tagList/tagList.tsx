function tagElement(tagName: string) {
    return (
        <div className="rounded-3xl bg-amber-500 px-4 py-1 font-normal drop-shadow-xl" key={tagName}>
            <h4>{tagName}</h4>
        </div>
    )
}

export function tagList(tagArr?: string[]) {
    return (
        <div className="flex flex-row gap-4 text-white items-center">
            <h4>{tagArr ? "Tags:" : ""} </h4>
            {tagArr ?
                tagArr.map(tag => (
                    tagElement(tag)
                ))
                : ''}
        </div>
    )
}