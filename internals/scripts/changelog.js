const execSync = require('child_process').execSync
const semver = require('semver')
const glob = require('glob')
const packageJson = require('../../package.json')

const folderPath = '.changelog/'
const majorPattern = `${folderPath}'*breaking*.md'`
const minorPattern = `${folderPath}'*feature*.md'`
const patchPattern = `${folderPath}*{process,cfg,bugfix,doc,internal,trivial}*.md`

let version = packageJson.version
if (glob.sync(majorPattern).length > 0) {
  version = semver.inc(version, 'major')
} else if (glob.sync(minorPattern).length > 0) {
  version = semver.inc(version, 'minor')
} else if (glob.sync(patchPattern).length > 0) {
  version = semver.inc(version, 'patch')
} else {
  console.log('No change log fragments for a release found.')
  process.exit(1)
}

if (!semver.valid(version)) {
  console.log(`Invalid version: ${version}`)
  process.exit(1)
}

if (semver.lte(version, packageJson.version)) {
  console.log(`Version ${version} is not greater than ${packageJson.version}`)
  process.exit(1)
}

execSync(`yarn version --new-version ${version}`, { stdio: 'inherit' })
execSync(`towncrier build --version ${version}`, { stdio: 'inherit' })
