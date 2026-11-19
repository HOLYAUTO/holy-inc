import type { FC } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/base/SeoHead';
import { holy, taniguchi, type PolicyBlock, type PolicyDocument, type PolicySection } from '@/content/ijilog/shared';

/**
 * イジログ（アプリ）の規約類のページ（/ijilog/privacy・/ijilog/terms）。アプリの設定画面・
 * ストアの掲載情報からリンクされる。名義はたにぐち自動車なので、HOLY 自身の /privacy・/terms
 * とは別ページ。日本語のみ。
 */

const Block: FC<{ block: PolicyBlock }> = ({ block }) => {
  switch (block.type) {
    case 'p':
      return <p className="text-slate-600 leading-relaxed">{block.text}</p>;
    case 'ul':
      return (
        <ul className="space-y-2 text-slate-600">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3 text-slate-600">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="min-w-[1.75rem] text-right font-semibold text-slate-500 tabular-nums">{i + 1}.</span>
              <span className="leading-relaxed">
                {item.title && <strong className="block text-slate-800">{item.title}</strong>}
                {item.text}
                {item.sub && (
                  <ul className="mt-2 space-y-1">
                    {item.sub.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="neu-card rounded-[20px] p-2 md:p-3 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="px-3 py-2 font-semibold text-slate-800 whitespace-nowrap border-b border-slate-300/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top border-b border-slate-300/40 last:border-b-0">
                  {row.map((cell, c) =>
                    // 見出しの無い表は「項目｜内容」の2列。1列目を行見出しにする。
                    !block.head && c === 0 ? (
                      <th key={c} scope="row" className="px-3 py-2 font-semibold text-slate-700 w-[34%] min-w-[7rem]">
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="px-3 py-2 text-slate-600 leading-relaxed min-w-[7rem]">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

const SectionHeading: FC<{ section: PolicySection; numbering: PolicyDocument['numbering'] }> = ({ section, numbering }) => {
  const id = `sec-${section.num || section.title}`;
  if (numbering === 'article') {
    return (
      <h2 id={id} className="text-xl font-bold text-slate-800 mb-4">
        {section.num ? `第${section.num}条（${section.title}）` : section.title}
      </h2>
    );
  }
  return (
    <h2 id={id} className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
      {section.num && (
        <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center neu-well rounded-full text-teal-600 text-sm font-bold">
          {section.num}
        </span>
      )}
      {section.title}
    </h2>
  );
};

const PolicyPage: FC<{ policy: PolicyDocument }> = ({ policy }) => {
  return (
    <>
      <SeoHead
        title={`${policy.title} | ${taniguchi.name}`}
        description={policy.description}
        ogType="website"
        noindex={true}
        ogImage="/og/og-default.png"
      />
      <main lang="ja">
        {/* Hero */}
        <section className="relative text-slate-900 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
          <div className="relative w-full px-6 md:px-10 max-w-4xl mx-auto text-center">
            <p className="text-[color:var(--neu-accent)] text-sm tracking-[0.3em] uppercase mb-4">{policy.label}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[color:var(--neu-ink)]">
              {policy.title}
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              アプリの提供：{taniguchi.name}　／　開発・管理：{holy.name}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="w-full px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <p className="text-slate-600 leading-relaxed mb-12">{policy.preamble}</p>

          <div className="space-y-12">
            {policy.sections.map((section) => (
              <section key={section.num || section.title} aria-labelledby={`sec-${section.num || section.title}`}>
                <SectionHeading section={section} numbering={policy.numbering} />
                <div className="space-y-4">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-slate-300/40 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
            <Link to={policy.related.path} className="text-[color:var(--neu-accent)] hover:underline">
              {policy.related.label}
            </Link>
            <p>制定日：{policy.enactedOn}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PolicyPage;
