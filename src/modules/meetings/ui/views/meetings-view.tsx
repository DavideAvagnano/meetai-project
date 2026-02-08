'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';

export const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const MeetingsViewLoading = () => {
  return <LoadingState title="Loading Meetings" description="This may take a fews econds" />;
};

export const MeetingsViewError = () => {
  return <ErrorState title="Error Loading Meetings" description="Something went wrong" />;
};
