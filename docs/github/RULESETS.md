# GitHub Rulesets Configuration

All GitHub rulesets for branch protection, naming conventions, and environment-specific rules have been successfully deployed to your repository.

## ✅ Deployed Rulesets

### 1. branch-naming-convention (ID: 13118747)

**Purpose**: Enforce standards for non-protected branches

**Applies to**: All branches except `main`, `dev`, `qa`, `uat`, `prod`

**Rules**:

- ✅ Deletion protection
- ✅ Required linear history (no merge commits)

---

### 2. env-protection (ID: 13118744)

**Purpose**: Protect environment-specific deployment branches

**Applies to**: `dev`, `qa`, `uat`, `prod`

**Rules**:

- ✅ Deletion protection
- ✅ Required linear history
- ✅ Pull Request required:
  - Minimum 1 approval required
  - Review thread resolution required
  - Allows merge, squash, and rebase

---

### 3. main-strict-protection (ID: 13118752)

**Purpose**: Enforce strict protection on production branches

**Applies to**: `main`, `prod`

**Rules**:

- ✅ Deletion protection
- ✅ Required linear history
- ✅ Pull Request required:
  - Minimum 2 approvals required
  - Code owner review required
  - Last push approval required
  - Review thread resolution required
  - Allows merge, squash, and rebase

---

## 📋 Branch Protection Summary

| Branch | PR Required | Approvals | Code Owner | Last Push | Linear History | Deletion Protected |
| ------ | :---------: | :-------: | :--------: | :-------: | :------------: | :----------------: |
| main | ✅ | 2 | ✅ | ✅ | ✅ | ✅ |
| prod | ✅ | 2 | ✅ | ✅ | ✅ | ✅ |
| dev | ✅ | 1 | ❌ | ❌ | ✅ | ✅ |
| qa | ✅ | 1 | ❌ | ❌ | ✅ | ✅ |
| uat | ✅ | 1 | ❌ | ❌ | ✅ | ✅ |
| * | ❌ | - | - | - | ✅ | ✅ |

---

## 🔧 Managing Rulesets

### View Rulesets

```bash
gh api repos/awwwkshay/node-ts-starter/rulesets
```

### View Specific Ruleset

```bash
gh api repos/awwwkshay/node-ts-starter/rulesets/13118747
```

### Update a Ruleset

1. Modify the JSON file in `.github/rulesets/`
2. Delete the old ruleset: `gh api repos/awwwkshay/node-ts-starter/rulesets/{ID} -X DELETE`
3. Redeploy: `curl -X POST -H "Authorization: token $(gh auth token)" ... --input ruleset.json`

### Delete a Ruleset

```bash
gh api repos/awwwkshay/node-ts-starter/rulesets/{ID} -X DELETE
```

---

## 📚 Ruleset Source Files

All rulesets are stored in version control:

- `.github/rulesets/branch-naming-ruleset.json`
- `.github/rulesets/env-protection-ruleset.json`
- `.github/rulesets/main-protection-ruleset.json`

These files serve as your source of truth for ruleset configuration.

---

## 🚀 Developer Workflow

### Creating Feature Branches

Feature branches (e.g., `feature/awesome-feature`, `bugfix/issue-123`) enforce:

- Linear history (no merge commits)
- Can be deleted freely
- No PR approval required

### Merging to Environment Branches

When merging to `dev`, `qa`, or `uat`:

- Pull request required
- 1 approval minimum
- All review threads must be resolved
- Linear history maintained

### Merging to Production

When merging to `main` or `prod`:

- Pull request required
- 2 approvals minimum
- Code owner review required
- Last push approval required
- All review threads must be resolved
- Linear history maintained

---

## ⚙️ Configuration Details

### Merge Methods Allowed

All rulesets allow the following merge methods:

- Merge (create a merge commit)
- Squash and merge (squash commits into one)
- Rebase and merge (rebase commits)

### Allowed Merge Methods

For pull requests, you can:

- ✅ Merge commits
- ✅ Squash commits
- ✅ Rebase commits

---

## 🔐 GitHub UI Access

To manage rulesets via GitHub UI:

1. Go to Settings → Rules → Rulesets
2. View, edit, or delete rulesets
3. Monitor which rules are enforced

**URL**: <https://github.com/awwwkshay/node-ts-starter/settings/rules>

---

## 📝 Notes

- Rulesets apply to all users including administrators
- Bypassing rulesets requires explicit admin action and is logged in audit logs
- Rulesets are organization/repository-level settings
- Test rulesets in a staging environment before production use

---

**Last Updated**: 2026-02-23
**Repository**: awwwkshay/node-ts-starter
