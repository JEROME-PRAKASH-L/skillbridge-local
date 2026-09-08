# Contributing to SkillBridge Local

SkillBridge Local is an MVP for connecting local businesses with students for scoped technical tasks.

## Before you start

- Read the project README and understand the demo-only boundaries.
- Never commit Supabase secrets, service-role keys, personal data, or real payment information.
- Keep changes focused on one user workflow or documentation improvement.

## Local workflow

```bash
npm install
cp .env.example .env.local
npm run check
npm run dev
```

When Supabase variables are absent, preserve the local demo mode so the core workspace remains easy to test.

## Pull requests

Please include:

- The user problem or workflow being improved
- A short summary of the implementation
- Tests or checks run locally
- Screenshots for visible UI changes
- Any follow-up limitations or migration notes

For changes involving roles, database access, or RLS, explain how the authorization boundary remains protected. Keep payment behavior mock-only unless the product requirements explicitly change.
