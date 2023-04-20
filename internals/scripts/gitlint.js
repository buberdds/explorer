// @ts-check
const execSync = require('child_process').execSync

const GIT_ORIGIN_REMOTE = 'origin'
const RELEASE_BRANCH = 'master'
const BRANCH = `${GIT_ORIGIN_REMOTE}/${RELEASE_BRANCH}`
const COMMIT_SHA = require('child_process').execSync(`git rev-parse ${BRANCH}`).toString().trim()

console.log(`*** Running gitlint for commits from ${BRANCH} (${COMMIT_SHA})`)
execSync(`gitlint --commits ${BRANCH}..HEAD`, { stdio: 'inherit' })
