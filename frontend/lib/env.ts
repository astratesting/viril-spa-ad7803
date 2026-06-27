// True when the given env value is present AND not a placeholder used by the
// sandbox/preview. The demo deploy ships with placeholder-but-truthy values
// like "https://placeholder.example.com"; those must NOT enable real backends.
export function isRealEnv(value: string | undefined): boolean {
  if (!value) return false;
  const v = value.trim();
  if (!v) return false;
  return !/placeholder|example\.com|change-me|x{5,}/i.test(v);
}
