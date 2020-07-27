
/** @type {import('@nuxt/types').Plugin} */
export default (ctx, inject) => {
  function mande(wrappedFn, ...args) {
    return wrappedFn(
      /** @type {import('../src').MandeInstance} */
      (api) => {
        // the plugin can be called during dev in client side with no context
        if (!ctx.req) return

        const reqHeaders = { ...ctx.req.headers }

        // @ts-ignore
        for (let header of <%= serialize(options.proxyHeadersIgnore) %>) {
          delete reqHeaders[header]
        }

        api.options.headers = { ...api.options.headers, ...reqHeaders }

        if (process.server) {
          // Don't accept brotli encoding because Node can't parse it
          api.options.headers['accept-encoding'] = 'gzip, deflate'
        }
      },
      ...args
    )
  }

  ctx.mande = mande
  inject('mande', mande)
}
