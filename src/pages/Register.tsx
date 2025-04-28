
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <RegisterForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
