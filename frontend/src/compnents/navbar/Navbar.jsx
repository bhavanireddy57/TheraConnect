import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("tokenUser");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDelete = () => setShowDeleteModal(true);

  const confirmDelete = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/delete-user/${user}`, { method: "DELETE" });
      handleLogout();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => setShowDeleteModal(false);

  return (
    <div className="bg-white w-full z-50 shadow-lg">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZrRgwuKA5JrFS4glBVgzvmPDhhPjWrObr-D01xeKZQ&s" alt="Your Company" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a href={`/${user}/mood`} className="text-sm font-semibold leading-6 text-gray-900">Mood Tracker</a>
            <a href={`/${user}/therapist`} className="text-sm font-semibold leading-6 text-gray-900">AI Therapist</a>
            <a href={`/${user}/quiz`} className="text-sm font-semibold leading-6 text-gray-900">Quiz</a>
            <a href={`/${user}/anonymoussharing`} className="text-sm font-semibold leading-6 text-gray-900">Anonymous Sharing</a>
             <a href="/games" className="text-sm font-semibold leading-6 text-gray-900">Games</a>
             <a href={`/${user}/drawing`} className="text-sm font-semibold leading-6 text-gray-900">DrawingPad</a>
            
            <a href="/aboutus" className="text-sm font-semibold leading-6 text-gray-900">About Us</a>
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user" alt="Profile" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href={`/${user}/profile`} className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Sign out</button>
                    <button onClick={handleDelete} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Delete Profile</button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Login →</a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQZrRgwuKA5JrFS4glBVgzvmPDhhPjWrObr-D01xeKZQ&s" alt="Your Company" />
                </a>
                <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMobileMenu}>
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a href={`/${user}/mood`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Mood Tracker</a>
                    <a href={`/${user}/therapist`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">AI Therapist</a>
                    <a href={`/${user}/quiz`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Quiz</a>
                    <a href={`/${user}/anonymoussharing`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Anonymous Sharing</a>
                    <a href="/games" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Games</a> {/* ADD THIS */}
                    <a href="/aboutus" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About Us</a>
                    <a href={`/${user}/drawing`} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">DrawingPad</a>
                  </div>
                  <div className="py-6">
                    {isLoggedIn ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          aria-expanded={dropdownOpen}
                          aria-haspopup="true"
                          onClick={toggleDropdown}
                        >
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716336000&semt=ais_user" alt="Profile" />
                        </button>
                        {dropdownOpen && (
                          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            <a href={`/${user}/profile`} className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Sign out</button>
                            <button onClick={handleDelete} className="block px-4 py-2 text-sm text-gray-700 w-full text-left">Delete Profile</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Login →</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </header>

      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900" id="modal-title">Delete Profile</h3>
                <p className="mt-2 text-sm text-gray-500">Are you sure you want to delete your profile? This action cannot be undone.</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700">Delete</button>
                <button onClick={closeModal} className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
