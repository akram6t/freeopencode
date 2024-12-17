import LoginForm from '@/components/auth/LoginForm';

function LoginPage() {
  return (
    <>
      <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">Welcome Back</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mt-2">Sign in to continue to QuickSync</p>
      <LoginForm />
    </>
  );
}

export default LoginPage;