export default function PagesLoading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
        zIndex: 9999,
      }}
    >
      <img
        src="/logo-event-force.png"
        alt="Event Force"
        width={180}
        height={54}
        style={{
          marginBottom: '24px',
        }}
      />
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(82, 164, 193, 0.2)',
          borderTopColor: '#52A4C1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p
        style={{
          marginTop: '16px',
          color: '#52A4C1',
          fontSize: '14px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-outfit), Arial, sans-serif',
        }}
      >
        Loading...
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

