import enTranslation from '@/locales/en.json'
import jaTranslation from '@/locales/ja.json'

/**
 * An immutable object containing constant values used across the application.
 */
export const CONSTANT = {
  LANGUAGE_RESOURCES: {
    en: { translation: enTranslation },
    ja: { translation: jaTranslation },
  },
  ENUM_CATEGORY_TYPE: { CATEGORY: 0, SINGLE: 1, EXTERNAL: 2 },

  ROUTE_URL: {
    ADMIN: '/admin',
    ADMIN_CATEGORY: '/categories',
    ADMIN_CATEGORY_EDIT: '/categories/edit',
  },

  API_URL: {
    CATEGORY_ADMIN: '/categories/admin',
    CATEGORY_ADMIN_ID: '/categories/admin/:id',
  },
} as const
