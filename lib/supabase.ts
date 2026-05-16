import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface Post {
  id: string;
  author_name: string;
  author_handle: string;
  author_avatar_url?: string | null;
  body: string;
  created_at: string;
  is_published: boolean;
  replies_count: number;
  reposts_count: number;
  likes_count: number;
  /** ログインユーザーがいいね済み（未ログイン・未取得時は undefined） */
  liked_by_me?: boolean;
  views_count: number;
  poll?: {
    options: string[];
    totalVotes: number;
    endsIn: string;
  };
}

const dummyPosts: Post[] = [
  {
    id: "p1",
    author_name: "Shin@プログラミングチュートリアル",
    author_handle: "Shin_Engineer",
    body: "Weekend plans? 🗳️ Quick poll below — tap an option to vote.",
    created_at: "2026-04-10T08:30:00.000Z",
    is_published: true,
    replies_count: 18,
    reposts_count: 54,
    likes_count: 321,
    views_count: 12800,
    poll: {
      options: ["to go", "going"],
      totalVotes: 4821,
      endsIn: "2 days left",
    },
  },
  {
    id: "p2",
    author_name: "Frontend Memo",
    author_handle: "frontend_memo",
    body: "UI再現では余白、文字サイズ、ボーダー色を先に合わせると一気に近づきます。",
    created_at: "2026-04-10T06:10:00.000Z",
    is_published: true,
    replies_count: 6,
    reposts_count: 11,
    likes_count: 98,
    views_count: 4700,
  },
  {
    id: "p3",
    author_name: "AI News JP",
    author_handle: "ainews_jp",
    body: "ダミーデータで画面を固めてからAPI接続すると、仕様調整がスムーズです。",
    created_at: "2026-04-09T22:45:00.000Z",
    is_published: true,
    replies_count: 12,
    reposts_count: 20,
    likes_count: 177,
    views_count: 9200,
  },
  {
    id: "p4",
    author_name: "Design Systems JP",
    author_handle: "ds_jp",
    body: "タイムラインだけスクロールさせるときは、親に min-h-0 と flex-1、子に overflow-y-auto をセットするのが定番です。",
    created_at: "2026-04-09T12:00:00.000Z",
    is_published: true,
    replies_count: 9,
    reposts_count: 15,
    likes_count: 210,
    views_count: 5600,
  },
  {
    id: "p5",
    author_name: "Cloud Native Daily",
    author_handle: "cloud_native",
    body: "コンテナのヘルスチェックは readiness と liveness を分けて設計すると運用が楽になります。",
    created_at: "2026-04-08T18:20:00.000Z",
    is_published: true,
    replies_count: 22,
    reposts_count: 31,
    likes_count: 402,
    views_count: 18900,
  },
  {
    id: "p6",
    author_name: "TypeScript Tips",
    author_handle: "ts_tips",
    body: "`satisfies` を使うと、型推論を保ったままリテラル型を絞り込めます。",
    created_at: "2026-04-08T09:00:00.000Z",
    is_published: true,
    replies_count: 5,
    reposts_count: 8,
    likes_count: 88,
    views_count: 3200,
  },
  {
    id: "p7",
    author_name: "Accessibility First",
    author_handle: "a11y_first",
    body: "ボタンには必ず aria-label か視覚ラベルを。アイコンのみのUIほど見落としがちです。",
    created_at: "2026-04-07T15:30:00.000Z",
    is_published: true,
    replies_count: 14,
    reposts_count: 19,
    likes_count: 256,
    views_count: 7800,
  },
  {
    id: "p8",
    author_name: "Web Perf Notes",
    author_handle: "webperf_notes",
    body: "LCP 対策は画像の priority とサイズ指定から。まずはヒーロー画像を最適化しましょう。",
    created_at: "2026-04-07T08:10:00.000Z",
    is_published: true,
    replies_count: 7,
    reposts_count: 12,
    likes_count: 134,
    views_count: 4100,
  },
  {
    id: "p9",
    author_name: "Security Brief",
    author_handle: "sec_brief",
    body: "CSRF 対策は SameSite Cookie とトークンの二段でも十分なケースが多いです。要件に合わせて選びましょう。",
    created_at: "2026-04-06T20:00:00.000Z",
    is_published: true,
    replies_count: 11,
    reposts_count: 6,
    likes_count: 95,
    views_count: 2900,
  },
  {
    id: "p10",
    author_name: "Product Ideas",
    author_handle: "product_ideas",
    body: "MVP は「削れる機能を削る」より「検証に必要な学びが得れるか」で優先順位をつけると迷いが減ります。",
    created_at: "2026-04-06T10:45:00.000Z",
    is_published: true,
    replies_count: 28,
    reposts_count: 14,
    likes_count: 312,
    views_count: 11200,
  },
];

export function getDummyPosts(): Post[] {
  return [...dummyPosts];
}

class MockPostQueryBuilder {
  private items: Post[];

  constructor(items: Post[]) {
    this.items = items;
  }

  select(_columns: string): MockPostQueryBuilder {
    void _columns;
    return this;
  }

  eq<K extends keyof Post>(column: K, value: Post[K]): MockPostQueryBuilder {
    this.items = this.items.filter((item) => item[column] === value);
    return this;
  }

  order(
    column: keyof Post,
    options: { ascending: boolean },
  ): MockPostQueryBuilder {
    const direction = options.ascending ? 1 : -1;
    this.items = [...this.items].sort((a, b) => {
      const av = a[column];
      const bv = b[column];
      if (av === bv) return 0;
      if (av == null || bv == null) return 0;
      if (av === undefined || bv === undefined) return 0;
      return av > bv ? direction : -direction;
    });
    return this;
  }

  async limit(count: number): Promise<{ data: Post[]; error: null }> {
    return {
      data: this.items.slice(0, count),
      error: null,
    };
  }
}

const mockSupabase = {
  from(table: string): MockPostQueryBuilder {
    if (table !== "posts") return new MockPostQueryBuilder([]);
    return new MockPostQueryBuilder([...dummyPosts]);
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

/** URL と anon key が両方あるときは Supabase クライアント、欠けているときはモック */
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (mockSupabase as unknown as SupabaseClient);
