import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <>
      <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">Forgot Password</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mt-2">Enter your email to reset your password</p>
      <ForgotPasswordForm />
    </>
  );
}

export default ForgotPasswordPage;

