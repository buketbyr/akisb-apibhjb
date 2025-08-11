import * as React from 'react';
import type { GetServerSideProps } from 'next';
import { requirePrisma, hasDatabaseUrl } from '@/lib/prisma';

type Observation = {
  id: number; user: string; category: string; text: string; createdAt: string;
};
type Props = { items: Observation[]; dbReady: boolean };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  if (!hasDatabaseUrl) return { props: { items: [], dbReady: false } };
  const prisma = requirePrisma();
  const rows = await prisma.observation.findMany({ orderBy: { id: 'desc' }, take: 100 });
  const items = rows.map(r => ({ ...r, createdAt: r.createdAt.toISOString() }));
  return { props: { items, dbReady: true } };
};

export default function Home({ items, dbReady }: Props) {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1>Akış Bilinci</h1>
      {!dbReady && (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 text-yellow-900 p-3 text-sm">
          Veritabanı bağlantısı ayarlı değil. Lütfen <code>DATABASE_URL</code> ekleyip redeploy et.
        </div>
      )}
      <ul className="space-y-3">
        {items.map(i => (
          <li key={i.id} className="rounded-xl border p-3">
            <div className="text-xs text-gray-500">
              {i.user} · {i.category} · {new Date(i.createdAt).toLocaleString('tr-TR')}
            </div>
            <div>{i.text}</div>
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-gray-500">Kayıt yok.</li>}
      </ul>
      <a href="/new" className="underline text-sm">Yeni</a> · <a href="/logs" className="underline text-sm">Kayıtlar</a>
    </main>
  );
}
