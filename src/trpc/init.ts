import { getServerAuthSession, ServerSession } from '@/lib/auth-server';
import { initTRPC, TRPCError } from '@trpc/server';

export const createTRPCContext = async (headers: Headers) => {
  const session = await getServerAuthSession(headers);
  return { headers, session };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session as NonNullable<typeof ctx.session>,
    },
  });
});
