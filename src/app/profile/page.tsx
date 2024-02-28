import { getServerSession } from 'next-auth';
import { getCurrentUser, getProfileData } from '@/lib/queries/user.queries';
import ProfileDetails from '@/components/profile/ProfileDetails';


const Profile = async () => {
  const session = await getServerSession();
  // const user = await getCurrentUser(session?.user?.email!);
  const profileData = await getProfileData(session?.user?.email!);

  console.log('SESSION', session!.user)

  return (
    <div className='relative w-full pb-6'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>
          {session?.user?.name}
        </h2>
      </section>
      <section className='container mx-auto'>
        <ProfileDetails data={profileData} />
      </section>
    </div>
  );
};

export default Profile;