import { useState } from 'react'
import styles from './RecordForm.module.css'
export default function RecordForm({ onSave, onCancel, initialData, statusOptions }) {
  const [form, setForm] = useState(initialData || { visitDate: new Date().toISOString().split('T')[0], hospital: '', department: '', doctor: '', chiefComplaint: '', diagnosis: '', treatment: '', medications: '', labResults: '', notes: '', status: 'pending', nextVisitDate: '' })
  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }))
  const handleSubmit = () => { if (!form.visitDate || !form.hospital) return alert('請填寫就診日期與醫院名稱'); onSave(form) }
  return (
    <div className={styles.container}>
      <section className={styles.section}><h2 className={styles.sectionTitle}>基本資訊</h2><div className={styles.sectionBody}>
        <div className={styles.row}><div className={styles.field}><label className={styles.label}>就診日期 *</label><input type="date" value={form.visitDate} onChange={set('visitDate')} className={styles.input}/></div><div className={styles.field}><label className={styles.label}>狀態</label><select value={form.status} onChange={set('status')} className={styles.input}>{statusOptions.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}</select></div></div>
        <div className={styles.field}><label className={styles.label}>醫院 / 診所 *</label><input type="text" value={form.hospital} onChange={set('hospital')} placeholder="例：台大醫院" className={styles.input}/></div>
        <div className={styles.row}><div className={styles.field}><label className={styles.label}>科別</label><input type="text" value={form.department} onChange={set('department')} placeholder="例：內科" className={styles.input}/></div><div className={styles.field}><label className={styles.label}>醫師</label><input type="text" value={form.doctor} onChange={set('doctor')} placeholder="例：王醫師" className={styles.input}/></div></div>
      </div></section>
      <section className={styles.section}><h2 className={styles.sectionTitle}>就診內容</h2><div className={styles.sectionBody}>
        <div className={styles.field}><label className={styles.label}>主訴</label><textarea value={form.chiefComplaint} onChange={set('chiefComplaint')} placeholder="描述主要不適症狀…" className={styles.textarea} rows={2}/></div>
        <div className={styles.field}><label className={styles.label}>診斷</label><textarea value={form.diagnosis} onChange={set('diagnosis')} placeholder="醫師診斷結果…" className={styles.textarea} rows={2}/></div>
        <div className={styles.field}><label className={styles.label}>處置 / 治療</label><textarea value={form.treatment} onChange={set('treatment')} placeholder="醫師的處置與治療方式…" className={styles.textarea} rows={2}/></div>
        <div className={styles.field}><label className={styles.label}>用藥</label><textarea value={form.medications} onChange={set('medications')} placeholder="開立藥物名稱與劑量…" className={styles.textarea} rows={2}/></div>
        <div className={styles.field}><label className={styles.label}>檢驗 / 檢查結果</label><textarea value={form.labResults} onChange={set('labResults')} placeholder="血液報告、影像結果等…" className={styles.textarea} rows={2}/></div>
      </div></section>
      <section className={styles.section}><h2 className={styles.sectionTitle}>後續追蹤</h2><div className={styles.sectionBody}>
        <div className={styles.field}><label className={styles.label}>下次回診日期</label><input type="date" value={form.nextVisitDate} onChange={set('nextVisitDate')} className={styles.input}/></div>
        <div className={styles.field}><label className={styles.label}>備註</label><textarea value={form.notes} onChange={set('notes')} placeholder="其他注意事項或備忘…" className={styles.textarea} rows={3}/></div>
      </div></section>
      <div className={styles.actions}><button className={styles.cancelBtn} onClick={onCancel}>取消</button><button className={styles.saveBtn} onClick={handleSubmit}>儲存記錄</button></div>
    </div>
  )
}
