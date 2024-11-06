import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">홈페이지</h1>
        {user && (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">이메일: {user.email}</p>
              <p className="text-gray-600">이름: {user.full_name}</p>
              <p className="text-gray-600">로그인 방식: {user.oauth_provider}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              로그아웃
            </button>
            <Link
              to="/items"
              className="block w-full bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600"
            >
              작품 목록 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;