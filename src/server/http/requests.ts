import type { ZodType } from "zod";

export async function parseJsonBody<T>(request: Request, schema: ZodType<T>) {
  const body = await request.json();
  return schema.parse(body);
}
