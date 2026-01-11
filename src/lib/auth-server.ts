import { auth } from './auth';

export const getServerAuthSession = async (headers: Headers) => {
  return await auth.api.getSession({ headers });
};

export type ServerSession = Awaited<ReturnType<typeof getServerAuthSession>>;
