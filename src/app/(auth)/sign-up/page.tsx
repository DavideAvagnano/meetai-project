import { getServerAuthSession } from '@/lib/auth-server';
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getServerAuthSession(await headers());

  if (!!session) {
    redirect('/');
  }

  return <SignUpView />;
}
