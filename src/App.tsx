import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Cities } from './pages/Cities';
import { CityPage } from './pages/CityPage';
import { Home } from './pages/Home';
import { Nominate } from './pages/Nominate';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cities" element={<Cities />} />
          <Route path="city/:cityId" element={<CityPage />} />
          <Route path="nominate" element={<Nominate />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
