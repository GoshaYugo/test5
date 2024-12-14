import { useEffect } from 'react';

export default function Play() {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); // ローカルサーバーに接続

    socket.onopen = () => {
      console.log('WebSocket connected to Play page');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);

      // 'sound'というメッセージを受け取ったら音を鳴らす
      if (event.data === 'sound') {
        const audio = new Audio('/sound.mp3');
        audio.play();
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected from Play page');
    };

    // クリーンアップ
    return () => socket.close();
  }, []);

  return (
    <div>
      <h1>音声再生ページ</h1>
      <p>音声が再生されるのを待っています...</p>
    </div>
  );
}
