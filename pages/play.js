import { useEffect, useState } from 'react';

export default function Play() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://133.55.75.68:3001'); // ローカルサーバーに接続

    socket.onopen = () => {
      console.log('WebSocket connected to Play page');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);

      // event.dataがBlobの場合、Textに変換
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        
        reader.onload = () => {
          // テキストデータに変換された内容を取得
          const message = reader.result;

          // 受け取ったメッセージが'1'の場合に音を鳴らす
          if (message === '1') {
            const audio = new Audio('/sound.mp3');
            audio.play();
          }
        };

        // Blobをテキストに変換
        reader.readAsText(event.data);
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
