import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import Loading from '../../components/common/Loading';

function PurchaseApprove() {
  const navigate = useNavigate();
  const isProcessing = useRef(false);

  useEffect(() => {
    const approvePurchase = async () => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      try {
        const url = new URL(window.location.href);
        const pg_token = url.searchParams.get("pg_token");
        const oid = url.searchParams.get("oid");
        const storedFormData = localStorage.getItem('purchaseFormData');
        
        if (!pg_token || !oid || !storedFormData) {
          throw new Error('Invalid parameters');
        }

        const formData = JSON.parse(storedFormData);

        await api.post('/purchases/approve/', {
          pg_token,
          oid,
          ...formData
        });

        localStorage.removeItem('purchaseFormData');
        alert('결제가 완료되었습니다.');
        navigate('/');
      } catch (error: any) {
        alert(error.response?.data?.error || '결제 승인 중 오류가 발생했습니다.');
        navigate('/purchaseFail');
      }
    };

    approvePurchase();
  }, [navigate]);

  return <Loading />;
}

export default PurchaseApprove;
