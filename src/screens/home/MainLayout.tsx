import { Outlet } from 'react-router-dom'
import '../../css/mainLayout.css'
import { useState } from 'react'
import Overlay from '../../common/overlay'
import LabPatientForm from './components/PaisentDetailForm'
import { type LabPatientDetails } from './types/patient'
import type { PatientTestsMap } from './types/test'
import { loadPatients, savePatients } from '../../localStorage/patientInfo'
import NavBar from '../../navbar/NavBar'


export default function MainLayout() {
  const [overLayVisible, setOverlayVisible] = useState<boolean>(false)
  const [patients, setPatients] = useState<LabPatientDetails[]>(() => loadPatients());
  const [patientTests, setPatientTests] = useState<PatientTestsMap>({});


  return (
    <>
      <header className='main-layout-header'>
        <NavBar patients={patients} onPlusTapped={() => setOverlayVisible(true)}/>
      </header>


      <Overlay isOpen={overLayVisible} onClose={() => setOverlayVisible(false)} >
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

        <main className='main-layout-wrapper'>
          <Outlet
            context={{
              patientTests,
              setPatientTests,
            }}
          />
        </main>

    </>
  )
}
