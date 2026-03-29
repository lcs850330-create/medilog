import { Calendar, MapPin, ChevronRight, ClipboardList } from 'lucide-react'
import styles from './RecordList.module.css'
export default function RecordList({ records, allRecords, onView, onNew, filterStatus, setFilterStatus, statusOptions }) {
  const counts = statusOptions.reduce((acc, s) => { acc[s.value] = allRecords.filter(r => r.status === s.value).length; return acc }, {})
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <button className={`${styles.statCard} ${filterStatus==='all'?styles.active:''}`} onClick={()=>setFilterStatus('all')}><span className={styles.statNum}>{allRecords.length}</span><span className={styles.statLabel}>全部</span></button>
        {statusOptions.map(s=><button key={s.value} className={`${styles.statCard} ${filterStatus===s.value?styles.active:''}`} onClick={()=>setFilterStatus(s.value)}><span className={styles.statNum}>{counts[s.value]||0}</span><span className={styles.statLabel}>{s.label}</span></button>)}
      </div>
      {records.length===0
        ? <div className={styles.empty}><ClipboardList size={40} strokeWidth={1.2}/><p>{filterStatus==='all'?'尚無就診記錄':`沒有「${statusOptions.find(s=>s.value===filterStatus)?.label}」的記錄`}</p>{filterStatus==='all'&&<button className={styles.emptyBtn} onClick={onNew}>新增第一筆記錄</button>}</div>
        : <div className={styles.list}>{records.map((r,i)=>{ const st=statusOptions.find(s=>s.value===r.status); return <button key={r.id} className={styles.card} onClick={()=>onView(r)} style={{animationDelay:`${i*0.04}s`}}><div className={styles.cardTop}><div className={styles.cardMeta}><Calendar size={12}/><span>{r.visitDate}</span></div>{st&&<span className={styles.badge} style={{'--c':st.color}}>{st.label}</span>}</div><div className={styles.cardMain}><h3 className={styles.cardTitle}>{r.hospital}</h3><p className={styles.cardDept}>{r.department}{r.doctor?` · ${r.doctor}`:''}</p>{r.chiefComplaint&&<p className={styles.cardComplaint}>{r.chiefComplaint}</p>}</div>{r.nextVisitDate&&<div className={styles.cardNext}><MapPin size={11}/><span>下次回診：{r.nextVisitDate}</span></div>}<ChevronRight size={16} className={styles.cardArrow}/></button>})}</div>}
    </div>
  )
}
