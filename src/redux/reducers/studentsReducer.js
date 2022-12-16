/* 1-initialState
  2-reducer fonksiyonu oluştur
  */
const initialState = {
  start: false,
  success: false,
  students: [],
  fail: false,
  error: "",
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_START":
      return {
        ...state,
        start: true,
      };
    case "FETCH_STUDENTS_SUCCESS":
      return {
        ...state,
        fail:false,
        start: false,
        success: true,
        students: action.payload,
      };
    case "FETCH_STUDENTS_FAIL":
      return {
        ...state,
        start: false,
        fail: true,
        error: action.payload,
      };
      case"ADD_STUDENT":
      return{
        ...state,
        students:[...state.students,action.payload]
      }
      case"DELETE_STUDENT":
    
        const filitreliStudents=state.students.filter(item=>item.id!==action.payload)
      return{
        ...state,
        students:filitreliStudents
      }
      case"UPDATE_STUDENT":
      let tempStudents=[]
      for(let i=0;i<state.students.length; i++){
       if(state.students[i].id!==action.payload.id)
        tempStudents.push(state.students[i])
        else{
          tempStudents.push(action.payload)
        }
         
      }
      
      

      return{
        ...state,
        students:tempStudents
      }

    default:
      return state;
  }
};
export default studentsReducer;
