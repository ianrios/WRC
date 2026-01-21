import CookieConsent from "react-cookie-consent";

export function Footer() {
  return (
    <footer>
      <CookieConsent
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          margin: "20px auto",
          padding: "20px 30px",
          maxWidth: "600px",
          width: "calc(100% - 40px)",
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
          bottom: "20px",
          top: "auto",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: "1002",
        }}
        buttonStyle={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "6px",
          color: "white",
          padding: "10px 24px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        contentStyle={{
          flex: "1",
          margin: "0",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        This site uses cookies to enhance your experience.
      </CookieConsent>
    </footer>
  );
}
