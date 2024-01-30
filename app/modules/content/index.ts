import { fileURLToPath } from 'node:url'
import { defineNuxtModule } from 'nuxt/kit'
import type { ModuleOptions as ContentOptions } from '@nuxt/content'
import type { DocsConfig } from '../../../config'

export default defineNuxtModule({
  setup(_, nuxt) {
    const contentConfig = (nuxt.options as any).content as ContentOptions
    const docsConfig = (nuxt.options as any).docs as DocsConfig

    contentConfig.sources = {
      ...contentConfig.sources,
      content: {
        driver: fileURLToPath(new URL('source', import.meta.url)),
        docsConfig
      }
    }
  },
})

