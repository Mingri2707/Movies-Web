import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken: string) => set({ accessToken }),

  clearState: () => set({ accessToken: null, user: null, loading: false }),

  signUp: async (lastName, firstName, username, email, password) => {
    try {
      set({ loading: true });
      // gọi API
      await authService.signUp(lastName, firstName, username, email, password);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn(username, password);

      get().setAccessToken(accessToken);

      await get().fetchMe();
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await authService.signOut();
      get().clearState();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    } finally {
      {
        set({ loading: false });
      }
    }
  },
  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      console.log("fetchMe result:", user);
      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      toast.error("Lấy thông tin người dùng thất bại. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },
  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();
      setAccessToken(accessToken);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.error(error);
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đang nhập lại!");
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
