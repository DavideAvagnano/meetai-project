import { getServerAuthSession } from '@/lib/auth-server';
import { SignInView } from '@/modules/auth/ui/views/sign-in-view';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerAuthSession(await headers());

  if (!!session) {
    redirect('/');
  }

  return <SignInView />;
}
