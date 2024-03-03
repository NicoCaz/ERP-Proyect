
import React from 'react';
import { Routes, Route} from "react-router-dom"
import ProductsPage from './pages/product/ProductsPage';
import CustomersPage from './pages/customer/CustomerPage';
import InvoicesPage from './pages/invoice/InvoicesPage';
import Error from './pages/error/ErrorPage';
const Router: React.FC = () => {
  return (
    <Routes>      
        <Route path="/products/*" element={<ProductsPage />} />
        <Route path="/customers/*" element={<CustomersPage />} />   
        <Route path="/invoices/*" element={<InvoicesPage />} />       
        <Route path="/error/*" element={<Error />} />  
    </Routes>
  );
};
export default Router;
