import ResetForm from './_components/ResetForm';

type Props = {
  params: {
    uid: string;
    token: string;
  };
};

// new_password
// re_new_password
// uid
// token

//url /api/auth/users/reset_password_confirm/ POST
//400 Bad Request – validation error
//204 No Content – success, no content returned

export default async function Page(props: Props) {
  const params = props.params;
  //console.log(params);

  return (
    <>
      <ResetForm uid={params.uid} token={params.token} />
    </>
  );
}
