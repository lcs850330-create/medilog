import { useState } from 'react'
import styles from './RecordForm.module.css'

export default function RecordForm({ onSave, onCancel, initialData, statusOptions }) {
  const [form, setForm] = useState(initialData || {
    visitDate: new Date().toISOString().split('T')[0],
    hospital: '', department: '', doctor: '',
    chiefComplaint: '', diagnosis: '', treatment: '', medications: '',
    // 生命徵象
    bpSystolic: '', bpDiastolic: '',
    bloodSugar: '', bloodSugarType: 'fasting',
    weight: '', height: '',
    // 抽血報告
    wbc: '', rbc: '', hgb: '', plt: '',
    sodium: '', potassium: '', creatinine: '', bun: '',
    ast: '', alt: '', glucose: '',
    labOther: '',
    // 其他
    labResults: '', notes: '',
    status: 'pending', nextVisitDate: ''
  })

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }))

  const bmi = () => {
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height) / 100
    if (w > 0 && h > 0) return (w / (h * h)).toFixed(1)
    return ''
  }

  const handleSubmit = () => {
    if (!form.visitDate || !form.hospital) return alert('請填寫就診日期與醫院名稱')
    onSave({ ...form, bmi: bmi() })
  }

  return (
    <div className={styles.container}>

      {/* 基本資訊 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>基本資訊</h2>
        <div className={styles.sectionBody}>
          <div className={styles.row}>
            <div className={styles.field}><label className={styles.label}>就診日期 *</label><input type="date" value={form.visitDate} onChange={set('visitDate')} className={styles.input}/></div>
            <div className={styles.field}><label className={styles.label}>狀態</label><select value={form.status} onChange={set('status')} className={styles.input}>{statusOptions.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}</select></div>
          </div>
          <div className={styles.field}><label className={styles.label}>醫院 / 診所 *</label><input type="text" value={form.hospital} onChange={set('hospital')} placeholder="例：台大醫院" className={styles.input}/></div>
          <div className={styles.row}>
            <div className={styles.field}><label className={styles.label}>科別</label><input type="text" value={form.department} onChange={set('department')} placeholder="例：內科" className={styles.input}/></div>
            <div className={styles.field}><label className={styles.label}>醫師</label><input type="text" value={form.doctor} onChange={set('doctor')} placeholder="例：王醫師" className={styles.input}/></div>
          </div>
        </div>
      </section>

      {/* 生命徵象 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>生命徵象</h2>
        <div className={styles.sectionBody}>
          <div className={styles.field}>
            <label className={styles.label}>血壓（mmHg）</label>
            <div className={styles.bpRow}>
              <input type="number" value={form.bpSystolic} onChange={set('bpSystolic')} placeholder="收縮壓" className={styles.input}/>
              <span className={styles.bpSlash}>/</span>
              <input type="number" value={form.bpDiastolic} onChange={set('bpDiastolic')} placeholder="舒張壓" className={styles.input}/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>血糖（mg/dL）</label>
              <input type="number" value={form.bloodSugar} onChange={set('bloodSugar')} placeholder="數值" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>血糖類型</label>
              <select value={form.bloodSugarType} onChange={set('bloodSugarType')} className={styles.input}>
                <option value="fasting">空腹</option>
                <option value="postmeal">飯後 2hr</option>
                <option value="random">隨機</option>
                <option value="hba1c">HbA1c (%)</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>體重（kg）</label>
              <input type="number" value={form.weight} onChange={set('weight')} placeholder="例：65.5" className={styles.input}/>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>身高（cm）</label>
              <input type="number" value={form.height} onChange={set('height')} placeholder="例：170" className={styles.input}/>
            </div>
          </div>
          {bmi() && (
            <div className={styles.bmiDisplay}>
              BMI：<strong>{bmi()}</strong>
              <span className={styles.bmiNote}>{getBMILabel(bmi())}</span>
            </div>
          )}
        </div>
      </section>

      {/* 抽血報告 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>抽血報告</h2>
        <div className={styles.sectionBody}>
          <div className={styles.labGroup}>
            <p className={styles.labGroupTitle}>血球計數（CBC）</p>
            <div className={styles.labRow}>
              <LabField label="WBC" unit="10³/μL" value={form.wbc} onChange={set('wbc')}/>
              <LabField label="RBC" unit="10⁶/μL" value={form.rbc} onChange={set('rbc')}/>
              <LabField label="Hgb" unit="g/dL" value={form.hgb} onChange={set('hgb')}/>
              <LabField label="PLT" unit="10³/μL" value={form.plt} onChange={set('plt')}/>
            </div>
          </div>
          <div className={styles.labGroup}>
            <p className={styles.labGroupTitle}>腎功能</p>
            <div className={styles.labRow}>
              <LabField label="Creatinine" unit="mg/dL" value={form.creatinine} onChange={set('creatinine')}/>
              <LabField label="BUN" unit="mg/dL" value={form.bun} onChange={set('bun')}/>
              <LabField label="Na" unit="mEq/L" value={form.sodium} onChange={set('sodium')}/>
              <LabField label="K" unit="mEq/L" value={form.potassium} onChange={set('potassium')}/>
            </div>
          </div>
          <div className={styles.labGroup}>
            <p className={styles.labGroupTitle}>肝功能 / 血糖</p>
            <div className={styles.labRow}>
              <LabField label="AST" unit="U/L" value={form.ast} onChange={set('ast')}/>
              <LabField label="ALT" unit="U/L" value={form.alt} onChange={set('alt')}/>
              <LabField label="Glucose" unit="mg/dL" value={form.glucose} onChange={set('glucose')}/>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>其他檢驗數值</label>
            <textarea value={form.labOther} onChange={set('labOther')} placeholder="例：HbA1c 7.2%、CRP 0.5…" className={styles.textarea} rows={2}/>
          </div>
        </div>
      </section>

      {/* 就診內容 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>就診內容</h2>
        <div className={styles.sectionBody}>
          <div className={styles.field}><label className={styles.label}>主訴</label><textarea value={form.chiefComplaint} onChange={set('chiefComplaint')} placeholder="描述主要不適症狀…" className={styles.textarea} rows={2}/></div>
          <div className={styles.field}><label className={styles.label}>診斷</label><textarea value={form.diagnosis} onChange={set('diagnosis')} placeholder="醫師診斷結果…" className={styles.textarea} rows={2}/></div>
          <div className={styles.field}><label className={styles.label}>處置 / 治療</label><textarea value={form.treatment} onChange={set('treatment')} placeholder="醫師的處置與治療方式…" className={styles.textarea} rows={2}/></div>
          <div className={styles.field}><label className={styles.label}>用藥</label><textarea value={form.medications} onChange={set('medications')} placeholder="開立藥物名稱與劑量…" className={styles.textarea} rows={2}/></div>
          <div className={styles.field}><label className={styles.label}>影像 / 其他檢查結果</label><textarea value={form.labResults} onChange={set('labResults')} placeholder="X光、超音波、心電圖等…" className={styles.textarea} rows={2}/></div>
        </div>
      </section>

      {/* 後續追蹤 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>後續追蹤</h2>
        <div className={styles.sectionBody}>
          <div className={styles.field}><label className={styles.label}>下次回診日期</label><input type="date" value={form.nextVisitDate} onChange={set('nextVisitDate')} className={styles.input}/></div>
          <div className={styles.field}><label className={styles.label}>備註</label><textarea value={form.notes} onChange={set('notes')} placeholder="其他注意事項或備忘…" className={styles.textarea} rows={3}/></div>
        </div>
      </section>

      <div className={styles.actions}>
        <button className={styles.cancelBtn} onClick={onCancel}>取消</button>
        <button className={styles.saveBtn} onClick={handleSubmit}>儲存記錄</button>
      </div>
    </div>
  )
}

function LabField({ label, unit, value, onChange }) {
  return (
    <div className={styles.labField}>
      <label className={styles.labLabel}>{label}</label>
      <input type="number" value={value} onChange={onChange} placeholder="-" className={styles.labInput}/>
      <span className={styles.labUnit}>{unit}</span>
    </div>
  )
}

function getBMILabel(bmi) {
  const b = parseFloat(bmi)
  if (b < 18.5) return '體重過輕'
  if (b < 24) return '正常'
  if (b < 27) return '過重'
  if (b < 30) return '輕度肥胖'
  return '中重度肥胖'
}
