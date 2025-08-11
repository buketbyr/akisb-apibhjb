import * as React from 'react';
import { useRouter } from 'next/router';

type Props = { disabled?: boolean };

export default function Form({ disabled = false }: Props) {
  const router = useRouter();
  const [category, setCategory] = React.useState('Genel');
  const [text, setText] = React.useState('');
  const [user, setUser] = React.useState('B');
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [okMsg, setOkMsg] = React.useState<string | null>(null);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (disabled || pending) return;
    setError(null);
    setOkMsg(null);
    setPending(true);
    try {
      const res = await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, text, user }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `İstek başarısız: ${res.status}`);
      setOkMsg('Kayıt eklendi');
      setTimeout(() => router.push('/'), 300);
    } catch (err: any) {
      setError(err?.message || 'Bilinmeyen hata');
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white shadow-sm border border-gray-200 p-4 space-y-4"
      aria-label="Yeni gözlem formu"
    >
      <div aria-live="polite" className="sr-only">
        {error ? `Hata: ${error}` : okMsg ? okMsg : ''}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="user">
          Kullanıcı
        </label>
        <input
          id="user"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Varsayılan: B"
          disabled={disabled || pending}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
          Kategori
        </label>
        <select
          id="category"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={disabled || pending}
        >
          <option>Genel</option>
          <option>İlişki</option>
          <option>İş</option>
          <option>Aile</option>
          <option>Sağlık</option>
          <option>Diğer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="text">
          Metin
        </label>
        <textarea
          id="text"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm min-h-[120px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Gözlemini yaz..."
          required
          disabled={disabled || pending}
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      {okMsg && <div className="text-sm text-green-700">{okMsg}</div>}

      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 active:bg-gray-200 transition"
          disabled={disabled || pending}
        >
          {pending ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        <a href="/" className="text-sm underline">Listeye dön</a>
      </div>
    </form>
  );
}
