import { useEffect, useState } from 'react';

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocketサーバーに接続
    const ws = new WebSocket('ws://localhost:8080'); // WebSocketサーバーのURL
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = event.data;
      console.log(`Received: ${data}`);
      if (data === 'play-sound') {
        playSound();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleButtonClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('play-sound'); // 他のクライアントに音を鳴らすメッセージを送信
    }
  };

  const playSound = () => {
    const audio = new Audio('/sound.mp3'); // 音声ファイルのパス
    audio.play();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>リアルタイム通信デモ</h1>
      <button
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        音を鳴らす
      </button>
    </div>
  );
}
