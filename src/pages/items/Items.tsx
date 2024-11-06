import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { Item } from '../../types/items';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import ItemCard from '../../components/items/ItemCard';
import ItemSearch from '../../components/items/ItemSearch';
import { useAuth } from '../../contexts/AuthContext';

function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchItems = async () => {
    try {
      setLoading(true);
      // 일단 design 학과의 작품만 불러오도록 설정
      const response = await api.get('/items/?department=Design');
      setItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || '작품을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      // 빈 쿼리일 경우 전체 작품 목록 불러오기
      if (!query.trim()) {
        await fetchItems();
        return;
      }
      // 검색어가 있을 경우 검색 결과 불러오기
      const response = await api.get(`/items/search/?query=${encodeURIComponent(query)}`);
      setItems(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || '검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Design 작품 목록</h1>
        {user && (
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            홈으로
          </button>
        )}
      </div>
      <ItemSearch onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.item_id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Items;
