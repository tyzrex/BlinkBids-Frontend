import ChangePasswordForm from "../_components/user-change-password-form";

export default function UserSettings() {
  return (
    <>
      <div className="w-full mt-10">
        <h1 className="title-typography">Change Password</h1>
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
}
