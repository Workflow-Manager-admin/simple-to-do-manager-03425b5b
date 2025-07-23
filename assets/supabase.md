# Supabase Integration

This React frontend app uses Supabase for authentication and data storage.

- Supabase client is initialized in `src/supabaseClient.js` using the environment variables:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_KEY`
- **No keys are hardcoded:** All API calls use the values from environment variables.

## Required Table

The frontend expects a table called `tasks` with at least these fields:

- `id` (uuid, primary key, **default**: `extensions.uuid_generate_v4()`)
- `user_id` (uuid, foreign key to `auth.users.id`)
- `title` (text, required)
- `description` (text)
- `category` (text)
- `complete` (boolean, default `false`)
- `created_at` (timestamp with time zone, default `now()`)

> **Note:** The function for generating UUIDs may be namespaced as `extensions.uuid_generate_v4()` if your instance requires it. (This is the case here.)

### Table creation SQL
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  description text,
  category text,
  complete boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

## Row Level Security

- Row Level Security **MUST** be enabled on the `tasks` table:
    ```sql
    ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
    ```
- Policy: Users can only select, insert, update, or delete their own records.
    ```sql
    CREATE POLICY "Users can do anything with their own tasks"
      ON public.tasks
      USING (user_id = auth.uid())
      WITH CHECK (user_id = auth.uid());
    ```

## Authentication

- Users sign up and sign in via Supabase email/password authentication.
- All Supabase functions and CRUD use the client from `supabaseClient.js`.

## Additional Notes

- If your Supabase instance doesn't recognize `uuid_generate_v4()`, add the extension:
    ```sql
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```
- If you add new Supabase features (tables, policies, env vars, etc.), update this file so others can mirror your backend.

