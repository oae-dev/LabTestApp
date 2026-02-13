import { Outlet } from 'react-router-dom'
import './mainLayout.css'
import { useState } from 'react'
import Overlay from '../common/overlay'
import { loadPatients, savePatients } from '../services/localStorage/patientInfo'
import NavBar from './NavBar'
import type { LabPatientDetails } from '../features/patients/patient.type'
import type { PatientTestsMap } from '../features/tests/tests.type'
import AddPatientForm from '../features/patients/components/AddPatientForm'


export default function MainLayout() {
  const [overLayVisible, setOverlayVisible] = useState<boolean>(false)
  const [patients, setPatients] = useState<LabPatientDetails[]>(() => loadPatients());
  const [patientTests, setPatientTests] = useState<PatientTestsMap>({});


  return (
    <>
      <header className='main-layout-header screen-only'>
        <NavBar patients={patients} onPlusTapped={() => setOverlayVisible(true)}/>
      </header>


      <Overlay isOpen={overLayVisible} onClose={() => setOverlayVisible(false)} >
        <AddPatientForm onSubmit={(data) => {
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
