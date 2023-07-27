import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Store from './redux/store';
import { loadUser, loadSeller } from './redux/actions/user';
import { getAllProducts } from "./redux/actions/product"
import { HomePage, ProductsPage, ProductDetailsPage, ProfilePage, FAQPage, ShopCreatePage, ShopLoginPage, BestSellingPage, LoginPage, OrderSuccessPage, CheckoutPage, SignupPage, ActivationPage, SellerActivationPage, PaymentPage, OrderDetailsPage, TrackOrderPage, } from './routes/Routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopAllCoupouns, ShopPreviewPage, ShopAllOrders, ShopOrderDetails,ShopAllRefunds, ShopSettingsPage, ShopWithDrawMoneyPage, } from './routes/ShopRoutes';
import {
  AdminDashboardPage,
  AdminDashboardSellers,
  AdminDashboardUsers,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardWithdraw
} from "./routes/AdminRoutes";
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import { ShopHomePage } from './ShopRoutes';
import { Elements } from '@stripe/react-stripe-js';
import { server } from "./server";
import { loadStripe } from '@stripe/stripe-js';
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  const [stripeApikey, setStripeApiKey] = React.useState("");

  async function getStripeApikey() {
    const response = await fetch(`${server}/payment/stripeapikey`);
    const data = await response.json();
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProducts());
    getStripeApikey();
  }, [dispatch]);

  return (
    <div>
      {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
            <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />v
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-product"
              element={
                <SellerProtectedRoute>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-coupouns"
              element={
                <SellerProtectedRoute>
                  <ShopAllCoupouns />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-products"
              element={
                <SellerProtectedRoute>
                  <ShopAllProducts />
                </SellerProtectedRoute>
              }
            />
            <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />

<Route
            path="/admin/dashboard"
            element={
                <AdminDashboardPage />
            }
          />
        <Route
          path="/admin-users"
          element={
              <AdminDashboardUsers />
          }
        />
        <Route
          path="/admin-sellers"
          element={
              <AdminDashboardSellers />
          }
        />
        <Route
          path="/admin-orders"
          element={
              <AdminDashboardOrders />
          }
        />
         <Route
          path="/admin-products"
          element={
              <AdminDashboardProducts />
          }
        />
         
         <Route
          path="/admin-withdraw-request"
          element={
              <AdminDashboardWithdraw />
          }
        />

          </Routes>
        </Elements>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
