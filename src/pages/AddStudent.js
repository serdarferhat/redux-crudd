import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { studentsState } = useSelector((state) => state);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [school, setSchool] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // validation doğrulama
    if (!number || !name || !surname || !stdClass || !school) {
      return alert("Bütün alanları doldurunuz...!!!");
    }
    const hasStudent = studentsState.students.find(
      (student) => student.number === number
    );
    console.log(hasStudent);
    // !hasStudent olabilir
    if (hasStudent !== undefined) {
      alert(`Girdiğiniz numara ${hasStudent.name} isimli öğrenciye aittir.`);
      return;
    }
    const newStudent = {
      id: String(new Date().getTime()),
      name: name,
      surname: surname,
      number: number,
      stdClass: stdClass,
      school: school,
    };
    axios
      .post("http://localhost:3005/students", newStudent)
      .then((res) => {
        dispacth({ type: "ADD_STUDENT", payload: newStudent });
        setNumber("");
        setName("");
        setSurname("");
        setStdClass("");
        setSchool("");
        navigate("/");
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="container my-3 w-50">
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Öğrenci Numarası
          </label>
          <input
            value={number}
            onChange={(event) => setNumber(event.target.value.toUpperCase())}
            type="text"
            className="form-control"
            id="number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Adı
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value.toUpperCase())}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">
            Soyadı
          </label>
          <input
            value={surname}
            onChange={(event) => setSurname(event.target.value.toUpperCase())}
            type="text"
            className="form-control"
            id="surname"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stdClass" className="form-label">
            Sınıfı
          </label>
          <input
            value={stdClass}
            onChange={(event) => setStdClass(event.target.value.toUpperCase())}
            type="text"
            className="form-control"
            id="stdClass"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="school" className="form-label">
            Okulu
          </label>
          <input
            value={school}
            onChange={(event) => setSchool(event.target.value.toUpperCase())}
            type="text"
            className="form-control"
            id="school"
          />
        </div>
        <div
          className="container my-3 d-flex justify-content-center btn btn-outline-primary w-50"
          style={{ borderRadius: "30px" }}
        >
          <button type="submit" style={{ borderRadius: "15px" }}>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
