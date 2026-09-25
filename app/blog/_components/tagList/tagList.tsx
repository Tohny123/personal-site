function tagElement(tagName: string) {
    return (
        <div className="rounded-3xl bg-amber-500 px-4 py-1 font-normal" key={tagName}>
            {tagName}
        </div>
    )
}

export function tagList(tagArr?: string[]) {
    return (
        <div className="flex flex-row gap-4 text-white items-center">
            {tagArr ? "Tags:" : ""}
            {tagArr ?
                tagArr.map(tag => (
                    tagElement(tag)
                ))
                : ''}
        </div>
    )
}