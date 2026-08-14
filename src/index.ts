/**
 * Genshin skin bundle, node half. Presentation-only plugin: the empty `apply`
 * exists so the plugin appears in the host Loader tree, which lets the DeepSeek
 * Harness client-module scanner discover the browser half through this
 * package's `dsh.client` declaration. All skin behavior ships via
 * `exports["./client"]`.
 */

/** Plugin name shown in the host loader tree. */
export const name = 'dsh-genshin-skin'

/** Host plugin body — no host-side behavior for this presentation plugin. */
export function apply(): void {}
