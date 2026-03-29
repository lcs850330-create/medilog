import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import RecordList from './components/RecordList.jsx'
import RecordForm from './components/RecordForm.jsx'
import RecordDetail from './components/RecordDetail.jsx'
import ShareModal from './components/ShareModal.jsx'
import styles from './App.module.css'

const STORAGE_KEY = 'medilog_records'
const STATUS_OPTIONS = [
  { value: 'pending', label: '待回診', color: '#B85C38' },
  { value: 'followup', label: '需追蹤', color: '#C9A84C' },
  { value: 'completed', label: '已完成', color: '#6B8F71' },
  { value: 'ongoing', label: '持續治療中', color: '#5B8DB8' },
]

export default function App() {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [view, setView] = useState('list')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [editRecord, setEditRecord] = useState(null)
  const [shareRecord, setShareRecord] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)) }, [records])

  const handleSave = (data) => {
    if (editRecord) {
      setRecords(prev => prev.map(r => r.id === editRecord.id ? { ...data, id: editRecord.id } : r))
    } else {
      setRecords(prev => [{ ...data, id: Date.now().toString() }, ...prev])
    }
    setEditRecord(null)
    setView('list')
  }
  const handleDelete = (id) => { setRecords(prev => prev.filter(r => r.id !== id)); setView('list'); setSelectedRecord(null) }
  const handleEdit = (record) => { setEditRecord(record); setView('form') }
  const handleView = (record) => { setSelectedRecord(record); setView('detail') }
  const handleNew = () => { setEditRecord(null); setView('form') }
  const handleBack = () => { setEditRecord(null); setView('list'); setSelectedRecord(null) }
  const filteredRecords = filterStatus === 'all' ? records : records.filter(r => r.status === filterStatus)

  return (
    <div className={styles.app}>
      <Header onNew={handleNew} view={view} onBack={handleBack} editRecord={editRecord} />
      <main className={styles.main}>
        {view === 'list' && <RecordList records={filteredRecords} allRecords={records} onView={handleView} onNew={handleNew} filterStatus={filterStatus} setFilterStatus={setFilterStatus} statusOptions={STATUS_OPTIONS} />}
        {view === 'form' && <RecordForm onSave={handleSave} onCancel={handleBack} initialData={editRecord} statusOptions={STATUS_OPTIONS} />}
        {view === 'detail' && selectedRecord && <RecordDetail record={selectedRecord} onEdit={handleEdit} onDelete={handleDelete} onShare={setShareRecord} onBack={handleBack} statusOptions={STATUS_OPTIONS} />}
      </main>
      {shareRecord && <ShareModal record={shareRecord} onClose={() => setShareRecord(null)} statusOptions={STATUS_OPTIONS} />}
    </div>
  )
}
