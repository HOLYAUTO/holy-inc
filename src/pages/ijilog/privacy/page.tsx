import PolicyPage from '../PolicyPage';
import { ijilogPrivacy } from '@/content/ijilog/privacy';

/** イジログのプライバシーポリシー（アプリの設定画面・ストアからリンクされる） */
export default function IjilogPrivacyPage() {
  return <PolicyPage policy={ijilogPrivacy} />;
}
