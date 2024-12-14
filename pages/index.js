import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // WebSocketサーバーに接続
    const socket = new WebSocket('ws://localhost:3001'); // ngrokの公開URLに変更

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
      router.push('/play');  // 音声再生ページに遷移
    }
  };

  return (
    <div>
      <h1>WebSocket 音鳴らしアプリ</h1>
      <button onClick={handleButtonClick}>音を鳴らす</button>
    </div>
  );
}
