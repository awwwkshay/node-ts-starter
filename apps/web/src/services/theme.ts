import { Theme, themeSchema } from "@/schemas";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

const storageKey = "_preferred-theme";

export const getThemeServerFn = createServerFn().handler(
  async () => (getCookie(storageKey) || "system") as Theme,
);

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(themeSchema)
  .handler(async ({ data }) => setCookie(storageKey, data));