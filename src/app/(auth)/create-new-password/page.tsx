import CreateNewPasswordForm from '@/components/auth/CreateNewPasswordForm';

function CreateNewPasswordPage() {
  return (
    <>
      <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 text-center">Create New Password</h2>
      <p className="text-neutral-500 mt-2">Enter a new password for your account</p>
      <CreateNewPasswordForm />
    </>
  );
}

export default CreateNewPasswordPage;

