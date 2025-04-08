import Image from "next/image";

const Profile = () => {
  return (
    <section
      className="flex items-center justify-center gap-3"
      title="Profile"
      aria-label="Profile"
    >
      <Image
        src="/images/avatar.webp"
        alt="ElFrontend Profile Picture"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex flex-col items-start justify-center gap-1">
        <h3 className="text-primary text-xl font-normal">Carlos Chao Cortes</h3>
        <p className="text-gray-500 text-md">@ElFrontend</p>
      </div>
    </section>
  );
};

export default Profile;
