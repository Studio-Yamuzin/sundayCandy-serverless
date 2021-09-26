import { Bookmark, GetMyBookmarkByChapterInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const getMyBookmarkByChapter = async(userId: string, {title, chapter}: GetMyBookmarkByChapterInput): Promise<Bookmark | null> => {
  try{
    const bookmarks = await dynamodb.queryByKeys(userId, `bookmark-${title}-${chapter}`);
    return bookmarks[0] ?? null;
  }catch(error){
    throw new Error("성경 북마크를 가져오는데 실패했어요.");
  }
}