import { loadPatients } from '../types/pacient';
import { useParams } from 'react-router-dom';

export default function TestDetails() {
  const { pacientId } = useParams<{ pacientId: string }>();
  const patients = loadPatients();
  const patient = patients.find((p) => p.id === pacientId);
  if (!patient) {
    return <div>Patient not found</div>;
  }
  return (
   <div>
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
      <p>Phone: {patient.phone}</p>
      <p>Email: {patient.email}</p>
      <p>Address: {patient.address}</p>
    </div>
  )
}
