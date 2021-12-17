import { request } from 'https';

export const main = (event, context) => {
  const FIREBASE_API_KEY = 'BAX3uUa6nhodYQUd5ihRXvdgRIbDX27FY1syw8iSdZ412VUpXcugs7Cffo449RUGiGz0TA8t7Rb22eg36Hubcb0';
  const data = {
    message: {
      to: 'c2CcZ9W1FU9vrbdwE_w4A2:APA91bEH3dCKvcvdAJM1_X1by8nETTDI9ObFG48gDBSNwGFvw0BGRx-yiJhzcKViv4Qh9z7GnAOCjpHqBCUxbMg8eCY0Som18hEgK1nrA5bw-Rqa6e1_Io2HDiZsZOVdvWSmFOkcJxiU',
      priority: 'high',
      notification: {
        title: '선데이 캔디',
        body: '선데이캔디 테스트 푸시',
      },
    },
  };
  const options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      Authorization: `key=${FIREBASE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const req = request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(JSON.stringify(data));
  req.end();
  return context.succeed({
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
