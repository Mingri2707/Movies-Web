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

// Schema đăng nhập
const signInSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data;
    await signIn(username, password);
    navigate("/");
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
                  Chào mừng quay lại Hubris
                </h1>
                <p className="text-white/50 text-balance">
                  Đăng nhập vào tài khoản của bạn
                </p>
              </div>

              {/* Username */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="username" className="block text-sm text-muted">
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  className="text-white"
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
                  className="text-white"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Nút đăng nhập */}
              <Button
                type="submit"
                className="w-full !bg-[#c52222] hover:!bg-[#da1111] text-white"
                disabled={isSubmitting}
              >
                Đăng nhập
              </Button>

              <div className="text-center text-sm text-muted">
                Chưa có tài khoản?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Đăng ký
                </a>
              </div>
            </div>
          </form>

          <div className="relative hidden md:block bg-transparent">
            <img
              src="/phainon.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
