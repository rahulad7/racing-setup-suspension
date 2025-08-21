import React from 'react';

const TwoDaysPayPalButton: React.FC = () => {
  const handlePayPalClick = () => {
    // Create PayPal payment URL for $14.95 one-time payment
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Two Days Access&amount=14.95&currency_code=USD&return=YOUR_RETURN_URL&cancel_return=YOUR_CANCEL_URL`;
    window.open(paypalUrl, '_blank');
  };

  return (
    <button
      onClick={handlePayPalClick}
      className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28A.78.78 0 0 1 5.717 1.6h6.441c1.564 0 2.895.012 3.84.395.939.382 1.527.965 1.527 2.058 0 3.165-2.631 4.05-6.3 4.05h-2.94l-1.21 6.234zm6.659-15.31c-1.51 0-2.895.37-3.84.395-.94.024-1.527.965-1.527 2.058 0 3.165 2.631 4.05 6.3 4.05h2.94l1.21-6.234H13.735z"
          fill="currentColor"
        />
      </svg>
      Pay $14.95 for Two Days Access
    </button>
  );
};

export default TwoDaysPayPalButton;