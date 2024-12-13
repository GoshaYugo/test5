import { useEffect, useState } from 'react';

export default function Home() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // WebSocketサーバーに接続
    const socket = new WebSocket('wss://462a-133-55-75-68.ngrok-free.app'); // ngrokの公開URLに変更

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      // 音を鳴らす
      if (event.data === 'sound') {
        const audio = new Audio('/sound.mp3');
        audio.play();
      }
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
      ws.send('sound');
    }
  };

  return (
    <div>
      <h1>WebSocket 音鳴らしアプリ</h1>
      <button onClick={handleButtonClick}>音を鳴らす</button>
    </div>
  );
}
