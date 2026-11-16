"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Page10() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', city: '' })
  const [editStudent, setEditStudent] = useState(null)
  const fetchStudents = () => {
    axios.get("/api/practice").then((res) => {
      if (res.data?.success) {
        setStudents(res.data?.allStudents)
      }
    });
  }
  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(form)

    axios.post("/api/practice", form).then((res) => {
      console.log("allStudents", res.data?.allStudents)
      setStudents(res.data?.allStudents)

    });
  }
  const deleteStudent = (id) => {
    axios.delete(`/api/practice?id=${id}`).then((res) => {
      if (res.data?.success) {
        setStudents(res.data.allStudents);
        fetchStudents();
      }
    });
  };
  const submitEditForm = (e) => {
    e.preventDefault()
    axios.put("/api/practice", editStudent).then((res) => {
      console.log("allStudents", res.data?.allStudents)
      setStudents(res.data?.allStudents)
      setEditStudent(null)
    });
  }
  console.log(editStudent)
  useEffect(() => {
    fetchStudents()
  }, []);
  return (
    <div>
      <h1>Students List</h1>
      {(students || []).map((s) => (
        <div key={s.id} className="flex">
          <p >
            {s.name} - {s.city}
          </p>
          <button className="bg-blue-500" onClick={() => deleteStudent(s.id)}>Delete Student</button>
          <button className="bg-yellow-500" onClick={() => setEditStudent(s)}>Edit Student</button>

        </div>

      ))}
      <form onSubmit={onFormSubmit}>
        <input value={form.name} placeholder="Name" onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
        <input value={form.city} placeholder="City" onChange={(e) => { setForm({ ...form, city: e.target.value }) }} />
        <button>Submit</button>
      </form>
      {/* Edit student form */}
      {
        editStudent && (
          <form onSubmit={submitEditForm}>
            <h2>Edit student form</h2>
            <input value={editStudent.name} placeholder="Name" onChange={(e) => { setEditStudent({ ...editStudent, name: e.target.value }) }} />
            <input value={editStudent.city} placeholder="City" onChange={(e) => { setEditStudent({ ...editStudent, city: e.target.value }) }} />
            <button>Submit</button>
          </form>

        )
      }
    </div>
  );
}