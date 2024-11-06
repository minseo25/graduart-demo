import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { ItemDetail } from '../../types/items';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';

function ItemDetailPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        setLoading(true);
        // 작품 상세 정보 불러오기
        const response = await api.get(`/items/${itemId}/`);
        setItem(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || '작품 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return null;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        뒤로가기
      </button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={item.image_original}
            alt={item.title}
            className="w-full rounded shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{item.title}</h1>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">작가 정보</h2>
            <p>이름: {item.name}</p>
            <p>인스타그램: {item.instagram_url}</p>
            <p>페이스북: {item.facebook_url}</p>
            <p>이메일: {item.email}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">작품 정보</h2>
            <p>크기: {item.size}</p>
            <p>재료: {item.material}</p>
            <p>컬렉션: {item.collection}</p>
            <p>가격: {item.price}</p>
            <p>재고: {item.quantity}</p>
            <p>판매 여부: {item.onSale ? '판매중' : '판매완료'}</p>
          </div>
          
          {item.description && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">작품 설명</h2>
              <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
