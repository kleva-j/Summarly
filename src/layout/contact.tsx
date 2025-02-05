import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import Link from "next/link";

export const ContactUs = () => (
  <div className="min-h-64 flex items-center justify-center">
    <div className="text-center">
      <b className="text-blue-700">Contact Us</b>
      <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight">
        Get In Touch
      </h2>
      <p className="mt-4 text-base sm:text-lg">
        Our friendly team is always here to chat.
      </p>
      <div className="max-w-screen-xl mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-blue-700/10 text-blue-700 rounded-full">
            <MailIcon />
          </div>
          <h3 className="mt-6 font-bold text-xl">Email</h3>
          <p className="mt-2 text-muted-foreground">
            Our friendly team is here to help.
          </p>
          <Link
            className="mt-4 font-bold text-blue-700"
            href="mailto:summarly.ai@gmail.com"
          >
            summarly.ai@gmail.com
          </Link>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-blue-700/10 text-blue-700 rounded-full">
            <MapPinIcon />
          </div>
          <h3 className="mt-6 font-bold text-xl">Office</h3>
          <p className="mt-2 text-muted-foreground">
            Come say hello at our office HQ.
          </p>
          <Link
            className="mt-4 font-bold text-blue-700"
            href="https://map.google.com"
            target="_blank"
          >
            100 Smith Street Collingwood <br /> VIC 3066 AU
          </Link>
        </div>
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-blue-700/10 text-blue-700 rounded-full">
            <PhoneIcon />
          </div>
          <h3 className="mt-6 font-bold text-xl">Phone</h3>
          <p className="mt-2 text-muted-foreground">Mon-Fri from 8am to 5pm.</p>
          <Link
            className="mt-4 font-bold text-blue-700"
            href="tel:summarly.ai@gmail.com"
          >
            +1 (555) 000-0000
          </Link>
        </div>
      </div>
    </div>
  </div>
);
