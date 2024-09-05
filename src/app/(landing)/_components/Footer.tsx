import React from 'react';

const Footer = () => {
    return (
        <footer className=" text-white ">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 mb-12 border-t">

                {/* Left Section: Company Name & Copyright */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>

                {/* Right Section: Links */}
                <div className="text-center md:text-right">
                    <a href="/privacy-policy" className="hover:underline mx-2">Privacy Policy</a> |
                    <a href="/terms-of-service" className="hover:underline mx-2">Terms of Service</a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
