import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import styles from './ShareModal.module.css'
export default function ShareModal({ record, onClose, statusOptions }) {
  const [copied, setCopied] = useState(false)
  const status = statusOptions.find(s => s.value === record.status)
  const lines = [`📋 MediLog 就診記錄`,``,`📅 就診日期：${record.visitDate}`,`🏥 醫院：${record.hospital}`]
  if (record.department) lines.push(`🔬 科別：${record.department}`)
  if (record.doctor) lines.push(`👨‍⚕️ 醫師：${record.doctor}`)
  if (status) lines.push(`📌 狀態：${status.label}`)
  lines.push(``)
  if (record.chiefComplaint) lines.push(`【主訴】\n${record.chiefComplaint}`)
  if (record.diagnosis) lines.push(`【診斷】\n${record.diagnosis}`)
  if (record.treatment) lines.push(`【處置】\n${record.treatment}`)
  if (record.medications) lines.push(`【用藥】\n${record.medications}`)
  if (record.labResults) lines.push(`【檢驗結果】\n${record.labResults}`)
  if (record.nextVisitDate) lines.push(`\n⏭ 下次回診：${record.nextVisitDate}`)
  if (record.notes) lines.push(`📝 備註：${record.notes}`)
  const text = lines.join('\n')
  const handleCopy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2000) }
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e=>e.stopPropagation()}>
        <div className={styles.header}><h3>分享就診記錄</h3><button className={styles.close} onClick={onClose}><X size={18}/></button></div>
        <div className={styles.preview}><pre className={styles.text}>{text}</pre></div>
        <div className={styles.footer}><p className={styles.hint}>複製後可貼到 LINE、簡訊或 Email</p><button className={styles.copyBtn} onClick={handleCopy}>{copied?<Check size={15}/>:<Copy size={15}/>}{copied?'已複製！':'複製文字'}</button></div>
      </div>
    </div>
  )
}
