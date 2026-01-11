import { getServerAuthSession, ServerSession } from '@/lib/auth-server';
import { initTRPC, TRPCError } from '@trpc/server';

export const createTRPCContext = async (headers: Headers) => {
  const auth = await getServerAuthSession(headers);
  return { headers, auth };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  if (!ctx.auth?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth as NonNullable<typeof ctx.auth>,
    },
  });
});
