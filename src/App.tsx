import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { PrivateAdminRoute, PrivateUserRoute } from "./utils/PrivateRoute";
import SearchResults from "./pages/SearchResults";
import HotelPage from "./pages/HotelPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Checkout from "./pages/Checkout";
import PaymentSuccessful from "./pages/PaymentSuccessful";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/search-results"
          element={
            <PrivateUserRoute>
              <SearchResults />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/hotel/:hotelId"
          element={
            <PrivateUserRoute>
              <HotelPage />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateUserRoute>
              <Checkout />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/payment-successful"
          element={
            <PrivateUserRoute>
              <PaymentSuccessful />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
      </Routes>
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
    </BrowserRouter>
  );
}

export default App;
