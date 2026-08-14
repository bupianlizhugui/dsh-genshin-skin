/**
 * Minimal local type surface for the DeepSeek Harness client context this skin
 * touches. A standalone skin bundle must NOT depend on the in-repo
 * `@deepseek-ai/dsh-client-*` workspace packages: at runtime `ctx.theme` is a
 * cordis service the host provides, and the client bundle purity gate forbids
 * value-importing those packages anyway. Declaring just the shape we use keeps
 * the package self-contained and buildable from a plain git checkout.
 */

/** One theme override token value for each base palette. */
export interface ThemeTokenModes {
  /** Value applied while the light base palette is active. */
  light: string
  /** Value applied while the dark base palette is active. */
  dark: string
}

/** The public theme service (a subset of DeepSeek Harness's ThemeRuntime). */
export interface ThemeService {
  /**
   * Stack a token override layer over the active theme.
   * @param source - stable layer identity (this package's id).
   * @param tokens - token-name to per-scheme value pairs.
   * @returns a disposer that removes exactly this layer.
   */
  overrideTokens(source: string, tokens: Record<string, ThemeTokenModes>): () => void
}

/** The subset of the client cordis context this skin uses. */
export interface ClientContext {
  /** The theme registry service, injected through `inject = ['theme']`. */
  theme: ThemeService
  /**
   * Register a side effect with a disposer; the framework runs the disposer
   * when the plugin unloads.
   * @param effect - a function returning its own cleanup callback.
   * @param label - optional diagnostic label.
   * @returns a disposer for the registered effect.
   */
  effect(effect: () => () => void, label?: string): () => void
}
