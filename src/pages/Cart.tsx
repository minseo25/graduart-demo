import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { CartItem } from '../types/cart';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart/items/');
      setCartItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || '장바구니 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await api.delete(`/cart/delete/${itemId}/`);
      setCartItems(items => items.filter(item => item.item_id !== itemId));
    } catch (err: any) {
      alert(err.response?.data?.error || '삭제 실패');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어있습니다.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.item_id} className="flex gap-4 bg-white p-4 rounded-lg shadow">
                <img
                  src={item.image_original}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.name}</p>
                  <p className="text-lg font-semibold">{item.price.toLocaleString()}원</p>
                  {!item.onSale && (
                    <p className="text-red-500">판매 종료된 상품입니다.</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.item_id)}
                  className="text-red-500 hover:text-red-600"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/purchase', { state: { cartItems } })}
            className="w-full mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            disabled={cartItems.length === 0}
          >
            구매하기
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
