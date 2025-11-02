export function uid(prefix = 'id'): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

