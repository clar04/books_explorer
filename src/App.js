import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BooksProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </BooksProvider>
  );
}

export default App;