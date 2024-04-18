import { z } from "zod";

export const SettingsValidator = z.object({
  outputPath: z.string().optional(),
  outputTemplate: z.string().optional(),
  turboMode: z.boolean().optional(),
});

export type ISettings = z.infer<typeof SettingsValidator>;
