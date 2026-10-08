export const FOUNDED_YEAR = 2006;

// Computed at build time, so it stays correct with each deploy.
export const YEARS_IN_BUSINESS = new Date().getFullYear() - FOUNDED_YEAR;
