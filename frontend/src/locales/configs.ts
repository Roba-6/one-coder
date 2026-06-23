import { i18n } from 'one-public-ui'

import { CONSTANT } from '@/common/constants'

for (const [key, value] of Object.entries(CONSTANT.LANGUAGE_RESOURCES)) {
  i18n.addResourceBundle(key, 'translation', value['translation'])
}
