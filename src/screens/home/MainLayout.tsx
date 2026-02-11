import { Outlet } from 'react-router-dom'
import LabSideBar from './LabSideBar'
import '../../css/mainLayout.css'
import { useState } from 'react'
import Overlay from '../../common/overlay'
import LabPatientForm from './components/PaisentDetailForm'
import { loadPatients, savePatients, type LabPatientDetails } from './types/patient'


export default function MainLayout() {
  const [overLayVisible, setOverlayVisible] = useState<boolean>(false)
  const [patients, setPatients] = useState<LabPatientDetails[]>(() => loadPatients());
  return (
    <>
      {/* <header className='main-layout-header'>
        <NavBar />
      </header> */}
      <Overlay
        isOpen={overLayVisible}
        onClose={() => setOverlayVisible(false)}
      >
        <LabPatientForm onSubmit={(data) => {
    setPatients((prev) => {
      const updated = [
        ...prev,
        { ...data, id: crypto.randomUUID() } 
      ];
      savePatients(updated); 
      return updated;
    });

    setOverlayVisible(false);
  }} onClose={() => setOverlayVisible(false)} />
      </Overlay>
      <div className='main-layout-wrapper'>
        <aside className='sidebar'>
          <LabSideBar patients={patients} onPlusTapped={() => setOverlayVisible(true)} />
        </aside>
        <main style={{ display: 'flex', width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </>
  )
}
