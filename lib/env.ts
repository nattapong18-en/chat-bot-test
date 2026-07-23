import "server-only";

import { z } from "zod";

const optionalEnvironmentValue = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

const environmentSchema = z.object({
  OPENAI_MODEL: optionalEnvironmentValue,
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("CourtFit"),
});

export const env = environmentSchema.parse({
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});
