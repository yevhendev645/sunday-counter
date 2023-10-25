import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SundayCounter from '../pages/sunday-counter';



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SundayCounter />} />
      <Route path="*" element={<SundayCounter />} />
    </Routes>
  );
};

export default AppRoutes;
