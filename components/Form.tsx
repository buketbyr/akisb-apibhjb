import * as React from 'react';import { useRouter } from 'next/router';export default function Form(){const r=useRouter();const[c,setC]=React.useState('Genel');const[t,setT]=React.useState('');const[u,setU]=React.useState('B');const[p,setP]=React.useState(false);const[e,setE]=React.useState(null as null|string);async function onSubmit(ev:React.FormEvent){ev.preventDefault();setError:null;setP(true);try{const res=await fetch('/api/observations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({category:c,text:t,user:u})});if(!res.ok){const d=await res.json().catch(()=>({}));throw new Error((d as any)?.error||`İstek başarısız: ${res.status}`);}await r.push('/');}catch(err:any){setE(err.message||'Bilinmeyen hata');}finally{setP(false);} } return(<form onSubmit={onSubmit} className="rounded-2xl bg-white shadow-sm border border-gray-200 p-4 space-y-4" aria-label="Yeni gözlem formu"><div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="user">Kullanıcı</label><input id="user" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={u} onChange={e=>setU(e.target.value)} placeholder="Varsayılan: B"/></div><div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Kategori</label><select id="category" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={c} onChange={e=>setC(e.target.value)}><option>Genel</option><option>İlişki</option><option>İş</option><option>Aile</option><option>Sağlık</option><option>Diğer</option></select></div><div><label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="text">Metin</label><textarea id="text" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm min-h-[120px]" value={t} onChange={e=>setT(e.target.value)} placeholder="Gözlemini yaz..." required/></div>{e && <div className="text-sm text-red-600">{e}</div>}<div className="flex items-center gap-3"><button className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 active:bg-gray-200 transition" disabled={p}>{p?'Kaydediliyor...':'Kaydet'}</button><a href="/" className="text-sm underline">Listeye dön</a></div></form>);}
// pages/new.tsx
import * as React from "react";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Form"), { ssr: false });

export default function NewPage() {
  const [health, setHealth] = React.useState<{ ok: boolean; error?: string } | null>(null);

  React.useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setHealth({ ok: !!d?.ok, error: d?.error }))
      .catch(() => setHealth({ ok: false, error: "Sağlık kontrolü başarısız" }));
  }, []);

  const disabled = health && !health.ok;

  return (
    <main className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-medium mb-1">Yeni Gözlem</h2>
        <p className="text-sm text-gray-600">Kategori ve metni doldurup kaydedin.</p>
      </div>

      {health && !health.ok && (
        <div className="card border-red-300">
          <p className="text-sm text-red-700">
            Veritabanı bağlı değil: <code>{health.error || "DATABASE_URL eksik/boş"}</code>.
            Lütfen ortam değişkenini ekleyip yeniden deploy edin.
          </p>
        </div>
      )}

      {/* Form’a disabled prop’u geçiyoruz */}
      <Form disabled={!!disabled} />
    </main>
  );
}
