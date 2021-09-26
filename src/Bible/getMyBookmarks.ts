import { Bookmark } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const getMyBookmarks = async(userId: string): Promise<Bookmark[]> => {
  try{
    const bookmarks = await dynamodb.queryByBeginsWith(userId, 'bookmark');
    console.log("bookmarks", bookmarks);
    const sortedBookmarks = bookmarks?.sort((bookmarkA, bookmarkB)=> bookmarkA.createdAt - bookmarkB.createdAt);
    const parsedBookmarks: Bookmark[] = sortedBookmarks.map((bookmark)=> {
      return {
        title: bookmark.title,
        chapter: bookmark.chapter,
        date: bookmark.createdAt,
      }
    })
    return parsedBookmarks;
  }catch(error){
    throw new Error("성경 북마크를 가져오는데 실패했어요.");
  }
}