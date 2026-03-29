import { Edit2, Trash2, Share2, Calendar, MapPin } from 'lucide-react'
import { generatePDF } from '../utils/pdf.js'
import styles from './RecordDetail.module.css'
export default function RecordDetail({ record, onEdit, onDelete, onShare, onBack, statusOptions }) {
  const status = statusOptions.find(s => s.value === record.status)
  const handleDelete = () => { if (window.confirm('確定要刪除這筆記錄嗎？')) onDelete(record.id) }
  const fields = [{ label: '主訴', value: record.chiefComplaint },{ label: '診斷', value: record.diagnosis },{ label: '處置 / 治療', value: record.treatment },{ label: '用藥', value: record.medications },{ label: '檢驗 / 檢查結果', value: record.labResults },{ label: '備註', value: record.notes }].filter(f=>f.value)
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTop}><div className={styles.dateBadge}><Calendar size={12}/>{record.visitDate}</div>{status&&<span className={styles.badge} style={{'--c':status.color}}>{status.label}</span>}</div>
        <h2 className={styles.hospital}>{record.hospital}</h2>
        {(record.department||record.doctor)&&<p className={styles.dept}>{[record.department,record.doctor].filter(Boolean).join(' · ')}</p>}
        {record.nextVisitDate&&<div className={styles.nextVisit}><MapPin size={13}/>下次回診：{record.nextVisitDate}</div>}
      </div>
      {fields.length>0&&<div className={styles.content}>{fields.map(f=><div key={f.label} className={styles.field}><dt className={styles.fieldLabel}>{f.label}</dt><dd className={styles.fieldValue}>{f.value}</dd></div>)}</div>}
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={()=>onShare(record)}><Share2 size={15}/>分享</button>
        <button className={styles.actionBtn} onClick={()=>generatePDF(record,statusOptions)}>📄 PDF</button>
        <button className={styles.actionBtn} onClick={()=>onEdit(record)}><Edit2 size={15}/>編輯</button>
        <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={handleDelete}><Trash2 size={15}/>刪除</button>
      </div>
    </div>
  )
}
