import { fileURLToPath } from 'node:url'
import { defineNuxtModule } from 'nuxt/kit'
import type { ModuleOptions as ContentOptions } from '@nuxt/content'
import type { DocsConfig } from '../../../schema/config'

export default defineNuxtModule({
  setup(_, nuxt) {
    if (nuxt.options._prepare) {
      return
    }

    const docsConfig = (nuxt.options as any).docs as DocsConfig

    if (docsConfig.landing === false) {
      nuxt.hooks.hook('pages:extend', (pages) => {
        const index = pages.findIndex((page) => page.path === '/')
        if (index !== -1) {
          pages.splice(index, 1)
        }
      })
    }

    const contentConfig = (nuxt.options as any).content as ContentOptions
    contentConfig.sources = {
      ...contentConfig.sources,
      content: {
        driver: fileURLToPath(new URL('source.mjs', import.meta.url)),
        docsConfig,
      },
    }
  },
})