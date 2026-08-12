import "./WhatsAppHelp.css";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppHelp() {
  const handleClick = () => {
    const whatsappNumber = "917356884862";
    const message = encodeURIComponent(
      "Hello Aiwa Fruits, I need help with my order."
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="wa-wrapper">
      <span className="wa-label" aria-hidden="true">
        Help Chat
      </span>

      <button
        className="wa-button"
        onClick={handleClick}
        aria-label="Chat with Aiwa Fruits on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={26} />
      </button>
    </div>
  );
}

export default WhatsAppHelp;
