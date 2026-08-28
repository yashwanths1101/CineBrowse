import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-[398px] px-6 py-12 text-slate-100 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contact</h1>
        <p className="text-slate-300">
          Feel free to reach out for feedback, suggestions.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Developer</h2>
        <p className="text-slate-300">Yashwanth</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Email</h2>
        <p className="text-slate-300">yashwanthclass1996@gmail.com</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-1">GitHub</h2>
        <a
          href="https://github.com/yashwanths1101"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#33CC99] hover:underline"
        >
          https://github.com/yashwanths1101
        </a>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-1">LinkedIn</h2>
        <a
          href="https://www.linkedin.com/in/yashwanth101/"
          target="_blank"
          className="text-[#33CC99] hover:underline"
        >
          https://www.linkedin.com/in/yashwanth101/
        </a>
      </div>
    </div>
  );
};

export default Contact;
