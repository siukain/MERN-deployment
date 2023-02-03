import './petsCreate.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";

function PetsCreatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState({});
    const [error, setError] = useState(null);
    const [pet, setPet] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function createUpdate() {
        const isCreating = !id;
        let response = null;
        setError(null);
        if(!name || !type || !description) setError("Campos vacíos");
        else {
            const body = {
                name: name,
                type: type,
                description: description,
                skillOne: skills.one,
                skillTwo: skills.two,
                skillThree: skills.three,
            };

            if(isCreating) response = await createPet(body);
            else response = await updatePet(body);

            if(response.status === 200 || response.status === 201) {
                navigate('/');
            } else {
                setError(response.response.data.messages.join());
            }
        }
    }

    async function createPet(body) {
        return await axios.post('http://localhost:3000/pets', body).catch((err) => {
            return err;
        });
    }

    async function updatePet(body) {
        return await axios.patch( `http://localhost:3000/pets/${id}`, body).catch((err) => {
            return err;
        });
    }

    async function getPets() {
        const petResponse = await axios.get(`http://localhost:3000/pets/${id}`);
        setPet(petResponse.data);
        setName(petResponse.data.name);
        setType(petResponse.data.type);
        setDescription(petResponse.data.description);
        setSkills({
            one: petResponse.data.skillOne,
            two: petResponse.data.skillTwo,
            three: petResponse.data.skillThree,
        });
        setLoading(false);
    }

    useEffect(() => {
        if(id) getPets();
        else setLoading(false);
    }, []);

    return (
        <div id="petCreate">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>

            {
                isLoading ? 'Cargando...' : <div>
                    <div className="header">
                        {
                            !id ? <h3>Know a pet needing a home?</h3> :
                                <h3>Edit: {pet.name}</h3>
                        }
                    </div>
                    <div className="container-info">
                        <div className="left">
                            <div className="row">
                                <label>Name:</label>
                                <input defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="row">
                                <label>Type:</label>
                                <input defaultValue={type} onChange={(e) => setType(e.target.value)} />
                            </div>

                            <div className="row">
                                <label>Description:</label>
                                <input defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="row">
                                <p>{error}</p>
                                <button onClick={createUpdate}>
                                    {!id ? 'Add Pet' : 'Edit Pet'}
                                </button>
                            </div>
                        </div>
                        <div className="right">
                            <div className="row">
                                <label>Skill 1:</label>
                                <input defaultValue={skills.one} onChange={(e) => setSkills({one: e.target.value})} />
                            </div>

                            <div className="row">
                                <label>Skill 2:</label>
                                <input defaultValue={skills.two} onChange={(e) => setType({two: e.target.value})} />
                            </div>

                            <div className="row">
                                <label>Skill 3:</label>
                                <input defaultValue={skills.three} onChange={(e) => setDescription({three: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PetsCreatePage;
