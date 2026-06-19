import { useState } from 'react'
import Step1 from './components/Step1.jsx'
import Step2 from './components/Step2.jsx'
import Step3 from './components/Step3.jsx'
import Success from './components/Success.jsx'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'

const initialState = {
  // Step 1
  schoolName: '',
  schoolDistrict: '',
  schoolAddress: '',
  contactName: '',
  titleRole: '',
  email: '',
  phone: '',
  principalName: '',
  // Step 2
  communityNarrative: '',
  fundingReason: '',
  barriers: '',
  // Step 3
  studentsImpacted: '',
  staffParticipating: '',
  usageOptions: [],
  leadershipApproved: '',
  champion: '',
  implementationPlan: '',
  reportImplement: false,
  reportImpact: false,
  reportParticipation: false,
  reportAnonymized: false,
  applicantName: '',
  applicantTitle: '',
  applicantDate: '',
  certify: false,
}

const initialErrors = {
  schoolName: false,
  fundingReason: false,
  certify: false,
}

export default function App() {
  const [page, setPage] = useState(1)
  const [fields, setFields] = useState(initialState)
  const [errors, setErrors] = useState(initialErrors)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  function set(key, value) {
    setFields(f => ({ ...f, [key]: value }))
    if (key in errors) setErrors(e => ({ ...e, [key]: false }))
  }

  function toggleUsage(option) {
    setFields(f => ({
      ...f,
      usageOptions: f.usageOptions.includes(option)
        ? f.usageOptions.filter(o => o !== option)
        : [...f.usageOptions, option],
    }))
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleContinue() {
    if (page === 1) {
      if (!fields.schoolName.trim()) { setErrors(e => ({ ...e, schoolName: true })); return }
      setPage(2); scrollTop()
    } else if (page === 2) {
      if (!fields.fundingReason.trim()) { setErrors(e => ({ ...e, fundingReason: true })); return }
      setPage(3); scrollTop()
    } else {
      if (!fields.certify) { setErrors(e => ({ ...e, certify: true })); return }
      handleSubmit()
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const payload = {
        ...fields,
        usageOptions: fields.usageOptions.join(', '),
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
        scrollTop()
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <PageShell>
        <Success />
      </PageShell>
    )
  }

  const intros = {
    1: "we use this application to find schools that are the right fit — and have the resources — to bring a proactive mental health program to their community. let's start with the basics.",
    2: 'this section helps us understand the students you serve and why funding support would make a difference.',
    3: 'finally, tell us about the reach of the program at your school, your readiness to implement, and your reporting commitment.',
  }
  const continueLabel = { 1: 'continue', 2: 'save & continue', 3: submitting ? 'submitting…' : 'submit application' }

  return (
    <PageShell>
      <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 12px 32px rgba(66,66,66,0.10)', overflow: 'hidden' }}>
        {/* Header band */}
        <div style={{ padding: '40px 48px 32px', borderBottom: '1.5px solid rgba(66,66,66,0.10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#898989' }}>scholarship application</span>
            <span style={{ height: 4, width: 4, borderRadius: 999, background: '#898989', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8dc640' }}>page {page} of 3</span>
          </div>
          <h1 style={{ margin: '0 0 12px', fontWeight: 700, textTransform: 'lowercase', letterSpacing: '-0.02em', lineHeight: 1.05, fontSize: 40, color: '#8dc640' }}>school funding application</h1>
          <p style={{ margin: 0, maxWidth: '52ch', fontSize: 16, lineHeight: 1.6, color: '#424242' }}>{intros[page]}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ flex: 1, height: 6, borderRadius: 999, background: n <= page ? '#8dc640' : '#f4efc6' }} />
            ))}
          </div>
        </div>

        {/* Step content */}
        {page === 1 && <Step1 fields={fields} errors={errors} set={set} />}
        {page === 2 && <Step2 fields={fields} errors={errors} set={set} />}
        {page === 3 && <Step3 fields={fields} errors={errors} set={set} toggleUsage={toggleUsage} />}

        {/* Footer */}
        <div style={{ padding: '32px 48px 40px', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          {page === 1 ? (
            <p style={{ margin: 0, fontSize: 13, color: '#898989', maxWidth: '38ch' }}>
              <span style={{ color: '#ec068d', fontWeight: 700 }}>*</span> required. your information is kept confidential.
            </p>
          ) : (
            <BackButton onClick={() => { setPage(p => p - 1); scrollTop() }} />
          )}
          {submitError && (
            <p style={{ margin: 0, fontSize: 13, color: '#fb6619', fontWeight: 500 }}>something went wrong — please try again.</p>
          )}
          <PrimaryButton onClick={handleContinue} disabled={submitting}>{continueLabel[page]}</PrimaryButton>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: '#898989' }}>mental health foundation of west michigan</div>
    </PageShell>
  )
}

function PageShell({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fbf9de', padding: '48px 24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 40, fontWeight: 700, letterSpacing: '-0.02em', fontSize: 26, lineHeight: 1 }}>
          <span style={{ color: '#8dc640' }}>be nice</span><span style={{ color: '#ec068d' }}>.</span>
        </div>
        {children}
      </div>
    </div>
  )
}

export function PrimaryButton({ children, onClick, disabled }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontWeight: 700, textTransform: 'lowercase', fontSize: 16, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '13px 30px', borderRadius: 999, letterSpacing: '-0.01em',
        background: hover && !disabled ? '#f33ea4' : '#ec068d', color: '#fbf9de',
        boxShadow: hover && !disabled ? '0 4px 12px rgba(236,6,141,0.25)' : 'none',
        transition: 'all 180ms cubic-bezier(.2,0,.2,1)',
        opacity: disabled ? 0.7 : 1,
      }}
    >{children}</button>
  )
}

export function BackButton({ onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontWeight: 700, textTransform: 'lowercase', fontSize: 16, cursor: 'pointer',
        padding: '13px 28px', borderRadius: 999, letterSpacing: '-0.01em',
        background: hover ? '#f4efc6' : 'transparent',
        color: hover ? '#424242' : '#898989',
        border: '1.5px solid rgba(66,66,66,0.18)',
        transition: 'all 180ms cubic-bezier(.2,0,.2,1)',
      }}
    >back</button>
  )
}

export function FieldLabel({ children, required, optional }) {
  return (
    <label style={{ fontSize: 13, fontWeight: 600, textTransform: 'lowercase', color: '#424242', display: 'flex', alignItems: 'center', gap: 5 }}>
      {children}
      {required && <span style={{ color: '#ec068d', fontWeight: 700 }}>*</span>}
      {optional && <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'lowercase', color: '#898989' }}>{optional}</span>}
    </label>
  )
}

export function TextInput({ value, onChange, placeholder, type = 'text', error, onClearError }) {
  const [focus, setFocus] = useState(false)
  const base = 'font-size:15px; color:#424242; background:#fff; border-radius:6px; padding:12px 14px; outline:none; width:100%;'
  let border = error ? '1.5px solid #fb6619' : focus ? '1.5px solid #8dc640' : '1.5px solid rgba(66,66,66,0.18)'
  let shadow = focus && !error ? '0 0 0 3px rgba(141,198,64,0.35)' : 'none'

  return (
    <input
      type={type}
      value={value}
      onChange={e => { onChange(e.target.value); if (onClearError) onClearError() }}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{ fontFamily: 'inherit', fontSize: 15, color: '#424242', background: '#fff', border, borderRadius: 6, padding: '12px 14px', outline: 'none', width: '100%', boxShadow: shadow, transition: 'border 120ms, box-shadow 120ms' }}
    />
  )
}

export function TextArea({ value, onChange, placeholder, rows = 4, error, pinkFocus }) {
  const [focus, setFocus] = useState(false)
  let border, shadow
  if (error) {
    border = '1.5px solid #fb6619'; shadow = 'none'
  } else if (focus) {
    border = pinkFocus ? '1.5px solid #ec068d' : '1.5px solid #8dc640'
    shadow = pinkFocus ? '0 0 0 3px rgba(236,6,141,0.22)' : '0 0 0 3px rgba(141,198,64,0.35)'
  } else {
    border = pinkFocus ? '1.5px solid rgba(236,6,141,0.30)' : '1.5px solid rgba(66,66,66,0.18)'
    shadow = 'none'
  }

  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{ fontFamily: 'inherit', fontSize: 15, lineHeight: 1.55, color: '#424242', background: '#fff', border, borderRadius: 6, padding: '12px 14px', outline: 'none', width: '100%', resize: 'vertical', boxShadow: shadow, transition: 'border 120ms, box-shadow 120ms' }}
    />
  )
}

export function FieldError({ message }) {
  return <div role="alert" style={{ fontSize: 12, color: '#fb6619', fontWeight: 500 }}>{message}</div>
}
