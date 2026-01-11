import { getServerAuthSession } from '@/lib/auth-server';
import { HomeView } from '@/modules/home/ui/views/home-view';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession(await headers());

  if (!session) {
    redirect('/sign-in');
  }

  return <HomeView />;
}
