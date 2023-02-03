import './petsDetail.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useParams, useNavigate} from "react-router-dom";

function PetsDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState([]);
    let [likes, setLikes] = useState(0);
    const [isLikeSend, setLikeSend] = useState(false);
    const [isLoading, setLoading] = useState(true);

    async function getPets() {
        const petResponse = await axios.get(`http://localhost:3000/pets/${id}`);
        setPet(petResponse.data);
        setLikes(petResponse.data.likes);
        setLoading(false);
    }

    async function updateLikes() {
        const petResponse = await axios.patch(`http://localhost:3000/pets/likes/${id}`, {});
        if(petResponse.status === 200) {
            setLikes(petResponse.data.likes);
            setLikeSend(true);
        }
    }

    async function adoptPet() {
        const petResponse = await axios.delete(`http://localhost:3000/pets/${id}`);
        if(petResponse.status === 200) {
            navigate('/');
        }
    }

    useEffect(() => {
        getPets();
    }, []);

    return (
        <div id="petDetail">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>

            {
                isLoading ? 'Cargando...' :
                <>
                    <div className="header">
                        <h3>Details about: {pet.name}</h3>
                        <button onClick={adoptPet}>Adopt {pet.name}</button>
                    </div>
                    <div className="container-info">
                        <div className="row">
                            <div className="col-title">Pet type:</div>
                            <div className="col">{pet.type}</div>
                        </div>
                        <div className="row">
                            <div className="col-title">Description:</div>
                            <div className="col">{pet.description}</div>
                        </div>
                        <div className="row">
                            <div className="col-title">Skills:</div>
                            <div className="col">
                                <ul>
                                    {pet.skillOne && <li>{pet.skillOne}</li>}
                                    {pet.skillTwo && <li>{pet.skillTwo}</li>}
                                    {pet.skillThree && <li>{pet.skillThree}</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="likes-container">
                            <button disabled={isLikeSend} onClick={updateLikes}>Like {pet.name}</button>
                            <span>{likes} like(s)</span>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default PetsDetailPage;
