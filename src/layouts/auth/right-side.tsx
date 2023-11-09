import AuthIllustration from "~/assets/illustrations/auth.png";

export default function RightSide() {
  return (
    <aside className="flex-col flex justify-center items-start w-full relative authTablet:hidden">
      <div className="p-6 flex-col flex justify-center items-center authDesktop:max-w-[945px]">
        <figure className="w-[90%]">
          <img
            className="w-full h-full object-contain"
            src={AuthIllustration}
            alt="auth-illustration-image"
          />
        </figure>
      </div>
    </aside>
  );
}
