const WebSocket = require('ws');
const http = require('http');

// HTTPサーバーの作成
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('New client connected');

  // クライアントからのメッセージを受け取る
  ws.on('message', message => {
    console.log(`received: ${message}`);

    // 受け取ったメッセージを他のクライアントに送信
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // 例えば、音声ファイルのパスをJSON形式で送信
        const data = { type: 'sound', file: '/sound.mp3' };
        client.send(JSON.stringify(data));  // JSON.stringifyでJSONとして送信
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// WebSocketサーバーを3001番ポートで実行
server.listen(3001, () => {
  console.log('WebSocket server running on ws://localhost:3001');
});
