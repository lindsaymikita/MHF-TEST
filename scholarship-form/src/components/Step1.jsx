import { FieldLabel, TextInput, FieldError } from '../App.jsx'

export default function Step1({ fields, errors, set }) {
  return (
    <div style={{ padding: '40px 48px 8px' }}>
      <SectionHeader n={1} title="school information" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <FieldLabel required>school name</FieldLabel>
          <TextInput
            value={fields.schoolName}
            onChange={v => set('schoolName', v)}
            placeholder="e.g. Forest Hills Central High School"
            error={errors.schoolName}
          />
          {errors.schoolName && <FieldError message="please enter your school's name to continue." />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <FieldLabel>school district</FieldLabel>
          <TextInput value={fields.schoolDistrict} onChange={v => set('schoolDistrict', v)} placeholder="e.g. Forest Hills Public Schools" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <FieldLabel>school address</FieldLabel>
          <TextInput value={fields.schoolAddress} onChange={v => set('schoolAddress', v)} placeholder="street, city, state, zip" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>primary contact name</FieldLabel>
            <TextInput value={fields.contactName} onChange={v => set('contactName', v)} placeholder="first and last name" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>title / role</FieldLabel>
            <TextInput value={fields.titleRole} onChange={v => set('titleRole', v)} placeholder="e.g. school counselor" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>email address</FieldLabel>
            <TextInput type="email" value={fields.email} onChange={v => set('email', v)} placeholder="name@school.org" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <FieldLabel>phone number</FieldLabel>
            <TextInput type="tel" value={fields.phone} onChange={v => set('phone', v)} placeholder="(000) 000-0000" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <FieldLabel optional="optional, but helpful">principal / superintendent name</FieldLabel>
          <TextInput value={fields.principalName} onChange={v => set('principalName', v)} placeholder="first and last name" />
        </div>

      </div>
    </div>
  )
}

export function SectionHeader({ n, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 999, background: '#8dc640', color: '#fbf9de', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
      <h2 style={{ margin: 0, fontWeight: 700, textTransform: 'lowercase', letterSpacing: '-0.02em', fontSize: 24, color: '#898989' }}>{title}</h2>
    </div>
  )
}
