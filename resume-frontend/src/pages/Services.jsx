import React from "react";
import { FaMagic, FaPenFancy, FaFileDownload } from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaMagic className="text-4xl text-accent" />,
      title: "AI Resume Generation",
      desc: "Generate tailored, professional resumes instantly with our AI model.",
    },
    {
      icon: <FaPenFancy className="text-4xl text-accent" />,
      title: "Editable Resume Forms",
      desc: "Easily customize your resume fields to match your style and needs.",
    },
    {
      icon: <FaFileDownload className="text-4xl text-accent" />,
      title: "Export & Download",
      desc: "Export your resume in PDF format and share it with employers instantly.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 px-6 py-10">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-6">
        <FaMagic className="text-accent" /> Our Services
      </h1>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="card bg-white shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
