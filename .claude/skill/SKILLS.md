# Cloudflare Pages Manager

Manage and debug Cloudflare Pages deployments directly from Claude Code.

## Overview

This skill provides tools to check deployment status, view build logs, troubleshoot errors, and manage Cloudflare Pages projects.

## Commands

Use `/cf-pages` to invoke this skill.

## Instructions

When this skill is invoked, help the user manage their Cloudflare Pages deployment by:

1. **Check Deployment Status**
   - Use the Cloudflare API to fetch deployment information
   - API endpoint: `https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}/deployments`
   - Requires: `CF_API_TOKEN` and `CF_ACCOUNT_ID` environment variables

2. **View Build Logs**
   - Fetch the latest deployment logs
   - Display build errors and warnings clearly
   - Help identify common issues like missing dependencies, build command errors, or configuration problems

3. **Troubleshoot Common Errors**
   - **Build failures**: Check build command, output directory, and environment variables
   - **Missing dependencies**: Verify package.json and lock files are committed
   - **Content schema errors**: Check frontmatter in markdown files matches content collection schema
   - **Framework detection**: Ensure framework preset is set correctly (Astro, Next.js, etc.)

4. **Deployment Information**
   - Show deployment URL (both preview and production)
   - Display build time and status
   - List environment variables (names only, not values)

## API Setup

To use this skill, set environment variables:

```bash
export CF_API_TOKEN="your_cloudflare_api_token"
export CF_ACCOUNT_ID="your_account_id"
```

Get your API token from: https://dash.cloudflare.com/profile/api-tokens

## Examples

**Check latest deployment:**
```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/samhesson-blog/deployments" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json"
```

**Get deployment logs:**
```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/samhesson-blog/deployments/{deployment_id}/logs" \
  -H "Authorization: Bearer $CF_API_TOKEN"
```

## Usage

After setting up your API credentials, invoke with `/cf-pages` and specify what you need:
- "check status" - Get current deployment status
- "show logs" - Display latest build logs
- "list deployments" - Show recent deployment history
- "troubleshoot" - Help debug a failed deployment

## Notes

- This skill requires Cloudflare API access
- API token needs `Cloudflare Pages:Read` permission at minimum
- For write operations (deploy, rollback), needs `Cloudflare Pages:Edit` permission
