import { useState, useEffect } from 'react';
import api from '../../utils/axios';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import PurchaseDetailModal from '../../components/purchases/PurchaseDetailModal';

interface PurchaseItem {
  item_id: string;
  image_original: string;
  title: string;
  name: string;
  size: string;
  material: string;
  price: number;
  refund: boolean;
  is_confirmed: boolean;
}

function Purchases() {
  const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await api.get('/purchases/');
        setPurchases(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || '구매 내역을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleDeliveryCheck = async (itemId: string) => {
    try {
      const response = await api.get(`/delivery/${itemId}/`);
      if (response.data.redirect_url) {
        window.open(response.data.redirect_url, '_blank');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || '배송 조회에 실패했습니다.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">구매 내역</h1>
      {purchases.length === 0 ? (
        <p className="text-gray-500">구매 내역이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {purchases.map((item) => (
            <div key={item.item_id} className="flex gap-4 bg-white p-4 rounded-lg shadow">
              <img
                src={item.image_original}
                alt={item.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-600">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.size} | {item.material}
                </p>
                <p className="text-lg font-semibold mt-2">
                  {item.price.toLocaleString()}원
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleDeliveryCheck(item.item_id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  배송조회
                </button>
                <button
                  onClick={() => alert('준비중인 기능입니다.')}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={item.refund}
                >
                  {item.refund ? '환불 처리됨' : '환불신청'}
                </button>
                <button
                  onClick={() => {
                    setSelectedItemId(item.item_id);
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  상세내역
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showModal && selectedItemId && (
        <PurchaseDetailModal
          itemId={selectedItemId}
          onClose={() => {
            setShowModal(false);
            setSelectedItemId(null);
          }}
          purchaseInfo={purchases.find(p => p.item_id === selectedItemId)}
        />
      )}
    </div>
  );
}

export default Purchases; 