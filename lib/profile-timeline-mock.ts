export interface ProfileTimelineItem {
  id: string;
  created_at: string;
  body: string;
  /** 画像付きポスト用（未指定なら画像なし） */
  hasImage?: boolean;
  /** 引用／カード風のネスト表示 */
  quote?: {
    author: string;
    handle: string;
    text: string;
  };
}

export const profileTimelineMock: ProfileTimelineItem[] = [
  {
    id: "pt1",
    created_at: "2026-04-14T10:00:00.000Z",
    body: "ワーホリの準備、いまどこまで進んでますか？コメントで教えてください ✈️",
    hasImage: true,
  },
  {
    id: "pt2",
    created_at: "2026-04-13T15:30:00.000Z",
    body: "英語学習は「続け方」が9割だと思っています。小さく毎日。",
    quote: {
      author: "英語垢まとめ",
      handle: "english_matome",
      text: "リスニングはシャドーイングが効くという研究結果が話題に。",
    },
  },
  {
    id: "pt3",
    created_at: "2026-04-12T09:20:00.000Z",
    body: "0円ワーホリのステップを図解にしてみました。ブログにまとめています。",
    hasImage: true,
  },
  {
    id: "pt4",
    created_at: "2026-04-11T18:00:00.000Z",
    body: "不安なときは情報を集めるより、一度行動してみる。失敗も含めて資産になります。",
  },
  {
    id: "pt5",
    created_at: "2026-04-10T12:10:00.000Z",
    body: "TOEIC 800点を目指すなら、まずは公式問題集を2周することから始めました。",
    quote: {
      author: "Study Log",
      handle: "study_log",
      text: "単語帳はアプリ派？紙派？",
    },
  },
  {
    id: "pt6",
    created_at: "2026-04-09T08:45:00.000Z",
    body: "今日の朝活：英字新聞1本読んで要約。30分で十分。",
    hasImage: true,
  },
  {
    id: "pt7",
    created_at: "2026-04-08T21:00:00.000Z",
    body: "DMで「0円ワーホリって本当？」とよく聞かれます。本当です。再現性を意識して設計しました。",
  },
  {
    id: "pt8",
    created_at: "2026-04-07T14:25:00.000Z",
    body: "渡航前チェックリストをNotionに置いてます。必要な方はプロフィールのリンクからどうぞ。",
    hasImage: true,
  },
  {
    id: "pt9",
    created_at: "2026-04-06T11:00:00.000Z",
    body: "英語が苦手だった高校時代の自分に、今ならこう伝えたい。「焦らなくていい」",
  },
  {
    id: "pt10",
    created_at: "2026-04-05T19:40:00.000Z",
    body: "ワーホリ先での初日の記録。スーパーの値札が読めなくて笑った思い出。",
    quote: {
      author: "Travel Notes",
      handle: "travel_notes",
      text: "現地のスーパーは観光の一部です。",
    },
  },
  {
    id: "pt11",
    created_at: "2026-04-04T07:15:00.000Z",
    body: "英語で自分を変える。ワーホリで新たな自分。引き続き発信していきます。",
    hasImage: true,
  },
  {
    id: "pt12",
    created_at: "2026-04-03T16:50:00.000Z",
    body: "質問募集：次の記事テーマは何がいいですか？",
  },
];
