import { SignupForm } from "@/components/auth/signup-form";

const SignUpPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0f0f0f] text-white flex items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* Diagonal Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.2) 0, rgba(255, 0, 100, 0.2) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(0, 255, 200, 0.15) 0, rgba(0, 255, 200, 0.15) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-sm md:max-w-5xl lg:max-w-6xl mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
