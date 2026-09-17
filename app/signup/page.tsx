import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm/SignupForm";

export const metadata = {
  title: "Sign up",
  description: "Join ForestBlog.",
};

export default function SignupPage() {
  return (
    <div className="space-y-6 py-8">
      <div className="text-center">
        <p className="text-sm text-forest-800/70 dark:text-forest-100/70">A considered space for curious readers.</p>
      </div>

      <SignupForm />

      <div className="text-center text-sm text-forest-800/70 dark:text-forest-100/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-forest-700 hover:text-forest-900 dark:text-forest-300">
          Sign in
        </Link>
      </div>
    </div>
  );
}
