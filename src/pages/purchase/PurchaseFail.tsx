import { Link } from 'react-router-dom';

function PurchaseFail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">결제 실패</h1>
        <p className="text-gray-600 mb-6">결제 처리 중 오류가 발생했습니다.</p>
        <Link
          to="/cart"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          장바구니로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default PurchaseFail;
