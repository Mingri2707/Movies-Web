import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
const signUpSchema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập tên của bạn"),
  lastName: z.string().min(1, "Vui lòng nhập họ của bạn"),
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: SignUpFormValues) => {
    const { firstName, lastName, username, email, password } = data;
    // gọi backend để đăng ký
    await signUp(lastName, firstName, username, email, password);
    navigate("/signin");
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border bg-black/30">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header -logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img
                    src="/logoWhite.png"
                    alt="logo"
                    className="w-[170px] h-[170px]"
                  />
                </a>
                <h1 className="text-2xl font-bold text-muted">
                  Đăng Ký Tài Khoản Hubris
                </h1>
                <p className="text-white/50 text-balance">
                  Chào người mới! Đăng ký để vào xem nào
                </p>
              </div>
              {/*Họ và tên*/}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="lastname"
                    className="block text-sm text-muted"
                  >
                    Họ
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    className="text-white placeholder:text-gray-400"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="firstname"
                    className="block text-sm text-muted"
                  >
                    Tên
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    className="text-white placeholder:text-gray-400"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm text-muted">
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  className="text-white placeholder:text-gray-400"
                  placeholder="moji"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="password" className="block text-sm text-muted">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="text-white placeholder:text-gray-400"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="block text-sm text-muted">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="text-white placeholder:text-gray-400"
                  placeholder="m@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Nút đăng ký */}
              <Button
                type="submit"
                className="w-full !bg-[#c52222] hover:!bg-[#da1111] text-white"
                disabled={isSubmitting}
              >
                Tạo tài khoản
              </Button>
              <div className="text-center text-sm text-muted">
                Đã có tài khoản ?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Đăng nhập
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block bg-transparent">
            <video
              src="/furina.mp4"
              className="absolute top-1/2 -translate-y-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4 ">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
