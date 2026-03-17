"use client";

import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const configIdRef = useRef<string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const configId = localStorage.getItem("configId");
    if (configId) configIdRef.current = configId;
    console.log(configIdRef.current);
  }, []);

  //server action can be more important for data mutations,
  //  but for auth flows, client actions are often more straightforward
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUp.email({ ...formData });
      if (result.error) throw new Error(result.error.message);
      else if (configIdRef.current) router.push(`/config/preview?id=${configIdRef.current}`);
      else router.push("/home");
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500`}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 transition outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500`}
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
