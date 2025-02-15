export const Environment = {
  APP_HOSTNAME: (): string => String(process.env?.APP_HOSTNAME || '127.0.0.1'),
  APP_PORT: (): number => Number(process.env?.APP_PORT || 4000),
  JWT_SECRET: (): string => String(process.env?.JWT_SECRET),
} as const;
