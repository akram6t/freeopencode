import SignupForm from '@/components/auth/SignupForm';

function SignupPage() {
  return (
    <>
      <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 text-center">Create Account</h2>
      <p className="text-neutral-500 mt-2">Sign up for a new QuickSync account</p>
      <SignupForm />
    </>
  );
}

export default SignupPage;

