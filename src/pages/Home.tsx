
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, List, Shield, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Manage Your Tasks <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              TaskSync helps you organize, prioritize, and complete your tasks efficiently. 
              Stay on top of your work and personal life with our intuitive task management solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/register"} 
                className="btn btn-primary py-6 px-8 text-lg"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
              </Link>
              <Link to="/login" className="btn btn-outline py-6 px-8 text-lg">
                {isAuthenticated ? "View Tasks" : "Learn More"}
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <List className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Task Organization</h3>
                <p className="text-muted-foreground">Keep all your tasks organized in one place with easy categorization and filtering options.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-muted-foreground">Track your progress with clear completion statuses and visual indicators.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Access</h3>
                <p className="text-muted-foreground">Your tasks are protected with secure authentication and private access controls.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast & Responsive</h3>
                <p className="text-muted-foreground">Enjoy a fluid experience with our fast and responsive interface on any device.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of users who have improved their productivity with TaskSync.
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn bg-white text-primary hover:bg-white/90 py-6 px-8 text-lg">
              {isAuthenticated ? "Go to Dashboard" : "Start Managing Tasks"}
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
