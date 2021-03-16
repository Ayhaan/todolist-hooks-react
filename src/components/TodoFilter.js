import React from 'react'

const Filtre = ({fait, afaire, tout,vider}) =>{
    return(
        <div className="d-flex justify-content-center mt-4 ">
            <button onClick={fait} className="btn btn-primary m-2 pr-4 pl-4">Do</button>
            <button onClick={afaire} className="btn btn-primary  m-2 pr-4 pl-4" >ToDo</button>
            <button onClick={tout} className="btn btn-primary m-2 pr-4 pl-4">All </button>
        </div>
    )
}

export default Filtre