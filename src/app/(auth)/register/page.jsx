"use client";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLink,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"; 

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        image,
      },
      {
        onSuccess: async() => {
          setLoading(false);
          await authClient.signOut()
          router.push("/login");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message)
        },
      },
    );
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl w-full max-w-lg border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            User <span className="text-orange-600">Registration</span>
          </h2>
          <p className="text-gray-400 font-medium italic">
            Join SkillSphere and start your journey!
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">
              Full Name
            </label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-5 text-orange-500" />
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-5 text-orange-500" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">
              Photo URL
            </label>
            <div className="relative flex items-center">
              <FaLink className="absolute left-5 text-orange-500" />
              <input
                name="image"
                type="url"
                placeholder="Paste your profile image link"
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500 ml-2">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-5 text-orange-500" />
              <input
                name="password"
                type={showPassword ? "text" : "password"} // এখানে টাইপ চেঞ্জ হচ্ছে
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-transparent rounded-2xl focus:border-orange-500 focus:bg-white transition-all outline-none text-gray-700 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center gap-3 mt-6 disabled:opacity-70"
          >
            {loading ? "Processing..." : "Register Now"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-600 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
