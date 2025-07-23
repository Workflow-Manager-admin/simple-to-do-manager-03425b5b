# Supabase Integration

This React frontend app uses Supabase for authentication and data storage.

- Supabase client is initialized in `src/supabaseClient.js` using the environment variables:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_KEY`
- **No keys are hardcoded:** All API calls use the values from environment variables.
- The frontend expects a table called `tasks` with at least these fields:
  - id (uuid, PK, default uuid_generate_v4())
  - user_id (uuid, FK to auth.users.id)
  - title (text)
  - description (text)
  - category (text)
  - complete (boolean)
  - created_at (timestamp)
- RLS (Row Level Security) must be enabled and restrict users to only access their own tasks (`user_id = auth.uid()`).
- Users sign up/in via email and password authentication.
- All Supabase functions and CRUD use the client from `supabaseClient.js`.

**If you change or add to the Supabase usage (such as new tables, new env vars, etc.), update this file.**
