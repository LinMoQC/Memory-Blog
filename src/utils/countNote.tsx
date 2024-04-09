import { useSelector } from "react-redux";

// 自定义 hook
const useCountNote = (categoryTitle: string) => {
    const noteList = useSelector((state: { note: { Notes: any } }) => state.note.Notes)
    const matchedNote = noteList.find((item: { noteCategory: string }) => item.noteCategory === categoryTitle);
    return matchedNote ? matchedNote.length : 0;
}

export default useCountNote;
