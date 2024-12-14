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
        // 例えば、soundに種類を追加する場合
        const data = JSON.parse(message);
        client.send(JSON.stringify(data));
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
