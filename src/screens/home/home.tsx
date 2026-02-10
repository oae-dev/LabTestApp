import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation();
  const patient = location.state

  if (!patient) {
    return <div>No patient data available</div>;
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
