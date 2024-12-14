const WebSocket = require('ws');
const http = require('http');

// HTTPサーバーの作成
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // 'sound'というメッセージを受け取ったら、全てのクライアントに音を鳴らす指示を送信
    if (message === 'sound') {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('sound');
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
