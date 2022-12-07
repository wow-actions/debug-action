/* eslint-disable no-console */

import fs from 'fs'
import crypto from 'crypto'

function printPayload() {
  const filepath = process.env.GITHUB_EVENT_PATH
  if (filepath && fs.existsSync(filepath)) {
    const payload = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }))
    console.log(JSON.stringify(payload, null, 2))
  }
}

const resumeToken = crypto.randomBytes(30).toString('base64')

// Output environment variables. Secrets are automatically masked.
console.log('::group::Environment Variables')
console.log(`::stop-commands::${resumeToken}`)

// printEnvs()
// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(process.env).sort()) {
  console.log(`${key}=${value}`)
}

console.log(`::${resumeToken}::`)
console.log('::endgroup::')

// Output prettified event JSON.
console.log('::group::Event Payload')
console.log(`::stop-commands::${resumeToken}`)

printPayload()

console.log(`::${resumeToken}::`)
console.log('::endgroup::')
