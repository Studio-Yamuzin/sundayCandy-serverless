import {DynamoDB} from "aws-sdk";

type QueryParamsType = {
  TableName: string;
  Item?: any;
  KeyConditionExpression?: string;
  ExpressionAttributeValues?: Object;
  ScanIndexForward?: boolean;
  ExclusiveStartKey?: string;
  IndexName?: string;
}

const client = new DynamoDB.DocumentClient();

const call = (action, params) => {
  let dynamoDb = new DynamoDB.DocumentClient({
    convertEmptyValues: true,
  });
  if (process.env.stage == "local") {
    dynamoDb = new DynamoDB.DocumentClient({
      endpoint: process.env.dynamoLocalURL,
      convertEmptyValues: true,
    });
  }
  return dynamoDb[action](params).promise();
};

const queryByKeys = async(PK: string, SK: string, tableName?: string, indexName?: string) => {
  const result = [];
  const params: QueryParamsType = {
    TableName: tableName ?? process.env.tableName,
    KeyConditionExpression: "PK = :PK and SK = :SK",
    ExpressionAttributeValues: {
      ":PK": PK,
      ":SK": SK,
    },
    ScanIndexForward: false,
    IndexName: indexName ?? null
  };
  let items;
  do {
    items = await call("query", params);
    items.Items.forEach(item => result.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");
  return result;
}

const queryByPK = async(PK: string, tableName?: string) => {
  const result = [];
  const params: QueryParamsType = {
    TableName: tableName ?? process.env.tableName,
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": PK,
    },
    ScanIndexForward: false,
  };
  let items;
  do {
    items = await call("query", params);
    items.Items.forEach(item => result.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");
  return result;
}

const queryBySK = async (SK: string, tableName?: string) => {
  try{
    const result = [];
    let params: QueryParamsType = {
      TableName: tableName ?? process.env.tableName,
      IndexName: "SK-to-PK-Index",
      KeyConditionExpression: "SK = :SK",
      ExpressionAttributeValues: {
        ":SK": SK,
      },
    };
    let items;
    do {
      items = await call("query", params);
      items.Items.forEach(item => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
    console.log(result);
    return result;
  }catch(error){
    console.log('db error', error);
    throw new Error("DB Error.");
  }
}


const queryByBeginsWith = async(PK: string, word: string, option?: {tableName?: string, down?: boolean}) => {
  try{
    const result = [];
    const params: QueryParamsType = {
      TableName: option?.tableName ?? process.env.tableName,
      KeyConditionExpression: "PK = :PK and begins_with(SK, :WORD)",
      ExpressionAttributeValues: {
        ":PK": PK,
        ":WORD": word,
      },
      ScanIndexForward: option?.down ?? false,
    };
    let items;
    do {
      items = await call("query", params);
      items.Items.forEach(item => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
    return result;
  }catch(error){
    console.log('db error', error);
    throw new Error ("database 조회 실패");
  }
}

const queryByBeginsWithChurchIndex = async(church: string, word: string, tableName?: string) => {
  try{
    const result = [];
    const params: QueryParamsType = {
      TableName: tableName ?? process.env.tableName,
      KeyConditionExpression: "church = :church and begins_with(SK, :WORD)",
      ExpressionAttributeValues: {
        ":church": church,
        ":WORD": word,
      },
      ScanIndexForward: false,
      IndexName: "church-SK-index",
    };
    let items;
    do {
      items = await call("query", params);
      items.Items.forEach(item => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
    return result;
  }catch(error){
    console.log('db error', error);
    throw new Error ("database 조회 실패");
  }
}

const putItem = async (item) => {
  try {
    const params: QueryParamsType = {
      TableName: process.env.tableName,
      Item: item,
    };

    if(!item.createdAt) {
      params.Item.createdAt = new Date().toISOString();
    }

    if(!item.updatedAt) {
      params.Item.updatedAt = new Date().toISOString();
    }
    await call("put", params);
  } catch (err) {
    throw new Error(err);
  }
};

export const dynamodb = {
  putItem,
  queryByKeys,
  queryByPK,
  queryBySK,
  queryByBeginsWith,
  queryByBeginsWithChurchIndex,
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};