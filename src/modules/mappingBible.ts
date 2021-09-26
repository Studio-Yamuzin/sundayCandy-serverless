import { DynamoDB } from 'aws-sdk';
import {readFile} from 'fs/promises';

interface BibleParagraph {
  title: string;
  chapter: number;
  verse: number;
  text: string;
  isLast: boolean;
}

const batchWriteItems = async(items) => {
  try {
    const maxLength = items.length;
    const totalCount = Math.ceil(maxLength/25);
    let splitedParagraphs = [];

    for(let index=0; index < maxLength ; index ++){
      if(Math.ceil(index/25) === totalCount && index === maxLength){
        const params = {
          RequestItems: {
            "sundayCandy-bible": splitedParagraphs.map((paragraph)=>{
              return {
                PutRequest: {
                  Item: {
                    PK: `${paragraph.title}-${paragraph.chapter}`,
                    SK: `${paragraph.verse}`,
                    title: paragraph.title,
                    chapter: paragraph.chapter,
                    verse: paragraph.verse,
                    text: paragraph.text,
                    isLast: paragraph.isLast,
                  }
                }
              }
            })
          },
        };
        const dynamoDb = new DynamoDB.DocumentClient({
          endpoint: process.env.dynamoLocalURL,
          region: "ap-northeast-2",
          convertEmptyValues: true,
        });
        const result = await dynamoDb.batchWrite(params).promise();
        console.log(result,'\n\nlast result');
      }
      if(index !== 0 && index % 25 === 0){
        console.log("catched index: ",index);
        const params = {
          RequestItems: {
            "sundayCandy-bible": splitedParagraphs.map((paragraph)=>{
              return {
                PutRequest: {
                  Item: {
                    PK: `${paragraph.title}-${paragraph.chapter}`,
                    SK: `${paragraph.verse}`,
                    title: paragraph.title,
                    chapter: paragraph.chapter,
                    verse: paragraph.verse,
                    text: paragraph.text,
                    isLast: paragraph.isLast,
                  }
                }
              }
            })
          },
        };
        const dynamoDb = new DynamoDB.DocumentClient({
          endpoint: process.env.dynamoLocalURL,
          region: "ap-northeast-2",
          convertEmptyValues: true,
        });
        await dynamoDb.batchWrite(params).promise();
        splitedParagraphs=[];
        splitedParagraphs.push(items[index]);
      }else{
        splitedParagraphs.push(items[index]);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export const readBible = async() => {
  try{
    const result = await readFile(__dirname+"/../../assets/bible/ko_rev.json");
    const json = JSON.parse(result.toString());
    const mappedResult: BibleParagraph[] = [];
    json?.forEach((result: {abbrev: string, chapters: string[][]})=> {
      result.chapters.forEach((item, chapterIndex)=>{
        item.forEach((text, verseIndex)=>{
          const paragraph: BibleParagraph = {
            title: result.abbrev,
            chapter: 0,
            verse: 0,
            text: "",
            isLast: false,
          }
          if(item.length === verseIndex + 1){
            console.log(text, verseIndex, item);
            paragraph.isLast = true;
          }
          paragraph.chapter = chapterIndex + 1;
          paragraph.verse = verseIndex + 1;
          paragraph.text = text;
          mappedResult.push(paragraph);
        });
      });
    });
    try{
      await batchWriteItems(mappedResult);
    }catch(err){
      console.error(err);
    }
  }catch(error){
    console.log(error);
  }
}

readBible().then(()=>{
  console.log("success!");
});