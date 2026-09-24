import "./taglist.css"

function tagElement(tagName: string) {
    return (
        <div className="tagElement" key={tagName}>
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