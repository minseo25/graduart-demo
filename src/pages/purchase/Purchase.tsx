import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/axios';
import { CartItem } from '../../types/cart';

interface PurchaseFormData {
  name: string;
  email: string;
  phone_num: string;
  address: string;
}

function Purchase() {
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PurchaseFormData>({
    name: user?.full_name || '',
    email: user?.email || '',
    phone_num: '',
    address: '', // 배송주소 => 프론트에서 처리할 때 한 줄의 string으로 잘 concatenate해서 보내주세요. 포맷만 통일되면 됩니다~
  });
  const cartItems = location.state?.cartItems as CartItem[];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('purchaseFormData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone_num: formData.phone_num,
        address: formData.address
      }));

      const response = await api.post('/purchases/prepare/', {
        item_ids: cartItems.map(item => item.item_id)
      });
      
      window.location.href = response.data.next_redirect_pc_url;
    } catch (error: any) {
      alert(error.response?.data?.error || '결제 준비 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">주문/결제</h1>
      
      {/* 주문 상품 목록 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
        {cartItems.map(item => (
          <div key={item.item_id} className="flex gap-4 mb-4 p-4 bg-white rounded-lg shadow">
            <img
              src={item.image_original}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.name}</p>
              <p className="font-semibold">{item.price.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>

      {/* 주문자 정보 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">전화번호</label>
          <input
            type="tel"
            name="phone_num"
            value={formData.phone_num}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">배송주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
        >
          카카오페이로 결제하기
        </button>
      </form>
    </div>
  );
}

export default Purchase;
