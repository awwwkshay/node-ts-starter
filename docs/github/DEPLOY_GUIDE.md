# GitHub Ruleset Deployment Guide

## Prerequisites

- `gh` CLI installed and authenticated
- Repository write permissions

## Deployment Methods

### Method 1: Using Direct gh Commands

#### 1. Deploy Branch Naming Convention Ruleset

```bash
gh api repos/:owner/:repo/rulesets \
  --input .github/rulesets/branch-naming-ruleset.json
```

#### 2. Deploy Environment Protection Ruleset

```bash
gh api repos/:owner/:repo/rulesets \
  --input .github/rulesets/env-protection-ruleset.json
```

#### 3. Deploy Main Protection Ruleset

```bash
gh api repos/:owner/:repo/rulesets \
  --input .github/rulesets/main-protection-ruleset.json
```

### Method 2: Using the Helper Script

```bash
chmod +x deploy-rulesets.sh
./deploy-rulesets.sh
```

### Method 3: Via GitHub UI

1. Go to Settings → Rules → Rulesets
2. Click "New repository ruleset"
3. Copy the JSON from each `.github/rulesets/*.json` file

## Verifying Deployment

```bash
# List all rulesets in your repository
gh api repos/:owner/:repo/rulesets

# Get details of a specific ruleset
gh api repos/:owner/:repo/rulesets -f name=branch-naming-convention
```

## Ruleset Descriptions

### branch-naming-convention

- **Purpose**: Enforce consistent branch naming patterns
- **Pattern**: `(feature|bugfix|hotfix|chore|refactor|docs|test|ci|perf|style|revert)/kebab-case`
- **Exceptions**: main, dev, qa, uat, prod branches

### env-protection

- **Purpose**: Protect environment-specific branches (dev, qa, uat, prod)
- **Rules**:
  - Required linear history
  - 1 review approval required
  - Commit message pattern enforcement
  - Thread resolution required
  - Only integrations can create branches

### main-protection

- **Purpose**: Strict protection for main/prod branches
- **Rules**:
  - Required linear history
  - 2 review approvals required
  - Code owner review required
  - Last push approval required
  - Commit message and author pattern enforcement
  - Only integrations can create branches

## Updating Existing Rulesets

```bash
# Delete a ruleset (get ID from list command)
gh api repos/:owner/:repo/rulesets/:ruleset_id -X DELETE

# Then redeploy with the new configuration
gh api repos/:owner/:repo/rulesets \
  --input .github/rulesets/ruleset-name.json
```

## Bypassing Rulesets (for emergency)

Repository admins can bypass rulesets, but it's logged in audit logs:

```bash
# This requires admin access
gh api repos/:owner/:repo/rulesets/:ruleset_id/bypass \
  -f actor_type=RepositoryRole \
  -f actor_id=admin
```
