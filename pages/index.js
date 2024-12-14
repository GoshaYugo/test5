import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>WebSocket 音鳴らしアプリ</h1>
      <p>以下のリンクからページに遷移できます：</p>
      <ul>
        <li>
          <Link href="/home">
            <a>音を鳴らすボタンを押すページ</a>
          </Link>
        </li>
        <li>
          <Link href="/play">
            <a>音を鳴らすページ</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
