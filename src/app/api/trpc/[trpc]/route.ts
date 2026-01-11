import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req }) => createTRPCContext(req.headers),
    onError: ({ path, error }) => {
      console.error('-----------error-trace-----------');
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message} 
        ${error.cause ? '---' + JSON.stringify(error.cause) : ''}`,
      );
      if (error.stack) console.error(error.stack);
      console.error('------------end-trace------------');
    },
  });

export { handler as GET, handler as POST };
