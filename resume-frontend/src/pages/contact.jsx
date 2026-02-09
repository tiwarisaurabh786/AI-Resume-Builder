import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-base-100 px-6 py-10">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2 mb-6">
        <FaEnvelope className="text-accent" /> Contact Us
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="card bg-white shadow-md p-6 flex items-center gap-4">
            <FaPhone className="text-2xl text-accent" />
            <p>+91 98765 43210</p>
          </div>
          <div className="card bg-white shadow-md p-6 flex items-center gap-4">
            <FaEnvelope className="text-2xl text-accent" />
            <p>support@airesumemaker.com</p>
          </div>
          <div className="card bg-white shadow-md p-6 flex items-center gap-4">
            <FaMapMarkerAlt className="text-2xl text-accent" />
            <p>Bangalore, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="card bg-white shadow-md p-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
