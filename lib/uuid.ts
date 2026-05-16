/** PostgreSQL の UUID 文字列（シードの `10000000-0000-0000-...` なども許容） */
export const PG_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidPgUuid(value: string): boolean {
  return PG_UUID_RE.test(value.trim());
}
