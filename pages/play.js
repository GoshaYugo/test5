import { useEffect } from 'react';

export default function Play() {
  useEffect(() => {
    const socket = new WebSocket('ws://133.55.75.68:3001'); // ローカルサーバーに接続

    socket.onopen = () => {
      console.log('WebSocket connected to Play page');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);

      try {
        // 受け取ったメッセージをJSONとして解析
        const message = JSON.parse(event.data);

        // 'sound'メッセージの場合
        if (message.type === 'sound') {
          const audio = new Audio(message.file);  // message.fileに指定された音声を再生
          audio.play();
        }
      } catch (error) {
        console.error('Error parsing message:', error);
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
