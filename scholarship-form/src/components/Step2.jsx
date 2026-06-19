import { TextArea, FieldError } from '../App.jsx'
import { SectionHeader } from './Step1.jsx'

export default function Step2({ fields, errors, set }) {
  return (
    <div style={{ padding: '40px 48px 8px' }}>
      <SectionHeader n={2} title="school need" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 15, fontWeight: 700, textTransform: 'lowercase', color: '#424242' }}>tell us about your school community.</label>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#898989' }}>a short paragraph is plenty. you might touch on:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '2px 0 4px' }}>
            {['student population', 'community characteristics', 'mental health challenges being observed', 'why the program is needed'].map(chip => (
              <span key={chip} style={{ fontSize: 12, fontWeight: 500, color: '#6fa12d', background: '#f1f7e4', borderRadius: 999, padding: '5px 12px' }}>{chip}</span>
            ))}
          </div>
          <TextArea value={fields.communityNarrative} onChange={v => set('communityNarrative', v)} rows={5} placeholder="share a little about the students and community you serve…" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#fdf1f8', border: '1.5px solid rgba(236,6,141,0.18)', borderRadius: 12, padding: 20 }}>
          <label style={{ fontSize: 15, fontWeight: 700, textTransform: 'lowercase', color: '#424242', display: 'flex', alignItems: 'center', gap: 5 }}>
            why are you seeking funding assistance? <span style={{ color: '#ec068d', fontWeight: 700 }}>*</span>
          </label>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#c4047a', fontWeight: 600 }}>this is often the most important question — take your time with it.</p>
          <TextArea
            value={fields.fundingReason}
            onChange={v => set('fundingReason', v)}
            rows={6}
            placeholder="tell us, in your own words, why funding support matters for your school…"
            error={errors.fundingReason}
            pinkFocus
          />
          {errors.fundingReason && <FieldError message="please share why you're seeking funding before continuing." />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 15, fontWeight: 700, textTransform: 'lowercase', color: '#424242' }}>what barriers would prevent implementation without financial support?</label>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#898989' }}>a short answer is fine.</p>
          <TextArea value={fields.barriers} onChange={v => set('barriers', v)} rows={3} placeholder="e.g. limited budget for training, staffing, or materials…" />
        </div>

      </div>
    </div>
  )
}
