import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-blue-700 text-white flex justify-between items-center px-10 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.iyTZFS1v4vthCmRooji3EwHaCn?pid=Api&P=0&h=180"
            alt="logo"
            className="w-20 rounded"
          />
          <h1 className="text-3xl font-bold">EduPortal</h1>
        </div>

        <ul className="flex items-center gap-8 text-lg">
          <li
              onClick={() => scrollToSection("home")}
              className="cursor-pointer hover:text-yellow-300"
            >Home</li>
          <li
              onClick={() => scrollToSection("features")}
              className="cursor-pointer hover:text-yellow-300"
            >About</li>
          <li
              onClick={() => setShowContact(true)}
              className="cursor-pointer hover:text-yellow-300"
            >Contact</li>
          <button
            className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            onClick={() => navigate("/register")}
          >
            Signup
          </button>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="grid md:grid-cols-2 items-center px-10 py-16 bg-blue-50">
        <div>
          <h1 className="text-5xl font-bold text-blue-800 mb-6">
            Student Project Management System
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            A platform where students can submit projects and teachers can
            review, approve, and manage them efficiently.
          </p>

          <div className="flex gap-4">
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            <button
              className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-100"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://th.bing.com/th/id/OIP.NSSMuVto9Koy6UlP4EPpUQHaD8?w=333&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
            alt="students"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-24 py-16 px-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-3">
              Project Submission
            </h3>
            <p className="text-gray-600">
              Students can easily upload and manage their academic projects.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-semibold mb-3">
              Teacher Approval
            </h3>
            <p className="text-gray-600">
              Teachers can review, approve, or reject projects with comments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-semibold mb-3">
              Profile Management
            </h3>
            <p className="text-gray-600">
              Students and teachers can update and maintain their profiles.
            </p>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-700 text-white py-12">
        <div className="grid md:grid-cols-4 text-center gap-8">
          <div>
            <h1 className="text-4xl font-bold">500+</h1>
            <p>Students</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">50+</h1>
            <p>Teachers</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">1000+</h1>
            <p>Projects</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold">100%</h1>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* Contact Popup */}
      {showContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
          onClick={() => setShowContact(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-8 py-7 text-white">
              <button
                type="button"
                onClick={() => setShowContact(false)}
                aria-label="Close contact popup"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xl text-white transition hover:rotate-90 hover:bg-white/25"
              >
                ×
              </button>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Get in touch
              </p>
              <h2 id="contact-title" className="text-3xl font-bold">
                Contact Me
              </h2>
              <p className="mt-2 text-blue-100">
                Choose a platform and let&apos;s connect.
              </p>
            </div>

            <div className="space-y-3 p-6">
              <a
                href="mailto:rahulgupta07601@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-slate-900">Email</span>
                  <span className="block break-all text-sm text-slate-500 group-hover:text-blue-700">
                    rahulgupta07601@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/rahul-gupta-42679532b"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition group-hover:bg-sky-700 group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                    <path d="M5.2 3.5A2.2 2.2 0 1 0 5.2 8a2.2 2.2 0 0 0 0-4.5ZM3.4 9.5h3.6V21H3.4V9.5Zm5.8 0h3.5v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.6 4.6 6V21h-3.6v-5.2c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9.2V9.5Z" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-slate-900">LinkedIn</span>
                  <span className="block text-sm text-slate-500 group-hover:text-blue-700">
                    Visit LinkedIn Profile
                  </span>
                </span>
              </a>

              <a
                href="https://leetcode.com/u/rahul_2244/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition group-hover:bg-amber-500 group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true">
                    <path d="M14 4 8.5 9.5a3 3 0 0 0 0 4.2l5.3 5.3a2 2 0 0 0 2.8 0l1.3-1.3" />
                    <path d="M17 7h4v4M17 7l-4 4M6 12H3" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-slate-900">LeetCode</span>
                  <span className="block text-sm text-slate-500 group-hover:text-amber-700">
                    View LeetCode Profile
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <h3 className="text-2xl font-bold">EduPortal</h3>
        <p className="mt-2">
          © 2026 All Rights Reserved | Developed using MERN Stack
        </p>
      </footer>
    </div>
  );
};

export default Home;