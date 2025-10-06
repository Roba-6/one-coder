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
    POST: '/posts',
    POST_ID: '/posts/:id',
    POST_EDIT: '/posts/edit',
  },

  API_URL: {
    CATEGORY_ADMIN: '/categories/admin',
    CATEGORY_ADMIN_ID: '/categories/admin/:id',
    POST: '/posts',
    POST_ID: '/posts/:id',
    POST_ADMIN: '/posts/admin',
    POST_ADMIN_ID: '/posts/admin/:id',
  },
} as const
