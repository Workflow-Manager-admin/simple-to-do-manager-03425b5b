# Minimal Supabase To-Do App

This project is a minimal To-Do manager web app with Supabase authentication and real-time task management, built in React using a light, modern, and minimal UI.

## Features

- User registration and log in with Supabase email/password
- View, add, edit, and delete your personal tasks
- Mark tasks as complete/incomplete
- Categorize tasks (category per task), filter tasks by category
- Modern, minimal, responsive, and light-themed UI with custom accent colors

## Environment Variables

Set these in your `.env` or hosting system:

```
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_KEY=<your-supabase-anon-key>
```

## Supabase Table Setup

1. **Create a new table** named `tasks` with these fields:
    - `id`: uuid, primary key, default `uuid_generate_v4()`
    - `user_id`: uuid, foreign key to `auth.users.id`
    - `title`: text, required
    - `description`: text
    - `category`: text
    - `complete`: boolean, default `false`
    - `created_at`: timestamp with time zone, default `now()`

2. **Enable Row Level Security (RLS)** and add the following policies for table `tasks`:
    - Select/insert/update/delete: `user_id = auth.uid()`
    - Only the owner of a task can read or modify it

3. **Example SQL for Supabase:**
```sql
create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  title text not null,
  description text,
  category text,
  complete boolean default false,
  created_at timestamp with time zone default now()
);
alter table public.tasks enable row level security;
create policy "Users can do anything with their own tasks"
  on public.tasks
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
```

## Running Locally

1. Install dependencies:
    ```
    npm install
    ```

2. Start the dev server:
    ```
    npm start
    ```

3. The app will be available at http://localhost:3000

## Usage

- Register or log in with your email and password.
- Create new tasks, categorize, edit, or mark complete.
- Filter by category using the dropdown in the task list header.
- All data and authentication is managed by Supabase.

## Customization

- Color variables are in `src/theme.css` for easy adjustment.
- All Supabase access is performed via `src/supabaseClient.js` and only uses environment variables for configuration.

## File Structure

```
src/
  components/
    Header.js
    Login.js
    Modal.js
    TaskForm.js
    TaskList.js
  supabaseClient.js
  theme.css
  App.js
  App.css
  ...
```

## Learn More

- [React documentation](https://reactjs.org/)
- [Supabase documentation](https://supabase.com/docs/guides/client-libraries)

>>>>>>> REPLACE
