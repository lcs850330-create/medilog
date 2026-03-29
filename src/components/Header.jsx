import { ArrowLeft, Plus } from 'lucide-react'
import styles from './Header.module.css'
export default function Header({ onNew, view, onBack, editRecord }) {
  const showBack = view === 'detail' || view === 'form'
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {showBack
            ? <button className={styles.backBtn} onClick={onBack}><ArrowLeft size={16} /><span>返回</span></button>
            : <div className={styles.brand}><div className={styles.brandIcon}>✚</div><div><h1 className={styles.title}>MediLog</h1><p className={styles.subtitle}>診療日誌</p></div></div>}
        </div>
        <div className={styles.center}>
          {view === 'form' && <span className={styles.pageTitle}>{editRecord ? '編輯記錄' : '新增就診記錄'}</span>}
          {view === 'detail' && <span className={styles.pageTitle}>就診詳情</span>}
        </div>
        <div className={styles.right}>
          {view === 'list' && <button className={styles.newBtn} onClick={onNew}><Plus size={16} /><span>新增</span></button>}
        </div>
      </div>
    </header>
  )
}
