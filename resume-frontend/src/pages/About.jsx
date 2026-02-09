import React from "react";
import { FaUsers, FaBullseye, FaLightbulb } from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-base-100 px-6 py-10">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-6">
        <FaUsers className="text-accent" /> About Us
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="card bg-white shadow-md p-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-bold text-accent">AI Resume Maker</span> —
            where technology meets career growth. Our mission is to empower
            professionals and job seekers with AI-driven tools that simplify
            resume building and enhance your chances of landing your dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-white shadow-md p-6 text-center">
            <FaBullseye className="text-4xl text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To provide innovative AI-powered solutions that make resume
              creation effortless and professional.
            </p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center">
            <FaLightbulb className="text-4xl text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading platform for AI-assisted career tools, helping
              millions achieve their goals.
            </p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center">
            <FaUsers className="text-4xl text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Our Team</h2>
            <p className="text-gray-600">
              A passionate group of developers, designers, and AI experts
              working together to make job hunting easier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
