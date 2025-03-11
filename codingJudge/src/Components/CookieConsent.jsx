import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [cookiesBlocked, setCookiesBlocked] = useState(false);

  useEffect(() => {
    // Check if all cookies are disabled in the browser settings
    if (!navigator.cookieEnabled) {
      console.warn("Cookies are completely disabled!");
      setCookiesBlocked(true);
      setShowBanner(true);
      return;
    }

    // Test if third-party cookies are blocked
    try {
      document.cookie = "test_cookie=1; path=/"; // Attempt to set a test cookie
      
      // Check if the cookie is actually stored
      if (!document.cookie.includes("test_cookie")) {
        console.warn("Third-party cookies might be blocked!");
        setCookiesBlocked(true);
        setShowBanner(true);
        return;
      }

      // Remove the test cookie to clean up
      document.cookie = "test_cookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    } catch (error) {
      console.error("Error setting test cookie:", error);
      setCookiesBlocked(true);
      setShowBanner(true);
      return;
    }

    // Check if the user has already accepted cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // Handle user accepting cookies
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Store consent in local storage
    setShowBanner(false); // Hide the banner
  };

  return (
    showBanner && (
      <div
        className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center"
        aria-live="assertive" // Announce changes to screen readers
      >
        <p>
          {cookiesBlocked
            ? "Your browser has blocked cookies, which may cause issues. Please enable cookies for a better experience."
            : "This website uses cookies for authentication. Please accept to continue."}
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Accept
        </button>
      </div>
    )
  );
};

export default CookieConsent;
