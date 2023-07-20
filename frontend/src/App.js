import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Store from './redux/store';
import {  loadUser } from './redux/actions/user';
import {  loadSeller } from './redux/actions/user';
import { getAllProducts } from "./redux/actions/product"
import { HomePage, ProductsPage, ProductDetailsPage, ProfilePage, FAQPage, ShopCreatePage, ShopLoginPage, BestSellingPage, LoginPage, OrderSuccessPage, CheckoutPage, SignupPage, ActivationPage, SellerActivationPage,   } from './routes/Routes';
import ProtectedRoute from './routes/ProtectedRoute';
import { ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopAllCoupouns, 
  ShopPreviewPage, } from './routes/ShopRoutes';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import { ShopHomePage } from './ShopRoutes';

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const {  isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(getAllProducts());
  }, []);

  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:name" element={<ProductDetailsPage />} />
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
          <Route path="/order/success/:id" element={<OrderSuccessPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute >
                <CheckoutPage />
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
              <SellerProtectedRoute >
                <ShopHomePage />
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




        </Routes>

      


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


export default App;
