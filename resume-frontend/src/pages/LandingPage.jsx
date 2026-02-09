import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-blue-100 via-white to-white">
        <div className="hero-content text-center flex-col lg:flex-row-reverse">
          <img
            src="https://img.freepik.com/free-vector/cv-concept-illustration_114360-4316.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="AI Resume"
          />
          <div>
            <h1 className="text-5xl font-bold text-primary">Build Your Resume with AI</h1>
            <p className="py-6">
              Let AI craft the perfect, professional resume for you. Fast, elegant, and completely free.
            </p>
            <Link to={"/generateresume"} className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-bold">AI-Powered</h3>
              <p>Smart suggestions based on your experience and role.</p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-bold">Custom Templates</h3>
              <p>Pick from beautifully designed, ATS-friendly templates.</p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-bold">Instant Export</h3>
              <p>Download your resume as PDF with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/about" className="link link-hover">About</Link>
          <Link to="/services" className="link link-hover">Services</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
        </nav>
        <p>Copyright © 2025 - AI Resume Maker</p>
      </footer>
    </div>
  );
}

export default Landing;
