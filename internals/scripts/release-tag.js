const execSync = require('child_process').execSync
const readline = require('readline')
const packageJson = require('../../package.json')

const version = packageJson.version
const tag = `v${version}`
const releaseBranch = process.env.RELEASE_BRANCH || 'master'
const originRemote = process.env.GIT_ORIGIN_REMOTE || 'origin'

execSync(`git fetch origin --tags`, { stdio: 'inherit' })
console.log(`Checking if we can tag version ${version} as the next release...`)

function ensureValidReleaseBranchName() {
  const validReleaseBranchRegex = /^(master|(stable\/[0-9]+\.[0-9]+\.x$))$/
  if (!validReleaseBranchRegex.test(releaseBranch)) {
    console.error(`Error: Invalid release branch name: '${releaseBranch}'.`)
    process.exit(1)
  }
}

function ensureReleaseTagDosNotExist() {
  const tags = execSync(`git tag --list ${tag}`, { stdio: 'pipe' })
  if (tags.toString().trim() !== '') {
    console.log(`Tag ${tag} already exists. Please bump the version in package.json.`)
    process.exit(1)
  }
}

function ensureNoChangelogFragments() {
  try {
    const changelogFiles = execSync(`git ls-tree -r --name-only ${originRemote}/${releaseBranch} .changelog`)
      .toString()
      .trim()
    const changelogFragments = changelogFiles
      .split('\n')
      .filter(filename => !/(README\.md|template\.md\.j2|\.markdownlint\.yml)$/.test(filename))

    if (changelogFragments.length > 0) {
      console.error(
        `Error: Found the following Change Log fragments on ${originRemote}/${releaseBranch} branch:\n${changelogFragments.join(
          '\n',
        )}`,
      )
      process.exit(1)
    }
  } catch (err) {
    console.error(`Error: Could not obtain Change Log fragments for ${originRemote}/${releaseBranch} branch.`)
    process.exit(1)
  }
}

function ensureNextReleaseInChangelog() {
  try {
    execSync(`git show ${originRemote}/${releaseBranch}:CHANGELOG.md | grep '^## ${version} (.*)'`)
  } catch (error) {
    console.error(
      `Error: Could not locate Change Log section for release ${version} on ${originRemote}/${releaseBranch} branch.`,
    )
    process.exit(1)
  }
}

ensureValidReleaseBranchName()
ensureReleaseTagDosNotExist()
ensureNoChangelogFragments()
ensureNextReleaseInChangelog()

console.log(`All checks have passed. Proceeding with tagging the origin/master's HEAD with tag '${tag}'.`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Are you sure you want to continue? (y/n) ', answer => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log(
      'If this appears to be stuck, you might need to touch your security key for GPG sign operation.',
    )
    execSync(`git tag --sign --message="Version ${version}" ${tag} origin/master`, { stdio: 'inherit' })
    execSync(`git push origin ${tag}`, { stdio: 'inherit' })
    console.log('\x1b[36m%s\x1b[0m', `Tag ${tag} has been successfully pushed to origin remote.`)
  } else {
    console.log('Tag release cancelled!')
  }
  rl.close()
})
