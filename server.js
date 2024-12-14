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

    // メッセージが'sound'なら、他のクライアントに'sound'を送信
    if (message === 'sound') {
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send('1');
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// WebSocketサーバーを3001番ポートで実行
server.listen(3001, () => {
  console.log('WebSocket server running on ws://localhost:3001');
});
