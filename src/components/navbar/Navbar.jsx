"use client";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const Links = (
    <>
      <li>
        <Link
          href="/"
          className={`${path === "/" ? "bg-orange-500 text-white " : ""}text-lg font-medium transition-colors py-2 block`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/courses"
          className={`${path === "/courses" ? "bg-orange-500 text-white " : ""}text-lg font-medium transition-colors py-2 block`}
        >
          Courses
        </Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link
            href="/my-profile"
            className={`${path === "/my-profile" ? "bg-orange-500 text-white " : ""}text-lg font-medium transition-colors py-2 block`}
          >
            My Profile
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="navbar max-w-screen-2xl mx-auto text-gray-800 px-4 md:px-12">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm sm:btn-md text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-10 p-2 shadow-xl bg-white text-gray-800 rounded-box w-52 border border-orange-100"
            >
              {Links}
            </ul>
          </div>

          <Link
            href="/"
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent px-1 sm:px-2 whitespace-nowrap cursor-pointer"
          >
            SkillSphere
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 xl:gap-4 text-gray-700">
            {Links}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-orange-500"></span>
          ) : isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-orange-500 ring-offset-2 hover:ring-orange-600 transition-all duration-300"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <Image
                    alt="User Avatar"
                    src={
                      user?.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white text-gray-800 z-[100] mt-4 w-64 p-3 shadow-2xl rounded-3xl border border-gray-100"
              >
                <div className="px-4 py-4 mb-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
                    Account Holder
                  </p>
                  <p className="text-lg font-bold text-gray-900 leading-tight truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="space-y-1">
                  <li>
                    <Link
                      href="/my-profile"
                      className="py-3 px-4 text-base font-bold hover:bg-orange-50 rounded-xl transition-all"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="py-3 px-4 text-base font-bold hover:bg-orange-50 rounded-xl transition-all"
                    >
                      Account Settings
                    </Link>
                  </li>

                  <div className="h-px bg-gray-100 my-2 mx-2"></div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 px-4 text-base font-black text-red-600 hover:bg-red-50 rounded-xl transition-all text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="btn btn-outline btn-warning btn-sm md:btn-md text-lg font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sm md:btn-md text-lg bg-orange-500 border-none text-white font-medium hover:bg-orange-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
