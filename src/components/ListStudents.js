import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function ListStudents() {

  
    const dispacth=useDispatch()
  const { studentsState } = useSelector((state) => state);
  console.log(studentsState);
  const handleDelete=(id)=>{
   axios.delete(`http://localhost:3005/students/${id}`)
   .then((res) => {
    dispacth({ type: "DELETE_STUDENT", payload:id });
    
  })
  .catch((err) => {})
  }
  

  

  return (
    <div>
      <div className="container d-flex justify-content-end my-3 ">
     
        <Link to={"/add-student"} className="btn btn-primary">
          Öğrenci Ekle{" "}
        </Link>
      </div>
      <table className="container my-5 table ">
        <thead>
          <tr className="table-danger">
            <th>Öğrenci no</th>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Sınıfı</th>
            <th>Okulu</th>
            <th>işlemler</th>
            
          </tr>
          
        </thead>
        <tbody>
          {studentsState.students.map((student) => (
            <tr key={student.id} className="table-warning">
              <th scope="row">{student.number}</th>
              <td>{student.name}</td>
              <td>{student.surname}</td>
              <td>{student.stdClass}</td>
              <td>{student.school} </td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button onClick={()=>handleDelete(student.id)} type="button" className="btn btn-sm btn-outline-danger mx-1">
                    Sil
                  </button>
                  <Link to={`/edit-student/${student.id}`}
                    
                    className="btn btn-sm btn-outline-success"
                  >
                    Düzenle
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListStudents;
