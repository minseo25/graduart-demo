import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Home() {
  const { user, logout } = useAuth();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
  }, []);

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
        <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
        {user ? (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-600">이메일: {user.email}</p>
              <p className="text-gray-600">이름: {user.full_name}</p>
              <p className="text-gray-600">로그인 방식: {user.oauth_provider}</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/items"
                className="block bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600"
              >
                작품 목록 보기
              </Link>
              
              <Link
                to="/cart"
                className="block bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600"
              >
                장바구니 보기
              </Link>
              
              <Link
                to="/purchases"
                className="block bg-yellow-500 text-white text-center px-4 py-2 rounded hover:bg-yellow-600"
              >
                구매내역 보기
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">로그인이 필요한 서비스입니다.</p>
            <Link
              to="/login"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              로그인하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;