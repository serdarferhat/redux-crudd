import React from "react";
import {useSelector} from "react-redux"
import { Link } from "react-router-dom";

const Header = () => {
  const studentsState=useSelector(state=>state.studentsState)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand" >
          Sistemde kayıtlı öğrenci sayısı:  {studentsState.students.length}          </span>
          <Link 
            className="nav-link btn btn-outline-warning "
            to="/"
             style={{color:"white"}}
          >
            Öğrenci Listesi
          </Link>
        </div>
        
      </nav>
    </div>
  );
};

export default Header;
