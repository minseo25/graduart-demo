import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import Loading from '../common/Loading';

interface PurchaseDetailModalProps {
  itemId: string;
  onClose: () => void;
  purchaseInfo: any;
}

interface OrderInfo {
  address: string;
  name: string;
  phone_num: string;
  email: string;
  payment_method: string;
  total_price: number;
}

function PurchaseDetailModal({ itemId, onClose, purchaseInfo }: PurchaseDetailModalProps) {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await api.get(`/purchases/${itemId}/`);
        setOrderInfo(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || '주문 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderInfo();
  }, [itemId]);

  if (loading) return <Loading />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">주문 상세 내역</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">상품 정보</h3>
              <div className="flex gap-4">
                <img
                  src={purchaseInfo.image_original}
                  alt={purchaseInfo.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{purchaseInfo.title}</p>
                  <p className="text-gray-600">{purchaseInfo.name}</p>
                  <p className="text-sm text-gray-500">
                    {purchaseInfo.size} | {purchaseInfo.material}
                  </p>
                  <p className="font-semibold">
                    {purchaseInfo.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">배송 정보</h3>
              <div className="space-y-2">
                <p>받는 사람: {orderInfo?.name}</p>
                <p>연락처: {orderInfo?.phone_num}</p>
                <p>이메일: {orderInfo?.email}</p>
                <p>배송 주소: {orderInfo?.address}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">결제 정보</h3>
              <div className="space-y-2">
                <p>결제 방법: {orderInfo?.payment_method}</p>
                <p>총 결제금액: {orderInfo?.total_price.toLocaleString()}원</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseDetailModal;
