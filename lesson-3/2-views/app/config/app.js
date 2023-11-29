export const DOMAIN = process.env.APP_DOMAIN ?? 'localhost';
export const PROTOCOL = process.env.APP_PROTOCOL ?? 'http';
export const PORT = process.env.APP_PROTOCOL ?? 3000;
export const HOST = `${PROTOCOL}://${DOMAIN}:${PORT}`; // mb variant without :port