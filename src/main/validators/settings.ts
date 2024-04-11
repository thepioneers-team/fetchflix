import { z } from "zod";

export const SettingsValidator = z.object({
  outputPath: z.string().optional(),
  outputTemplate: z.string().optional(),
});

export type ISettings = z.infer<typeof SettingsValidator>;
