import { useParams } from "react-router-dom";

function Details() {
    const { type, id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Details</h1>
            <p>Type: {type}</p>
            <p>ID: {id}</p>
        </div>
    );
}

export default Details;