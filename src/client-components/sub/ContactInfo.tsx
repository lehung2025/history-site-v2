"use client";
import { FaTwitter, FaEnvelope, FaDiscord } from "react-icons/fa";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { useContactStore } from "@/store/contact";

const ContactInfo = () => {
  const { contact } = useContactStore();

  return (
    <div className="flex flex-col items-center justify-center text-white w-full max-w-3xl mx-auto p-8 border border-gray-700 rounded-lg bg-slate-950/50 shadow-lg animate-slideDown">
      {/* Header */}
      <div className="text-3xl font-bold mb-4 text-yellow-50">Contact Me</div>

      {/* Introduction */}
      <p className="text-lg text-gray-300 text-center mb-6">
        My name is{" "}
        <span className="text-white font-semibold">{contact.name}</span>, the
        author of this project. You can reach out to me through the following
        platforms:
      </p>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-center">
        {/* Email */}
        <div className="flex flex-col items-center gap-2 border p-4 rounded-lg bg-slate-950/50 w-full">
          <FaEnvelope className="text-yellow-400 text-3xl" />
          <a
            href={`mailto:${contact.email}`}
            className="hover:underline text-gray-300 break-all max-w-full"
          >
            {contact.email}
          </a>
        </div>

        {/* Twitter */}
        <div className="flex flex-col items-center gap-2 border p-4 rounded-lg bg-slate-950/50 w-full">
          <FaTwitter className="text-blue-400 text-3xl" />
          <a
            href={contact.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-300"
          >
            Twitter
          </a>
        </div>

        {/* Team */}
        <div className="flex flex-col items-center gap-2 border p-4 rounded-lg bg-slate-950/50 w-full">
          <PiMicrosoftTeamsLogoFill className="text-blue-300 text-3xl" />
          <a
            href={contact.team}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-300"
          >
            Team
          </a>
        </div>

        {/* Discord */}
        <div className="flex flex-col items-center gap-2 border p-4 rounded-lg bg-slate-950/50 w-full">
          <FaDiscord className="text-blue-300 text-3xl" />
          <a
            href={contact.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-gray-300"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
