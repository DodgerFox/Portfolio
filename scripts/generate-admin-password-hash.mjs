import { pbkdf2Sync, randomBytes } from 'node:crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/generate-admin-password-hash.mjs "your-strong-password"')
  process.exit(1)
}

const iterations = 210000
const salt = randomBytes(24).toString('hex')
const hash = pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('hex')

console.log('Set these env vars:')
console.log(`VITE_ADMIN_PASSWORD_SALT=${salt}`)
console.log(`VITE_ADMIN_PASSWORD_HASH=${hash}`)
console.log(`VITE_ADMIN_PASSWORD_ITERATIONS=${iterations}`)
