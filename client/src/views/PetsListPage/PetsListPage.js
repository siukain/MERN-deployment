import './petsList.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

function PetsListPage() {
    const [pets, setPets] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function getPets() {
        const allPets = await axios.get('http://localhost:3000/pets');
        setPets(allPets.data);
        setLoading(false);
    }

    useEffect(() => {
        getPets();
    }, []);

    return (
        <div id="petsList">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/create">add a pet to the shelter</Link>
            </div>

            <h3>These pets are looking for a good home</h3>

            {
                isLoading ? 'Cargando...' : pets.length === 0 ? 'There is not pets for now' :
                    <table className="customTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pets.map((pet, i) => {
                                    return <tr className={i%2 === 0 ? '' : 'grey'}>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td>
                                            <Link to={`/details/${pet._id}`}>details</Link>
                                            &nbsp; | &nbsp;
                                            <Link to={`/create/${pet._id}`}>edit</Link>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default PetsListPage;
