# Auto-Approve Policy for Owner

## Overview

This repository is configured to automatically approve pull requests created by the repository owner (`awwwkshay`) during the solo development phase.

## How It Works

1. **You create a PR** - Push your branch and create a pull request
2. **Automatic approval** - GitHub Action automatically approves the PR
3. **You review & merge** - Review your own changes and merge when satisfied
4. **Rulesets enforce** - All branch protection rules still apply (linear history, deletion protection, etc.)

## Workflow File

**Location**: `.github/workflows/auto-approve-owner-pr.yml`

**Triggers**:

- When a PR is opened by `awwwkshay`
- When a PR is marked as ready for review

## Benefits

- ✅ Maintains best practices (code review via PR)
- ✅ Keeps audit trail of all changes
- ✅ All branch protection rules still apply
- ✅ Easy to disable when team members join
- ✅ Automatic removal of approval blockers for owner

## For Team Members (Future)

When new developers join:

1. **Remove auto-approve action** (optional):

```bash
rm .github/workflows/auto-approve-owner-pr.yml
```

1. **Increase approval requirements** in rulesets:

   - Add more reviewers
   - Update `required_approving_review_count`
   - Add code owner reviews

1. **Create CODEOWNERS file**:

```bash
echo "* @awwwkshay @other-maintainer" > .github/CODEOWNERS
```

## Workflow Details

### Permissions

- `pull-requests: write` - To approve PRs
- `contents: read` - To read repository content

### Conditions

- Only approves if PR author is `awwwkshay`
- Does NOT automatically merge (manual control)
- Does NOT bypass ruleset requirements

### What Still Applies

- ✅ Linear history requirement
- ✅ Branch deletion protection
- ✅ Ruleset enforcement
- ✅ Status checks (if configured)
- ✅ Commit message patterns (if enabled)

## Testing the Workflow

1. Create a test branch:

```bash
git checkout -b feature/test-auto-approve
```

1. Make a small change:

```bash
echo "test" >> README.md
```

1. Create a PR:

```bash
git add .
git commit -m "test: verify auto-approve workflow"
git push -u origin feature/test-auto-approve
gh pr create
```

1. Check PR status:

```bash
gh pr view --web
```

The PR should be automatically approved within seconds!

## Disabling Auto-Approve

### Temporary Disable

Add this to a commit message to skip auto-approval:

```text
[skip-auto-approve]
```

### Permanent Disable

Delete the workflow file:

```bash
rm .github/workflows/auto-approve-owner-pr.yml
```

## Monitoring

Check auto-approvals in GitHub UI:

1. Go to Pull Requests
2. Click on any PR with auto-approval
3. Check the review section for "GitHub Action" approval

Or via CLI:

```bash
gh pr view <PR_NUMBER> --json reviews
```

---

**Last Updated**: 2026-02-23
**Active For**: awwwkshay
**Repository**: awwwkshay/node-ts-starter
