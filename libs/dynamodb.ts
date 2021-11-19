/* eslint-disable no-await-in-loop */
import { DynamoDB } from 'aws-sdk';
import { decodeCursor, getPaginatedResult } from 'dynamodb-paginator';

type QueryParamsType = {
  TableName: string;
  Item?: any;
  KeyConditionExpression?: string;
  ExpressionAttributeValues?: Object;
  ScanIndexForward?: boolean;
  ExclusiveStartKey?:
    | { PK: string; SK: string }
    | { SK: string }
    | { PK: string };
  IndexName?: string;
  Limit?: number;
};

const client = new DynamoDB.DocumentClient();

const call = (action, params) => {
  let dynamoDb = new DynamoDB.DocumentClient({
    convertEmptyValues: true,
  });
  if (process.env.stage == 'local') {
    dynamoDb = new DynamoDB.DocumentClient({
      endpoint: process.env.dynamoLocalURL,
      convertEmptyValues: true,
    });
  }
  return dynamoDb[action](params).promise();
};

const queryByKeys = async (
  PK: string,
  SK: string,
  option?: {
    tableName?: string;
    indexName?: string;
  },
) => {
  try {
    const result = [];
    const params: QueryParamsType = {
      TableName: option?.tableName ?? process.env.tableName,
      KeyConditionExpression: 'PK = :PK and SK = :SK',
      ExpressionAttributeValues: {
        ':PK': PK,
        ':SK': SK,
      },
      ScanIndexForward: false,
      IndexName: option?.indexName ?? null,
    };
    if (!option?.indexName) {
      delete params.IndexName;
    }
    let items;
    do {
      items = await call('query', params);
      items.Items.forEach((item) => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== 'undefined');
    return result;
  } catch (error) {
    console.log('db error : ', error);
    throw new Error('DB 에러');
  }
};

const queryByPK = async (PK: string, tableName?: string) => {
  const result = [];
  const params: QueryParamsType = {
    TableName: tableName ?? process.env.tableName,
    KeyConditionExpression: 'PK = :PK',
    ExpressionAttributeValues: {
      ':PK': PK,
    },
    ScanIndexForward: false,
  };
  let items;
  do {
    items = await call('query', params);
    items.Items.forEach((item) => result.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== 'undefined');
  return result;
};

const queryBySK = async (SK: string, tableName?: string) => {
  try {
    const result = [];
    const params: QueryParamsType = {
      TableName: tableName ?? process.env.tableName,
      IndexName: 'SK-to-PK-Index',
      KeyConditionExpression: 'SK = :SK',
      ExpressionAttributeValues: {
        ':SK': SK,
      },
    };
    let items;
    do {
      items = await call('query', params);
      items.Items.forEach((item) => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== 'undefined');
    console.log(result);
    return result;
  } catch (error) {
    console.log('db error', error);
    throw new Error('DB Error.');
  }
};

const queryByBeginsWith = async (
  PK: string,
  word: string,
  option?: { tableName?: string; down?: boolean; indexName?: string },
) => {
  try {
    const result = [];
    const params: QueryParamsType = {
      TableName: option?.tableName ?? process.env.tableName,
      KeyConditionExpression: 'PK = :PK and begins_with(SK, :WORD)',
      ExpressionAttributeValues: {
        ':PK': PK,
        ':WORD': word,
      },
      IndexName: option?.indexName ?? '',
      ScanIndexForward: option?.down ?? false,
    };
    if (!option?.indexName) {
      delete params.IndexName;
    }
    let items;
    do {
      items = await call('query', params);
      items.Items.forEach((item) => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== 'undefined');
    return result;
  } catch (error) {
    console.log('db error', error);
    throw new Error('database 조회 실패');
  }
};

const queryByBeginsWithChurchIndex = async (
  church: string,
  word: string,
  tableName?: string,
) => {
  try {
    const result = [];
    const params: QueryParamsType = {
      TableName: tableName ?? process.env.tableName,
      KeyConditionExpression: 'church = :church and begins_with(SK, :WORD)',
      ExpressionAttributeValues: {
        ':church': church,
        ':WORD': word,
      },
      ScanIndexForward: false,
      IndexName: 'church-SK-index',
    };
    let items;
    do {
      items = await call('query', params);
      items.Items.forEach((item) => result.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== 'undefined');
    return result;
  } catch (error) {
    console.log('db error', error);
    throw new Error('database 조회 실패');
  }
};

const queryPaginationByBeginsWith = async (
  PK: string,
  word: string,
  option?: {
    limit?: number;
    tableName?: string;
    down?: boolean;
    startKey?: string;
    index?: string;
  },
) => {
  try {
    const params: QueryParamsType = {
      TableName: option.tableName ?? process.env.tableName,
      Limit: option.limit,
      KeyConditionExpression: 'PK = :PK and begins_with(SK, :WORD)',
      ExpressionAttributeValues: {
        ':PK': PK,
        ':WORD': word,
      },
      ExclusiveStartKey: {
        PK: PK ?? '',
        SK: option?.startKey ?? '',
      },
      ScanIndexForward: option?.down ?? false,
      IndexName: option.index ?? '',
    };
    if (!option.index) {
      delete params.IndexName;
    }
    if (!option.startKey) {
      delete params.ExclusiveStartKey;
    }
    const cursor = undefined;
    const paginationParams = decodeCursor(cursor) || params;
    const items = await call('query', params);
    const paginatedResult = getPaginatedResult<any>(
      paginationParams,
      option.limit,
      items,
    );
    console.log(paginatedResult);
    return paginatedResult;
  } catch (error) {
    console.log('db error', error);
    throw new Error('database 조회 실패');
  }
};

const queryPaginateByKeys = async (
  PK: string,
  SK: string,
  option?: { limit?: number; tableName?: string; down?: boolean },
) => {
  try {
    const params: QueryParamsType = {
      TableName: option.tableName ?? process.env.tableName,
      Limit: option.limit,
      KeyConditionExpression: 'PK = :PK and SK = :SK',
      ExpressionAttributeValues: {
        ':PK': PK,
        ':SK': SK,
      },
      ScanIndexForward: option?.down ?? false,
    };
    let items;
    const cursor = undefined;
    const paginationParams = decodeCursor(cursor) || params;
    console.log(paginationParams);
    items = await call('query', params);
    const paginatedResult = getPaginatedResult<any>(
      paginationParams,
      option.limit,
      items,
    );
    return paginatedResult;
  } catch (error) {
    console.log('db error', error);
    throw new Error('database 조회 실패');
  }
};

const putItem = async (item) => {
  try {
    const params: QueryParamsType = {
      TableName: process.env.tableName,
      Item: item,
    };

    if (!item.createdAt) {
      params.Item.createdAt = new Date().toISOString();
    }

    if (!item.updatedAt) {
      params.Item.updatedAt = new Date().toISOString();
    }
    await call('put', params);
  } catch (err) {
    throw new Error(err);
  }
};

const updateItemByKeys = async (
  PK: string,
  SK: string,
  updateExpression: string,
  expressionAttributeValues: Object,
) => {
  try {
    const params = {
      TableName: process.env.tableName,
      Key: {
        PK,
        SK,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };
    const result = await call('update', params);
    console.log('update called', result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteItemByKeys = async (PK: string, SK: string) => {
  try {
    const params = {
      TableName: process.env.tableName,
      Key: {
        PK,
        SK,
      },
    };
    const result = await call('delete', params);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const dynamodb = {
  putItem,
  queryByKeys,
  queryByPK,
  queryBySK,
  queryByBeginsWith,
  queryByBeginsWithChurchIndex,
  queryPaginationByBeginsWith,
  queryPaginateByKeys,
  updateItemByKeys,
  deleteItemByKeys,
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
