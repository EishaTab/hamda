"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Page10() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', city: '' })

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
  useEffect(() => {
    fetchStudents()
  }, []);
  return (
    <div>
      <h1>Students List</h1>
      {(students || []).map((s) => (
        <p key={s.id}>
          {s.name} - {s.city}
        </p>
      ))}
      <form onSubmit={onFormSubmit}>
        <input value={form.name} placeholder="Name" onChange={(e) => { setForm({ ...form, name: e.target.value }) }} />
        <input value={form.city} placeholder="City" onChange={(e) => { setForm({ ...form, city: e.target.value }) }} />
        <button>Submit</button>
      </form>
    </div>
  );
}