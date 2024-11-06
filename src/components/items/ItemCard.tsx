import { Item } from '../../types/items';
import { useNavigate } from 'react-router-dom';

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/items/${item.item_id}`)}
      className="cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-lg overflow-hidden"
    >
        {/* 여기서 image_square가 있으면 사용하고 없으면 image_original을 크롭해서 사용하든가 */}
      <img
        src={item.image_original}
        alt={item.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{item.title}</h3>
        <p className="text-gray-600 truncate">{item.name}</p>
        <p className="text-sm text-gray-500 truncate">{item.material}</p>
      </div>
    </div>
  );
}

export default ItemCard;
