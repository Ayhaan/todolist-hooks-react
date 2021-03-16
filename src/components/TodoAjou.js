import React from 'react'

const Ajouter = ({ list, change, ajou, enter}) => {
    return (
        <div className="d-flex justify-content-center">
            <input onKeyPress={enter} type="text"  className="form-control w-50" onChange={change} value={list} placeholder=" Votre tâche?" />
            <div className="input-group-append">
                <button onClick={ajou} className="btn btn-outline-primary ml-2 pr-5 pl-5 " type="button"><i className="fas fa-plus "></i>  Add</button>
            </div>

        </div>
    )
}

export default Ajouter