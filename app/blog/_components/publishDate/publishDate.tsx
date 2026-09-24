import { PiCalendarBlank } from "react-icons/pi"

export function publishDate(dateString: string) {
    const postDate: Date = new Date(dateString);
    const formattedDate = postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="flex flex-row gap-2 items-center text-white text-1">
            <PiCalendarBlank />
            Date: <b> {formattedDate}</b>
        </div>)
}