export const THEME_NAMES = ['emerald', 'violet', 'amber', 'crimson', 'lime', 'rose'] as const;

export type ThemeName = (typeof THEME_NAMES)[number];
