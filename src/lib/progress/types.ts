/** Options mirror Inertia's `createInertiaApp({ progress })` API. */
export type ProgressOptions = {
  /** ms to wait before showing the bar (avoids flash on fast navigations). Default: 250 */
  delay?: number
  /** Bar / spinner color. Default: `#29d` */
  color?: string
  /** Inject default NProgress-like CSS. Default: true */
  includeCSS?: boolean
  /** Show corner spinner. Default: false */
  showSpinner?: boolean
}
