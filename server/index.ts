import express from 'express';
import cors from 'cors';
import { Researcher } from './types/researcher';
import { researchers } from './data/researchers';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// マッチ度スコアを計算する関数
const calculateMatchScore = (researcherKeywords: string[], searchKeyword: string): number => {
  const normalizedSearchKeyword = searchKeyword.toLowerCase();
  let matchCount = 0;
  let partialMatchCount = 0;

  for (const keyword of researcherKeywords) {
    const normalizedKeyword = keyword.toLowerCase();

    if (normalizedKeyword === normalizedSearchKeyword) {
      matchCount += 2;
    } else if (
      normalizedKeyword.includes(normalizedSearchKeyword) ||
      normalizedSearchKeyword.includes(normalizedKeyword)
    ) {
      partialMatchCount += 1;
    }
  }

  const totalScore = matchCount + partialMatchCount;
  const maxPossibleScore = researcherKeywords.length * 2;
  const score = Math.min(100, Math.round((totalScore / maxPossibleScore) * 100));
  return totalScore > 0 ? Math.max(10, score) : 0;
};

// 検索エンドポイント
app.get('/api/search', (req, res) => {
  const keyword = req.query.keyword as string;

  if (!keyword) {
    return res.status(400).json({ error: 'キーワードが指定されていません' });
  }

  const matchedResearchers = researchers
    .map(researcher => ({
      ...researcher,
      matchScore: calculateMatchScore(researcher.keywords, keyword)
    }))
    .filter(researcher => researcher.matchScore > 0)
    .sort((a, b) => b.matchScore! - a.matchScore!);

  res.json({
    researchers: matchedResearchers,
    query: keyword
  });
});

// ヘルスチェック
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
