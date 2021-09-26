import { getUserChurch } from "@src/church/getUserChurch";
import { Contemplation } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const getContemplationAll = async(userId: string): Promise<Array<Contemplation | undefined>> => {
  try{
    const church = await getUserChurch(userId);
    const result = await dynamodb.queryByBeginsWithChurchIndex(church.name, "contemplation");
    const mappedResult: Array<Contemplation | undefined> =  result.map((item)=> {
      if(item.range === "public"){
        return{
          references: item.references,
          content: item.content,
          date: item.createdAt,
        }
      }
    });
    return mappedResult;
  }catch(error){
    throw new Error("묵상 가져오기에 실패했어요.");
  }
}