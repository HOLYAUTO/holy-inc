/**
 * イジログ（スマートフォン向けアプリ）の規約類で共通に使うもの。
 *
 * 名義（「当社」）は株式会社たにぐち自動車。株式会社HOLY は開発・管理の委託先で、
 * 有料サービス（複数台プラン・復旧の事務手数料）の販売事業者でもある。
 * 公開先を HOLY のホームページにすることは 2026-11-14 に決定（イジログ側 docs/open-questions.md #85）。
 *
 * 【要確認】が残っている間は公開しない（scripts/check-links.mjs が落とす）。
 */
// 相対パス：scripts/check-links.mjs（jiti）からも読むため、@ エイリアスを使わない
import { companyInfo } from '../../mocks/company';

/** 未確定の値の目印。check-links.mjs がこの文字列を探す。 */
export const PENDING = '【要確認】';

export const APP_NAME = 'イジログ';

/** 本アプリの提供者（規約類の「当社」）。同社サイトの会社情報による。問い合わせ窓口は電話のみ。 */
export const taniguchi = {
  name: '株式会社たにぐち自動車',
  address: '〒491-0131 愛知県一宮市笹野宮西北1369-1',
  representative: '代表取締役 谷口 敦史',
  tel: '0586-82-5161',
};

/** 開発・管理の委託先、有料サービスの販売事業者 */
export const holy = {
  name: companyInfo.name,
  address: `〒${companyInfo.postalCode} ${companyInfo.address}`,
  representative: companyInfo.representative,
  tel: companyInfo.tel,
  /** 有料サービス・特定商取引法の表記の窓口 */
  email: companyInfo.email,
  /** 個人情報の取扱い（共同利用）の窓口。HOLY 自身の /privacy と同じ */
  privacyEmail: 'privacy@holy-inc.jp',
};

export const ORIGIN = 'https://www.holy-inc.jp';
export const PRIVACY_PATH = '/ijilog/privacy';
export const TERMS_PATH = '/ijilog/terms';

export type PolicyBlock =
  | { type: 'p'; text: string }
  | { type: 'ol'; items: { title?: string; text: string; sub?: string[] }[] }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head?: string[]; rows: string[][] };

export interface PolicySection {
  /** 番号。無い節（窓口・特定商取引法の表記など）は空文字 */
  num: string;
  title: string;
  blocks: PolicyBlock[];
}

export interface PolicyDocument {
  /** 'circle'：丸の中に番号（プライバシーポリシー）、'article'：第n条（利用規約） */
  numbering: 'circle' | 'article';
  label: string;
  title: string;
  description: string;
  enactedOn: string;
  preamble: string;
  sections: PolicySection[];
  /** ページの最後に出す、もう一方の文書へのリンク */
  related: { label: string; path: string };
}
