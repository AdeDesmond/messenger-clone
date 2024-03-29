import { MessageCircleHeartIcon } from "lucide-react";
import { AuthForm } from "./_components/auth-form";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <MessageCircleHeartIcon className="h-[4rem] w-[4rem] mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign into your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
