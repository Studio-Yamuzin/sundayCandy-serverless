import { Bookmark, CreateBookmarkInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const createBookmark = async(userId: string, {chapter, title}: CreateBookmarkInput): Promise<Bookmark> => {
  try{
    const createdAt = new Date().toISOString();
    await dynamodb.putItem({
      PK: userId,
      SK: `bookmark-${title}-${chapter}`,
      title: title,
      chapter: chapter,
      createdAt: createdAt,
    });
    return {
      title: title,
      chapter: chapter,
      date: createdAt,
    }
  }catch(error){
    throw new Error("책갈피 생성에 실패했어요.\n다시 시도해주세요.")
  }
}