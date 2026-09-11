/** Static asset paths work both at the domain root and under a GitHub project URL. */
export function publicPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}

export const leadsEndpoint = process.env.NEXT_PUBLIC_LEADS_URL || "/api/leads";
