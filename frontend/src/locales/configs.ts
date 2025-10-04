import i18n from 'one-public-ui/locales/configs'

import { CONSTANT } from '@/common/constants'

// for (const [key, value] of Object.entries(obj)) {

for (const [key, value] of Object.entries(CONSTANT.LANGUAGE_RESOURCES)) {
  i18n.addResources(key, 'translation', value['translation'])
}
