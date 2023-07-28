import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Head from "next/head";
import "~/styles/globals.css";
import SideNav from "~/components/SideNav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>wAve</title>
        <meta name="description" content="Music sharing social media app wAve" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex items-start bg-slate-100">
        <SideNav />
        <div className="min-h-screen flex-grow">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
