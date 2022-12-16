import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import Loading from "../components/Loading";


const EditStudent = () => {
  const navigate=useNavigate()
  const dispacth=useDispatch()
  const [students, setStudents] = useState(null);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [stdClass, setStdClass] = useState("");
  const [school, setSchool] = useState("");

  const { studentId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3005/students`)
      .then((res) => {
        console.log(res);
        const myStudent = res.data.find((item) => item.id === studentId);
        console.log(myStudent)
        setStudents(res.data);
        setNumber(myStudent.number);
        setName(myStudent.name);
        setSurname(myStudent.surname);
        setStdClass(myStudent.stdClass);
        setSchool(myStudent.school);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studentId]);

  /*
    1.store veri alındığında  yenilemede tekrar anasayfaya giderek veri baştan çekilir burdan HATA oluşur... daha önce sıkıntı yaşadın DİKKAt!!
    2. path üzerinden id üzerinden server giderek sayfa yenilensede  HATA olmaz
    */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!number || !name || !surname || !stdClass || !school) {
      return alert("Bütün alanları doldurunuz...!!!");
    }
    const myStudent = students.find(item => item.id === studentId);
    const filitreliStudents = students.filter(
      item => item.number !== myStudent.number
    );
    const hasStudent = filitreliStudents.find(item => item.number === number);
    console.log(hasStudent)
    if (hasStudent ) {
       alert(`Girdiğiniz numara ${hasStudent.name} isimli öğrenciye aittir.`)  ;
       return ;
       }
       const updateStudent={
        ...myStudent,
        number:number,
        name:name,
        surname:surname,
        stdClass:stdClass,
        school:school
       }
       console.log(updateStudent)
       axios.put(`http://localhost:3005/students/${studentId}`,updateStudent)
       .then(res=>{
        dispacth({type:"UPDATE_STUDENT",payload:updateStudent})
        navigate("/")
       })
       .catch(err=>{console.log(err)})

  };


  if (!students) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div>
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
            <label htmlFor="number" className="form-label">
              Öğrenci Adı
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value.toUpperCase())}
              type="text"
              className="form-control"
              id="number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Öğrenci Soyadı
            </label>
            <input
              value={surname}
              onChange={(event) => setSurname(event.target.value.toUpperCase())}
              type="text"
              className="form-control"
              id="number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Sınıfı
            </label>
            <input
              value={stdClass}
              onChange={(event) => setStdClass(event.target.value.toUpperCase())}
              type="text"
              className="form-control"
              id="number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Okulu
            </label>
            <input
              value={school}
              onChange={(event) => setSchool(event.target.value.toUpperCase())}
              type="text"
              className="form-control"
              id="number"
            />
          </div>
          <div
            className="container my-3 d-flex justify-content-center btn btn-outline-success w-50"
            style={{ borderRadius: "30px" }}
          >
            <button type="submit" style={{ borderRadius: "15px" }}>
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
