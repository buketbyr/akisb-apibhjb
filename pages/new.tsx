import * as React from 'react';import dynamic from 'next/dynamic';const Form=dynamic(()=>import('@/components/Form'),{ssr:false});export default function NewPage(){return(<main className="space-y-4"><div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-4"><h2 className="text-lg font-medium mb-1">Yeni Gözlem</h2><p className="text-sm text-gray-600">Kategori ve metni doldurup kaydedin.</p></div><Form/></main>);}
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
