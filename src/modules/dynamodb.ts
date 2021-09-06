import {DynamoDB} from "aws-sdk";

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

const putItem = async (item, tableName) => {
  try {
    const params = {
      TableName: tableName ?? process.env.talbeName,
      Item: item,
    };

    if(!item.createdAt) {
      params.Item.createAt = new Date().toISOString();
    }

    if(!item.updatedAt) {
      params.Item.updatedAt = new Date().toISOString();
    }
    await call("put", params);
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  putItem,
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};