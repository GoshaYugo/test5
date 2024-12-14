import { useEffect, useState } from 'react';

export default function Home() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocketサーバーに接続
    const socket = new WebSocket('ws://133.55.75.68:3001'); // ローカルサーバーに接続

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      console.log('Message from server: ', event.data);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };

    setWs(socket);

    // クリーンアップ
    return () => socket.close();
  }, []);

  const handleButtonClick = () => {
    if (ws && isConnected) {
      ws.send('sound');  // 音声再生の指示を送る
    }
  };

  return (
    <div>
      <h1>音を鳴らすボタンページ</h1>
      <button onClick={handleButtonClick}>音を鳴らす</button>
    </div>
  );
}
