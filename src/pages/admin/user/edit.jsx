import React from 'react';
import MainLayout from 'src/layouts/MainLayout';

Profile.getLayout = (page) => <MainLayout variant="admin">{page}</MainLayout>;

function Profile() {
  return <div>profile</div>;
}

export default Profile;
