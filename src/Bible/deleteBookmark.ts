import { Bookmark, DeleteBookmarkInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const deleteBookmark = async(userId: string, {title, chapter}: DeleteBookmarkInput): Promise<Bookmark> => {
  try{
    const params = {
      TableName: process.env.tableName,
      Key: {PK:userId , SK:`bookmark-${title}-${chapter}`},
    };
    const deleteBookmarkResult = await dynamodb.delete(params);
    return {
      title,
      chapter,
      date: new Date().toISOString(),
    };
  }catch(error){
    throw new Error("책갈피 삭제 실패.");
  }
}