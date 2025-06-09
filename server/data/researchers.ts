// server/data/researchers.ts

import { Researcher } from '../types/researcher';

export const researchers: Researcher[] = [
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
