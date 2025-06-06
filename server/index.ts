import express from 'express';
import cors from 'cors';
import { Researcher } from './types/researcher';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ダミーの研究者データ
const researchers: Researcher[] = [
  {
    id: 1,
    name: '田中 太郎',
    affiliation: '東京大学 情報理工学系研究科',
    keywords: ['機械学習', '深層学習', 'コンピュータビジョン', '画像認識'],
    profileUrl: 'https://researchmap.jp/researcher1'
  },
  {
    id: 2,
    name: '佐藤 花子',
    affiliation: '京都大学 工学研究科',
    keywords: ['自然言語処理', '機械学習', 'テキストマイニング', '情報検索'],
    profileUrl: 'https://researchmap.jp/researcher2'
  },
  {
    id: 3,
    name: '鈴木 一郎',
    affiliation: '大阪大学 基礎工学研究科',
    keywords: ['ロボティクス', '制御工学', '人工知能', '機械学習'],
    profileUrl: 'https://researchmap.jp/researcher3'
  },
  {
    id: 4,
    name: '高橋 美咲',
    affiliation: '東北大学 情報科学研究科',
    keywords: ['データマイニング', 'ビッグデータ', '統計学', '機械学習'],
    profileUrl: 'https://researchmap.jp/researcher4'
  },
  {
    id: 5,
    name: '山田 健太',
    affiliation: '名古屋大学 工学研究科',
    keywords: ['バイオインフォマティクス', '生体情報処理', '機械学習', 'パターン認識'],
    profileUrl: 'https://researchmap.jp/researcher5'
  },
  {
    id: 6,
    name: '中村 由美',
    affiliation: '九州大学 システム情報科学府',
    keywords: ['ヒューマンコンピュータインタラクション', 'UI/UX', 'ユーザビリティ', 'インタラクションデザイン'],
    profileUrl: 'https://researchmap.jp/researcher6'
  },
  {
    id: 7,
    name: '伊藤 雅彦',
    affiliation: '北海道大学 情報科学研究院',
    keywords: ['セキュリティ', '暗号学', 'ネットワークセキュリティ', 'プライバシー保護'],
    profileUrl: 'https://researchmap.jp/researcher7'
  },
  {
    id: 8,
    name: '小林 真理',
    affiliation: '筑波大学 システム情報工学研究科',
    keywords: ['ソフトウェア工学', 'プログラミング言語', 'コンパイラ', 'プログラム解析'],
    profileUrl: 'https://researchmap.jp/researcher8'
  }
];

// マッチ度スコアを計算する関数
const calculateMatchScore = (researcherKeywords: string[], searchKeyword: string): number => {
  const normalizedSearchKeyword = searchKeyword.toLowerCase();
  let matchCount = 0;
  let partialMatchCount = 0;

  for (const keyword of researcherKeywords) {
    const normalizedKeyword = keyword.toLowerCase();
    
    // 完全一致
    if (normalizedKeyword === normalizedSearchKeyword) {
      matchCount += 2;
    }
    // 部分一致
    else if (normalizedKeyword.includes(normalizedSearchKeyword) || 
             normalizedSearchKeyword.includes(normalizedKeyword)) {
      partialMatchCount += 1;
    }
  }

  // スコア計算（完全一致は2点、部分一致は1点）
  const totalScore = matchCount + partialMatchCount;
  const maxPossibleScore = researcherKeywords.length * 2;
  
  // 0-100のスケールに変換
  const score = Math.min(100, Math.round((totalScore / maxPossibleScore) * 100));
  
  // 最低でも部分一致があれば10点は与える
  return totalScore > 0 ? Math.max(10, score) : 0;
};

// 検索エンドポイント
app.get('/api/search', (req, res) => {
  const keyword = req.query.keyword as string;
  
  if (!keyword) {
    return res.status(400).json({ error: 'キーワードが指定されていません' });
  }

  // 各研究者のマッチ度スコアを計算
  const matchedResearchers = researchers
    .map(researcher => ({
      ...researcher,
      matchScore: calculateMatchScore(researcher.keywords, keyword)
    }))
    .filter(researcher => researcher.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    researchers: matchedResearchers,
    query: keyword
  });
});

// ヘルスチェックエンドポイント
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});