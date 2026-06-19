import { useState } from 'react'
import { FieldLabel, TextInput, TextArea, FieldError } from '../App.jsx'
import { SectionHeader } from './Step1.jsx'

const USAGE_OPTIONS = ['classroom instruction', 'assemblies', 'staff training', 'parent engagement', 'student leadership', 'other']

function SubLabel({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8dc640', marginBottom: 18 }}>{children}</div>
}

function Divider() {
  return <div style={{ borderTop: '1.5px solid rgba(66,66,66,0.08)', paddingTop: 8, marginBottom: 18 }} />
}

export default function Step3({ fields, errors, set, toggleUsage }) {
  return (
    <div style={{ padding: '40px 48px 8px' }}>
      <SectionHeader n={3} title="impact & commitment" />

      {/* Program Impact */}
      <SubLabel>program impact</SubLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>approx. students impacted</FieldLabel>
            <TextInput type="number" value={fields.studentsImpacted} onChange={v => set('studentsImpacted', v)} placeholder="e.g. 850" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>approx. staff participating</FieldLabel>
            <TextInput type="number" value={fields.staffParticipating} onChange={v => set('staffParticipating', v)} placeholder="e.g. 45" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600, textTransform: 'lowercase', color: '#424242' }}>
            how will your school use the program? <span style={{ fontWeight: 500, color: '#898989' }}>check all that apply</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {USAGE_OPTIONS.map(opt => (
              <CheckboxChip
                key={opt}
                label={opt}
                checked={fields.usageOptions.includes(opt)}
                onChange={() => toggleUsage(opt)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Commitment & Readiness */}
      <Divider />
      <SubLabel>commitment &amp; readiness</SubLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ fontSize: 13, fontWeight: 600, textTransform: 'lowercase', color: '#424242' }}>has school leadership approved participation?</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['yes', 'no'].map(val => (
              <PillRadio key={val} label={val} name="leadershipApproved" value={val} checked={fields.leadershipApproved === val} onChange={() => set('leadershipApproved', val)} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <FieldLabel>who will serve as the program champion / coordinator?</FieldLabel>
          <TextInput value={fields.champion} onChange={v => set('champion', v)} placeholder="name and role" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, textTransform: 'lowercase', color: '#424242' }}>describe your implementation plan.</label>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#898989' }}>a few sentences — this helps us identify schools that are ready to execute, not just seeking funding.</p>
          <TextArea value={fields.implementationPlan} onChange={v => set('implementationPlan', v)} rows={4} placeholder="how and when will you roll the program out across the school year?" />
        </div>
      </div>

      {/* Reporting Commitment */}
      <Divider />
      <SubLabel>reporting commitment</SubLabel>
      <div style={{ marginBottom: 36 }}>
        <p style={{ margin: '0 0 12px', fontSize: 14, color: '#424242', fontWeight: 600 }}>if awarded funding, our school agrees to:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['reportImplement', 'implement the program during the funded school year'],
            ['reportImpact', 'provide a brief year-end impact report'],
            ['reportParticipation', 'share participation and outcome information requested by the foundation'],
            ['reportAnonymized', 'allow anonymized results to be used in donor impact reporting'],
          ].map(([key, text]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 14, lineHeight: 1.45, color: '#424242', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={fields[key]}
                onChange={e => set(key, e.target.checked)}
                style={{ accentColor: '#8dc640', width: 17, height: 17, marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
              />
              {text}
            </label>
          ))}
        </div>
      </div>

      {/* Certification */}
      <Divider />
      <SubLabel>certification</SubLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>applicant name</FieldLabel>
            <TextInput value={fields.applicantName} onChange={v => set('applicantName', v)} placeholder="first and last name" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>title</FieldLabel>
            <TextInput value={fields.applicantTitle} onChange={v => set('applicantTitle', v)} placeholder="role" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>date</FieldLabel>
            <TextInput type="date" value={fields.applicantDate} onChange={v => set('applicantDate', v)} />
          </div>
        </div>
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, lineHeight: 1.45, color: '#424242', cursor: 'pointer',
          background: '#f1f7e4',
          border: `1.5px solid ${errors.certify ? '#fb6619' : 'rgba(141,198,64,0.45)'}`,
          borderRadius: 12, padding: '16px 18px',
        }}>
          <input
            type="checkbox"
            checked={fields.certify}
            onChange={e => set('certify', e.target.checked)}
            style={{ accentColor: '#8dc640', width: 19, height: 19, marginTop: 1, cursor: 'pointer', flexShrink: 0 }}
          />
          <span><span style={{ color: '#ec068d', fontWeight: 700 }}>*</span> i certify that the information provided is accurate and complete.</span>
        </label>
        {errors.certify && <FieldError message="please confirm the certification to submit your application." />}
      </div>
    </div>
  )
}

function CheckboxChip({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#424242',
      background: '#fff', border: '1.5px solid rgba(66,66,66,0.18)', borderRadius: 8,
      padding: '11px 14px', cursor: 'pointer',
    }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: '#8dc640', width: 17, height: 17, cursor: 'pointer' }} />
      {label}
    </label>
  )
}

function PillRadio({ label, name, value, checked, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: '#424242',
      background: '#fff', border: '1.5px solid rgba(66,66,66,0.18)', borderRadius: 999,
      padding: '10px 20px', cursor: 'pointer',
    }}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} style={{ accentColor: '#8dc640', width: 16, height: 16, cursor: 'pointer' }} />
      {label}
    </label>
  )
}
