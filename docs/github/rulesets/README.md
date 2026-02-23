# GitHub Rulesets

This directory contains GitHub ruleset configurations for your repository.

## Files

- **branch-naming-ruleset.json** - Enforces standards on feature/bugfix branches
- **env-protection-ruleset.json** - Protects environment branches (dev, qa, uat, prod)
- **main-protection-ruleset.json** - Strict protection for main/prod branches

## Deployment

Rulesets are automatically deployed to your GitHub repository. They are defined in JSON format and managed via the GitHub API.

### View Deployed Rulesets

```bash
gh api repos/awwwkshay/node-ts-starter/rulesets
```

### Deploy Updates

After modifying a ruleset file:

```bash
# Delete the old ruleset
gh api repos/awwwkshay/node-ts-starter/rulesets/{ID} -X DELETE

# Deploy the new version
curl -X POST \
  -H "Authorization: token $(gh auth token)" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/awwwkshay/node-ts-starter/rulesets \
  --input .github/rulesets/ruleset-name.json
```

## Documentation

See [RULESETS.md](../RULESETS.md) for detailed documentation on all active rulesets and their rules.

---

**Last Updated**: 2026-02-23
