const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function normalizeBase32(input: string) {
  return input.toUpperCase().replace(/[^A-Z2-7]/g, '')
}

export function generateBase32Secret(length = 32) {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto API is not available in this environment')
  }

  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)

  let output = ''
  for (let i = 0; i < bytes.length; i++) {
    output += BASE32_ALPHABET[bytes[i] % BASE32_ALPHABET.length]
  }

  return output
}

function base32ToBytes(base32: string) {
  const normalized = normalizeBase32(base32)
  let bits = ''

  for (const char of normalized) {
    const value = BASE32_ALPHABET.indexOf(char)
    if (value < 0) throw new Error('Invalid base32 character')
    bits += value.toString(2).padStart(5, '0')
  }

  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2))
  }

  return new Uint8Array(bytes)
}

function numberTo8ByteArray(counter: number) {
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)

  const high = Math.floor(counter / 0x100000000)
  const low = counter >>> 0

  view.setUint32(0, high)
  view.setUint32(4, low)

  return new Uint8Array(buffer)
}

async function hotp(secretBase32: string, counter: number, digits = 6) {
  if (!crypto?.subtle) {
    throw new Error('SubtleCrypto is not available in this environment')
  }

  const keyData = base32ToBytes(secretBase32)
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, numberTo8ByteArray(counter))
  const hmac = new Uint8Array(signature)

  const offset = hmac[hmac.length - 1] & 0x0f
  const codeInt = ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff)

  return String(codeInt % 10 ** digits).padStart(digits, '0')
}

export async function generateTotpCode(secretBase32: string, period = 30, digits = 6, timestamp = Date.now()) {
  const counter = Math.floor(timestamp / 1000 / period)
  return hotp(secretBase32, counter, digits)
}

export async function verifyTotpCode(secretBase32: string, code: string, options?: { period?: number; digits?: number; window?: number }) {
  const period = options?.period ?? 30
  const digits = options?.digits ?? 6
  const window = options?.window ?? 1
  const normalizedCode = String(code || '').replace(/\D/g, '')

  if (normalizedCode.length !== digits) return false

  const currentCounter = Math.floor(Date.now() / 1000 / period)

  for (let offset = -window; offset <= window; offset++) {
    const expected = await hotp(secretBase32, currentCounter + offset, digits)
    if (expected === normalizedCode) return true
  }

  return false
}

export function buildOtpAuthUri(params: { secret: string; accountName: string; issuer: string; period?: number; digits?: number }) {
  const issuer = encodeURIComponent(params.issuer)
  const account = encodeURIComponent(params.accountName)
  const secret = normalizeBase32(params.secret)
  const period = params.period ?? 30
  const digits = params.digits ?? 6

  return `otpauth://totp/${issuer}:${account}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=${digits}&period=${period}`
}
