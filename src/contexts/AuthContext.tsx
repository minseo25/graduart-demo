import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

// 사용자 정보를 담는다 (/api/v1/auth/user/ 응답 데이터)
interface User {
  email: string;
  full_name: string;
  oauth_provider: string;
}

// AuthContext에서 사용할 메서드와 state의 타입을 정의한다
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => void;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  setAuthData: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 로그인 상태를 관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  // token이 cookie에 담겨있고, 이를 꺼내볼 수 없기 때문에 앱이 시작될 때 서버에 사용자 정보를 요청하여 인증 상태를 확인한다
  // 인증 상태 확인 중임(아직 확인 완료 안됐는지 여부)를 나타냄
  const [loading, setLoading] = useState(true);

  // component mount 시 사용자 인증 상태 초기화
  // 로그인, 회원가입, 구글 로그인 시에는 당연히 /auth/user/ 요청을 보내 로그인 정보를 가져오지만
  // 페이지 새로고침 시 모든 상태가 초기화되므로 useEffect를 사용해 로그인 상태를 다시 가져와야 함 (쿠키의 토큰은 남아있기에)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (window.location.pathname === '/auth/callback') {
          // Oauth 콜백 처리 중일때는 사용자 정보 체크를 건너뜀, else broken pipe error ㅜㅜ
          setLoading(false);
          return;
        }

        const response = await api.get('/auth/user/');
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // 인증 상태 초기화 완료
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 인증 데이터 설정 함수 (로그인, 회원가입, 구글 로그인 시 사용)
  const setAuthData = async (userData: any) => {
    return new Promise<void>((resolve) => {
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
      
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };

  // 일반 로그인
  const login = async (email: string, password: string) => {
    await api.post('/auth/login/', { email, password });
    const userResponse = await api.get('/auth/user/');
    await setAuthData(userResponse.data);
  };

  // 로그아웃
  const logout = async () => {
    await api.get('/auth/logout/');
    setUser(null);
    setIsAuthenticated(false);
  };

  // 구글 로그인, /api/v1/auth/google/login/ 으로 요청 보내기만 하면 서버가 redirect 시킴
  const googleLogin = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    window.location.href = `${apiUrl}/auth/google/login/`;
  };

  // 일반 회원가입
  const register = async (email: string, password: string, fullName: string) => {
    try {
      await api.post('/auth/register/', {
        email,
        password,
        full_name: fullName,
      });
      const userResponse = await api.get('/auth/user/');
      await setAuthData(userResponse.data);
    } catch (error) {
      console.error('AuthContext register error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        googleLogin,
        register,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};