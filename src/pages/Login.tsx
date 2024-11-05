import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error: any) {
      alert(error.response?.data?.error || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email', { required: '이메일을 입력해주세요' })}
              type="email"
              placeholder="이메일"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('password', { required: '비밀번호를 입력해주세요' })}
              type="password"
              placeholder="비밀번호"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <button
          onClick={googleLogin}
          className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          구글로 로그인
        </button>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;