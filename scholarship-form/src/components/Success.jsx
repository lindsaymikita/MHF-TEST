export default function Success() {
  return (
    <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 32px rgba(66,66,66,0.10)', padding: '64px 48px', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: 999, background: '#8dc640', color: '#fbf9de', fontSize: 32, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>✓</div>
      <h1 style={{ margin: '0 0 14px', fontWeight: 700, textTransform: 'lowercase', letterSpacing: '-0.02em', fontSize: 36, color: '#8dc640' }}>thank you — your application is in.</h1>
      <p style={{ margin: '0 auto', maxWidth: '46ch', fontSize: 16, lineHeight: 1.6, color: '#424242' }}>we've received your scholarship application. our team will review it and reach out to your primary contact within two weeks. thank you for working to build a psychologically safer community.</p>
    </div>
  )
}
