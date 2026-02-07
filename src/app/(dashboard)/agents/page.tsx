export const dynamic = 'force-dynamic';

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AgentsView, AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/view/agents-view';
import { AgentsListHeader } from '@/modules/agents/ui/components/agents-list-header';
import { getServerAuthSession } from '@/lib/auth-server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/agents/params';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function AgentsPage({ searchParams }: Props) {
  const filters = await loadSearchParams(searchParams);

  const session = await getServerAuthSession(await headers());

  if (!session) {
    redirect('/sign-in');
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({ ...filters }));

  return (
    <>
      <AgentsListHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
