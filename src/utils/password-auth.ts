function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashPasswordPbkdf2(params: { password: string; salt: string; iterations?: number; keyLength?: number }) {
  if (!crypto?.subtle) {
    throw new Error('SubtleCrypto is not available in this environment')
  }

  const iterations = params.iterations ?? 210_000
  const keyLength = params.keyLength ?? 32

  const encoder = new TextEncoder()
  const passwordKey = await crypto.subtle.importKey('raw', encoder.encode(params.password), 'PBKDF2', false, ['deriveBits'])

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(params.salt),
      iterations,
      hash: 'SHA-256',
    },
    passwordKey,
    keyLength * 8,
  )

  return toHex(new Uint8Array(bits))
}

export function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false

  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return mismatch === 0
}
