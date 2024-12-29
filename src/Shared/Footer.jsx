import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white py-10 mt-8">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Contact Section */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-3xl font-semibold mb-4 hover:text-[#FFD700] transition-all duration-300">Contact Us</h4>
                        <p className="text-lg hover:text-[#FFD700] transition-all duration-300">Email: support@example.com</p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-3xl font-semibold mb-4 hover:text-[#FFD700] transition-all duration-300">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/home" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Home</a></li>
                            <li><a href="/privacy-policy" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social Media Links Section */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-3xl font-semibold mb-4 hover:text-[#FFD700] transition-all duration-300">Follow Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-center sm:justify-start transition-transform duration-300 hover:scale-110">
                                <FaFacebook className="mr-2 text-3xl text-white transition-all duration-300 hover:text-[#3b5998]" />
                                <a href="https://facebook.com" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Facebook</a>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start transition-transform duration-300 hover:scale-110">
                                <GrInstagram className="mr-2 text-3xl text-white transition-all duration-300 hover:text-[#E1306C]" />
                                <a href="https://instagram.com" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Instagram</a>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start transition-transform duration-300 hover:scale-110">
                                <FaTwitter className="mr-2 text-3xl text-white transition-all duration-300 hover:text-[#1DA1F2]" />
                                <a href="https://twitter.com" className="text-white hover:text-[#FFD700] text-lg transition-all duration-300">Twitter</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Information */}
                <div className="mt-8 text-center text-sm sm:text-base">
                    <p>© 2024 VolunteerManagement. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
