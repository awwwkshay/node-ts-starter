# Raw Scripts

This folder contains utility scripts for repository maintenance and deployment.

## 📋 Available Scripts

### deploy-rulesets.sh

**Purpose**: Deploy GitHub rulesets to the repository

**Usage**:

```bash
chmod +x raw_scripts/deploy-rulesets.sh
./raw_scripts/deploy-rulesets.sh
```

**Description**: Automatically deploys all rulesets from `.github/rulesets/` to GitHub API.

**Requirements**:

- `gh` CLI installed and authenticated
- Repository write permissions
- `jq` for JSON parsing
- `curl` for API calls

---

**Last Updated**: 2026-02-23
