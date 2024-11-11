import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './contexts/AuthContext';
import GoogleCallback from './pages/GoogleCallback';
import Items from './pages/items/Items';
import ItemDetail from './pages/items/ItemDetail';
import Cart from './pages/Cart';
import Purchase from './pages/purchase/Purchase';
import PurchaseApprove from './pages/purchase/PurchaseApprove';
import PurchaseFail from './pages/purchase/PurchaseFail';
import Purchases from './pages/purchases/Purchases';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<GoogleCallback />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:itemId" element={<ItemDetail />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <PrivateRoute>
                <Purchase />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchaseApprove"
            element={
              <PrivateRoute>
                <PurchaseApprove />
              </PrivateRoute>
            }
          />
          <Route path="/purchaseFail" element={<PurchaseFail />} />
          <Route
            path="/purchases"
            element={
              <PrivateRoute>
                <Purchases />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;