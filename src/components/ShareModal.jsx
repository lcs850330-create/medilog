import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import styles from './ShareModal.module.css'

export default function ShareModal({ record, onClose, statusOptions }) {
  const [copied, setCopied] = useState(false)
  const status = statusOptions.find(s => s.value === record.status)

  const lines = [
    '\ud83d\udccb MediLog \u5c31\u8a3a\u8a18\u9304',
    '',
    `\ud83d\udcc5 \u5c31\u8a3a\u65e5\u671f\uff1a${record.visitDate}`,
    `\ud83c\udfe5 \u91ab\u9662\uff1a${record.hospital}`,
  ]
  if (record.department) lines.push(`\ud83d\udd2c \u79d1\u5225\uff1a${record.department}`)
  if (record.doctor) lines.push(`\ud83d\udc68\u200d\u2695\ufe0f \u91ab\u5e2b\uff1a${record.doctor}`)
  if (status) lines.push(`\ud83d\udccc \u72c0\u614b\uff1a${status.label}`)

  // 生命徵象
  const vitals = []
  if (record.bpSystolic || record.bpDiastolic)
    vitals.push(`\u8840\u58d3\uff1a${record.bpSystolic || '-'}/${record.bpDiastolic || '-'} mmHg`)
  if (record.bloodSugar) {
    const typeMap = { fasting: '\u7a7a\u8179', postmeal: '\u98ef\u5f8c2hr', random: '\u96a8\u6a5f', hba1c: 'HbA1c' }
    vitals.push(`\u8840\u7cd6\uff1a${record.bloodSugar} mg/dL (${typeMap[record.bloodSugarType] || ''})`)
  }
  if (record.weight) vitals.push(`\u9ad4\u91cd\uff1a${record.weight} kg`)
  if (record.bmi) vitals.push(`BMI\uff1a${record.bmi}`)
  if (vitals.length > 0) {
    lines.push('')
    lines.push('\u2665\ufe0f \u751f\u547d\u5fb5\u8c61')
    vitals.forEach(v => lines.push(`  ${v}`))
  }

  // 抽血報告
  const labs = []
  if (record.wbc || record.rbc || record.hgb || record.plt) {
    const cbc = [record.wbc && `WBC ${record.wbc}`, record.rbc && `RBC ${record.rbc}`, record.hgb && `Hgb ${record.hgb}`, record.plt && `PLT ${record.plt}`].filter(Boolean)
    labs.push(`CBC\uff1a${cbc.join(' | ')}`)
  }
  if (record.creatinine || record.bun || record.sodium || record.potassium) {
    const renal = [record.creatinine && `Cr ${record.creatinine}`, record.bun && `BUN ${record.bun}`, record.sodium && `Na ${record.sodium}`, record.potassium && `K ${record.potassium}`].filter(Boolean)
    labs.push(`\u814e\u529f\u80fd\uff1a${renal.join(' | ')}`)
  }
  if (record.ast || record.alt || record.glucose) {
    const liver = [record.ast && `AST ${record.ast}`, record.alt && `ALT ${record.alt}`, record.glucose && `Glucose ${record.glucose}`].filter(Boolean)
    labs.push(`\u809d\u529f\u80fd\uff1a${liver.join(' | ')}`)
  }
  if (record.labOther) labs.push(`\u5176\u4ed6\uff1a${record.labOther}`)
  if (labs.length > 0) {
    lines.push('')
    lines.push('\ud83e\uddea \u62bd\u8840\u5831\u544a')
    labs.forEach(l => lines.push(`  ${l}`))
  }

  // 就診內容
  lines.push('')
  if (record.chiefComplaint) lines.push(`\u3010\u4e3b\u8a34\u3011\n${record.chiefComplaint}`)
  if (record.diagnosis) lines.push(`\u3010\u8a3a\u65b7\u3011\n${record.diagnosis}`)
  if (record.treatment) lines.push(`\u3010\u8655\u7f6e\u3011\n${record.treatment}`)
  if (record.medications) lines.push(`\u3010\u7528\u85e5\u3011\n${record.medications}`)
  if (record.labResults) lines.push(`\u3010\u5f71\u50cf\u6aa2\u67e5\u3011\n${record.labResults}`)
  if (record.nextVisitDate) lines.push(`\n\u23ed \u4e0b\u6b21\u56de\u8a3a\uff1a${record.nextVisitDate}`)
  if (record.notes) lines.push(`\ud83d\udcdd \u5099\u8a3b\uff1a${record.notes}`)

  const text = lines.join('\n')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>\u5206\u4eab\u5c31\u8a3a\u8a18\u9304</h3>
          <button className={styles.close} onClick={onClose}><X size={18} /></button>
        </div>
        <div className={styles.preview}><pre className={styles.text}>{text}</pre></div>
        <div className={styles.footer}>
          <p className={styles.hint}>\u8907\u88fd\u5f8c\u53ef\u8cbc\u5230 LINE\u3001\u7c21\u8a0a\u6216 Email</p>
          <button className={styles.copyBtn} onClick={handleCopy}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? '\u5df2\u8907\u88fd\uff01' : '\u8907\u88fd\u6587\u5b57'}
          </button>
        </div>
      </div>
    </div>
  )
}
