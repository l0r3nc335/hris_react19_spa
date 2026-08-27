import {
  configureBar,
  finishBar,
  isBarStarted,
  removeBar,
  startBar,
} from './bar'
import type { ProgressOptions } from './types'

let delayMs = 250
let enabled = true
let pendingCount = 0
let showTimer: ReturnType<typeof setTimeout> | null = null
let configured = false

function clearShowTimer(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

/**
 * Configure the top-of-page navigation progress bar.
 * Mirrors Inertia's `createInertiaApp({ progress })` options.
 * Pass `false` to disable.
 */
export function setupProgress(options: ProgressOptions | false = {}): void {
  if (options === false) {
    enabled = false
    clearShowTimer()
    pendingCount = 0
    removeBar()
    configured = true
    return
  }

  enabled = true
  delayMs = options.delay ?? 250
  configureBar({
    color: options.color ?? '#29d',
    includeCSS: options.includeCSS ?? true,
    showSpinner: options.showSpinner ?? false,
  })
  configured = true
}

function ensureConfigured(): void {
  if (!configured) {
    setupProgress()
  }
}

/** Begin a progress cycle (ref-counted; safe to call from multiple sources). */
export function progressStart(): void {
  ensureConfigured()
  if (!enabled) return

  pendingCount += 1
  if (pendingCount !== 1) return

  clearShowTimer()
  showTimer = setTimeout(() => {
    showTimer = null
    startBar()
  }, delayMs)
}

/** End a progress cycle. Finishes the bar when the last cycle completes. */
export function progressDone(): void {
  if (!enabled) return

  pendingCount = Math.max(0, pendingCount - 1)
  if (pendingCount > 0) return

  clearShowTimer()
  if (isBarStarted()) {
    finishBar()
  }
}

/** Force-finish regardless of pending count (e.g. hard navigation cancel). */
export function progressForceDone(): void {
  if (!enabled) return
  pendingCount = 0
  clearShowTimer()
  if (isBarStarted()) {
    finishBar()
  } else {
    removeBar()
  }
}
