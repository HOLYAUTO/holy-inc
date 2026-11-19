import PolicyPage from '../PolicyPage';
import { ijilogTerms } from '@/content/ijilog/terms';

/** イジログの利用規約（アプリの設定画面・ストアからリンクされる） */
export default function IjilogTermsPage() {
  return <PolicyPage policy={ijilogTerms} />;
}
