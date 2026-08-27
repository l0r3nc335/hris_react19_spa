const ID = 'nprogress'

type BarSettings = {
  minimum: number
  speed: number
  trickleSpeed: number
  showSpinner: boolean
  color: string
  includeCSS: boolean
}

const settings: BarSettings = {
  minimum: 0.08,
  speed: 200,
  trickleSpeed: 200,
  showSpinner: false,
  color: '#29d',
  includeCSS: true,
}

let status: number | null = null
let trickleTimer: ReturnType<typeof setTimeout> | null = null
let styleEl: HTMLStyleElement | null = null

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function toBarPercentage(n: number): number {
  return (-1 + n) * 100
}

function injectCSS(color: string): void {
  styleEl?.remove()
  styleEl = document.createElement('style')
  styleEl.setAttribute('data-nprogress', '')
  styleEl.textContent = `
    #${ID} {
      pointer-events: none;
      background: none;
      border: none;
      margin: 0;
      padding: 0;
      overflow: visible;
      width: 100%;
      height: 0;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1031;
    }
    #${ID} .bar {
      background: ${color};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    #${ID} .peg {
      display: block;
      position: absolute;
      right: 0;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }
    #${ID} .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }
    #${ID} .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;
      animation: ${ID}-spinner 400ms linear infinite;
    }
    @keyframes ${ID}-spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(styleEl)
}

function ensureElement(): HTMLElement {
  let el = document.getElementById(ID)
  if (el) return el

  el = document.createElement('div')
  el.id = ID
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = [
    '<div class="bar"><div class="peg"></div></div>',
    '<div class="spinner"><div class="spinner-icon"></div></div>',
  ].join('')

  if (!settings.showSpinner) {
    el.querySelector('.spinner')?.remove()
  }

  document.body.appendChild(el)
  return el
}

function set(n: number): void {
  const started = status !== null
  n = clamp(n, settings.minimum, 1)
  status = n === 1 ? null : n

  const el = ensureElement()
  const bar = el.querySelector<HTMLElement>('.bar')
  if (!bar) return

  if (!started) {
    bar.style.transition = 'none'
    bar.style.transform = `translate3d(${toBarPercentage(0)}%,0,0)`
    void el.offsetWidth
  }

  bar.style.transition = `all ${settings.speed}ms linear`
  bar.style.transform = `translate3d(${toBarPercentage(n)}%,0,0)`

  if (n === 1) {
    el.style.transition = `opacity ${settings.speed}ms linear`
    el.style.opacity = '1'
    void el.offsetWidth
    el.style.opacity = '0'
    window.setTimeout(() => {
      el.remove()
      el.style.transition = ''
      el.style.opacity = ''
    }, settings.speed)
  }
}

function trickle(): void {
  if (status === null) return
  const n = status
  let amount = 0
  if (n >= 0 && n < 0.2) amount = 0.1
  else if (n >= 0.2 && n < 0.5) amount = 0.04
  else if (n >= 0.5 && n < 0.8) amount = 0.02
  else if (n >= 0.8 && n < 0.99) amount = 0.005
  set(clamp(n + amount, 0, 0.994))
  trickleTimer = setTimeout(trickle, settings.trickleSpeed)
}

export function configureBar(options: Partial<BarSettings>): void {
  Object.assign(settings, options)
  if (settings.includeCSS) {
    injectCSS(settings.color)
  } else {
    styleEl?.remove()
    styleEl = null
  }
}

export function startBar(): void {
  if (status === null) {
    set(0)
  }
  if (trickleTimer === null) {
    trickleTimer = setTimeout(trickle, settings.trickleSpeed)
  }
}

export function finishBar(): void {
  if (trickleTimer !== null) {
    clearTimeout(trickleTimer)
    trickleTimer = null
  }
  if (status === null) return
  set(1)
}

export function isBarStarted(): boolean {
  return status !== null
}

export function removeBar(): void {
  if (trickleTimer !== null) {
    clearTimeout(trickleTimer)
    trickleTimer = null
  }
  status = null
  document.getElementById(ID)?.remove()
}
