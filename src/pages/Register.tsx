import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  fullName: string;
}

function Register() {
  const { register: registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.fullName);
      navigate('/');
    } catch (error: any) {
      console.error('Registration error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      alert(error.response?.data?.error || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email', { 
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '유효한 이메일 주소를 입력해주세요'
                }
              })}
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
              {...register('password', { 
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다'
                }
              })}
              type="password"
              placeholder="비밀번호"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('fullName', { required: '이름을 입력해주세요' })}
              type="text"
              placeholder="이름"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            이미 계정이 있으신가요? 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;