import { Outlet, useNavigate } from 'react-router-dom'
import './mainLayout.css'
import { useState } from 'react'
import Overlay from '../common/overlay'
import { deletePatient, loadPatients, savePatients } from '../services/localStorage/patientInfo'
import NavBar from './NavBar'
import type { LabPatientDetails } from '../features/patients/patient.type'
import type { PatientTestsMap } from '../features/tests/tests.type'
import AddPatientForm from '../features/patients/components/AddPatientForm'


export default function MainLayout() {
  const navigate = useNavigate();
  const [overLayVisible, setOverlayVisible] = useState<boolean>(false)
  const [patients, setPatients] = useState<LabPatientDetails[]>(() => loadPatients());
  const [patientTests, setPatientTests] = useState<PatientTestsMap>({});

  const deleteLabPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);

    if (!patient) return;

    const confirmed = window.confirm(
      `Delete patient "${patient.name}"?\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    deletePatient(patientId);
    setPatients(prev => prev.filter(p => p.id !== patientId));
    navigate('/home', { replace: true });
  };

  return (
    <>
      <header className='main-layout-header screen-only'>
        <NavBar patients={patients} onAddPatient={(() => setOverlayVisible(true))} onDeletePatient={deleteLabPatient} />
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
          navigate(`/home:${patients[patients.length - 1].id}`, { replace: true });
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
