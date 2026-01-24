import z from 'zod';
import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema } from '../schemas';
import { and, count, desc, eq, getTableColumns, ilike, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '@/constants';

export const agentsRouter = createTRPCRouter({
  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ input, ctx }) => {
    const [createdAgent] = await db
      .insert(agents)
      .values({
        ...input,
        userId: ctx.auth.user.id,
      })
      .returning();

    return createdAgent;
  }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const [existingAgent] = await db
      .select({
        ...getTableColumns(agents),
        meetingCount: sql<number>`5`,
        // TODO: change to actual meeting count
      })
      .from(agents)
      .where(eq(agents.id, input.id));

    return existingAgent;
  }),

  getMany: protectedProcedure.query(async ({ ctx, input }) => {
    const data = await db.select().from(agents);

    return data;
  }),
});
