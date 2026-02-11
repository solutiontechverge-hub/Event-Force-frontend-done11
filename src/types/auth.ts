// types/auth.ts

/* =========================
   USER TYPE
========================= */

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
  phone?: string;
}

/* =========================
   AUTH STATE
========================= */

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/* =========================
   AUTH CREDENTIALS
========================= */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

/* =========================
   AUTH CONTEXT TYPE
========================= */

export interface AuthContextType {
  /* STATE */
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  /* ACTIONS */
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;

  /**
   * Update user data locally (profile edit)
   * Syncs with context + localStorage
   */
  updateUser: (data: Partial<User>) => void;

  /* OPTIONAL / FUTURE */
  refreshToken?: () => Promise<void>;
  forgotPassword?: (email: string) => Promise<void>;
  resetPassword?: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}
