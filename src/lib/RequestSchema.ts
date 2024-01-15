import { z } from 'zod';

export const RequestSchema = z.object({
  url: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
  body: z.object({
    type: z.enum(['raw', 'form-data', 'none']),
    params: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    raw: z
      .object({
        type: z.enum(['text', 'json']),
        value: z.string(),
      })
      .optional(),
  }),
  params: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
});

export type Request = z.infer<typeof RequestSchema>;
