
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
