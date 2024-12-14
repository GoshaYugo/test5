import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>WebSocket 音鳴らしアプリ</h1>
      <p>以下のリンクからページに遷移できます：</p>
      <ul>
        <li>
          <Link href="/home">
            音を鳴らすボタンを押すページ
          </Link>
        </li>
        <li>
          <Link href="/play">
            音を鳴らすページ
          </Link>
        </li>
      </ul>
    </div>
  );
}
