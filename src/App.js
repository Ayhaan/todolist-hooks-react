import React, { useState } from 'react'
import Ajouter from './components/TodoAjou'
import Filtre from './components/TodoFilter'


const TodoList = () => {
    const [list, setList] = useState("")    //Zone input
    const [tableau, setTableau] = useState([])    // Tableau qui va récup toute nos tâches

    // Value input changer
    let onChange = (ev) => {
        ev.preventDefault()
        setList(ev.target.value)
    }

    // Ajouter les elements ecris dans le input dans le tableau
    let ajouter = () => {
        let copieTableau = [...tableau]  //Ceci est une copie du tableau exctament mais pas pourJS   -> notes : en react, on ne travail pas directement sur le state en question, mais sur une copie. Une fois toutes la logique appliquée, on enregistre dans le state (ligne31)
        if (list !== "") {
            copieTableau.push({ // push dans la copie un objet pour chaque TACHE
                texte: list,    // permet de stocker la tache dans la propriété texte
                don: false,     // permet de verifier si la tache est validée
                etat: "block",  // permet de vérifier le style, par défaut il sera en block
                input: false    // permet de vérfier si le mode edit est activé
            })
        } else {
            alert('Veuillez remplir le champ!')
            return null   
        }
        setList('')
        setTableau(copieTableau)

    }
    // fonction ajouter via le 'key.enter'
    let ajouEnter = (e) => {
        let copieTableau = [...tableau]  //Ceci est une copie du tableau pour mieux travailler sur les states
        if (e.key === 'Enter') {
            if (list !== "") {
                copieTableau.push({
                    texte: list,
                    don: false,   
                    etat: "block",
                    input: false  
                })
            } else {
                alert('Veuillez remplir le champ!')
                return null
            }
            setList('')
            setTableau(copieTableau)
        }
    }

    // Fonction qui supprime la tâche
    const listDelete = (i) => {
        let array = [...tableau]
        array.splice(i, 1)
        setTableau(array)
    }
    // Filtre Fonction qui valide ta tâche
    let listValid = (i) => {
        let array = [...tableau]
        array[i].don = !array[i].don   // retourne son boolean inverse à chaque lancement de la fonction
        setTableau(array);
    }
    // Filtre Fonction qui edit la tâche
    let changeedit = (ev, i) => {
        let copieTableau = [...tableau]
        copieTableau[i].texte = ev.target.value
        setTableau(copieTableau)
    }
    //fonction qui save, au moment de l'edit
    let click = (i) => {
        let copieTableau=[...tableau];
        copieTableau[i].input = !copieTableau[i].input // retourne son boolean inverse à chaque lancement de la fonction
        setTableau(copieTableau)        
    }
    //fonction qui save la tache via le 'key.enter'
    let clickEnter =(ev, i) =>{
        let copieTableau = [...tableau]
        if (ev.key === 'Enter') {
            copieTableau[i].input = !copieTableau[i].input
        } else {
            copieTableau[i].texte = ev.target.value     
        }
        setTableau(copieTableau)
    }
    // Les filtres
    let doo = () => {
        let copieTableau = [...tableau]
        copieTableau.forEach(el => {
            if (el.don) {
                el.etat = "block"
            } else {
                el.etat = 'none'
            }
        });
        setTableau(copieTableau)
    }
    let todoo = () => {
        let copieTableau = [...tableau]
        copieTableau.forEach(el => {
            if (el.don) {
                el.etat = "none"
            } else {
                el.etat = 'block'
            }
        });
        setTableau(copieTableau)
    }
    let aall = () => {
        let copieTableau = [...tableau]
        copieTableau.forEach(el => {
            if (el.don) {
                el.etat = "block"
            } else {
                el.etat = 'block'
            }
        });
        setTableau(copieTableau)
    }
    // fonction 'clear'
    let vider = () => {
        setTableau([]) 
    }

    // Faire apparaitre le tableau dans la Todo
    const toDO = () => {
        return tableau.map((el, i) => {
            if (!el.input) {      // if qui verifie si nous sommes en mode edit
                return (
                    <li onDoubleClick={() => click(i)} key={i} style={{ display: el.etat }} className={`${!el.don ? "bg-white p-2 text-secondary p-2 border rounded m-0 p-0'" : "bg-primary p-2 text-white p-2 border rounded m-0 p-0'"}`}>
                        <span >{el.texte}</span>
                        <button onClick={() => listDelete(i)} className="btn btn-danger float-right mr-2 pb-1 "><i className="fas fa-trash-alt "></i></button>
                        <button onClick={() => click(i)} className="btn btn-success float-right mr-2 pb-1"><i className="fas fas fa-save"></i></button>
                        <button onClick={() => listValid(i)} className="btn btn-primary float-right mr-2 pb-1"><i className="fas fa-check-circle"></i></button>
                    </li>
                )
            } else {
                return (
                    <li onDoubleClick={() => click(i)} key={i} style={{ display: el.etat }} className={`${!el.don ? "bg-white p-2 text-secondary p-2 border rounded m-0 p-0'" : "bg-primary p-2 text-white p-2 border rounded m-0 p-0'"}`}>
                        <input value={el.texte} onChange={(ev) => changeedit(ev, i)} onKeyPress={(ev) =>clickEnter(ev, i)} type="text" name="" id="" />
                        <button onClick={() => listDelete(i)} className="btn btn-danger float-right mr-2 pb-1 "><i className="fas fa-trash-alt "></i></button>
                        <button onClick={() => click(i)} className="btn btn-success float-right mr-2 pb-1"><i className="fas fas fa-save"></i></button>
                        <button onClick={() => listValid(i)} className="btn btn-primary float-right mr-2 pb-1"><i className="fas fa-check-circle"></i></button>
                    </li>
                )

            }
        })
    }
    // console.log(tableau);

    //Ceci est le return Final, c'est ce qu'il s'affiche par défaut sur mon écran
    return (
        <div className={"jumbotron"} >
            <Ajouter enter={ajouEnter} list={list} change={onChange} ajou={ajouter} deelete={listDelete} />
            <h5 className="text-primary p-2 border rounded m-0 font-weight-bold text-center mt-3">Ma Todo List</h5>
            <Filtre fait={doo} afaire={todoo} tout={aall} vider={vider} />
            <ul className=" mt-2 p-0">
                {toDO()}       {/* la liste des tâches affichées sous forme de fonction (ligne128)  */}
            </ul>
            <div className="text-center">
                <button onClick={vider} className="btn btn-danger mt-3 w-50 ">Clear List </button>

            </div>
        </div>
    )
}

export default TodoList