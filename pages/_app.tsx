import '@/styles/globals.css';import type { AppProps } from 'next/app';import Head from 'next/head';export default function App({Component,pageProps}:AppProps){return(<><Head><title>Akış Bilinci</title><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="description" content="Akış Bilinci — Gözlemler uygulaması"/></Head><div className="max-w-3xl mx-auto px-4 py-6"><header className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">Akış Bilinci</h1><nav className="flex items-center gap-3 text-sm"><a className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2" href="/">Liste</a><a className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2" href="/new">Yeni</a><a className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2" href="/logs">Kayıtlar</a></nav></header><Component {...pageProps}/><footer className="mt-10 text-center text-xs text-gray-400"><span>© {new Date().getFullYear()} Akış Bilinci</span></footer></div></>)}
import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="tr">
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content="Akış Bilinci" />
          <meta property="og:description" content="Akış Bilinci — Gözlemler" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
