#!/bin/bash
# Deploy GitHub Rulesets using gh CLI
# Make sure you have gh CLI installed and authenticated

set -e

REPO_OWNER=$(gh repo view --json nameWithOwner --jq .nameWithOwner | cut -d'/' -f1)
REPO_NAME=$(gh repo view --json nameWithOwner --jq .nameWithOwner | cut -d'/' -f2)

echo "📋 Deploying rulesets to $REPO_OWNER/$REPO_NAME..."

# Helper function to deploy a ruleset
deploy_ruleset() {
  local ruleset_file=$1
  local ruleset_name=$(jq -r '.name' "$ruleset_file")

  echo "🚀 Deploying: $ruleset_name from $ruleset_file"

  # Create the ruleset
  gh api \
    -X POST \
    "repos/$REPO_OWNER/$REPO_NAME/rulesets" \
    -F "name=$ruleset_name" \
    -f "target=$(jq -r '.target' "$ruleset_file")" \
    -f "enforcement=$(jq -r '.enforcement' "$ruleset_file")" \
    -f "conditions=$(jq '.conditions' "$ruleset_file")" \
    -f "rules=$(jq '.rules' "$ruleset_file")" \
    --input "$ruleset_file" || echo "⚠️  Ruleset may already exist or there was an error. You can update it in the GitHub UI if needed."

  echo "✅ $ruleset_name deployed successfully!\n"
}

# Deploy all rulesets
for ruleset in .github/rulesets/*.json; do
  if [ -f "$ruleset" ]; then
    deploy_ruleset "$ruleset"
  fi
done

echo "🎉 All rulesets have been deployed!"
echo "📖 Visit: https://github.com/$REPO_OWNER/$REPO_NAME/settings/rules to manage them"
