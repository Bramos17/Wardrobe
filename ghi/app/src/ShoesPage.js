import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


function ShoeColumn(props) {

        const handleDeleteShoe = async (id) => {
            const shoeUrl = `http://localhost:8080/api/shoes/${id}`;
            const response = await fetch(shoeUrl, { method: "DELETE" });
            if (response.ok) {
            }
        };

        return (
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        {props.shoes.map((shoeData) => {
                            const shoe = shoeData.shoe;
                            return (
                                <div key={shoe.id} className="card mb-3 shadow" style={{ width: "18rem" }}>
                                    <img src={shoe.picture_url} className="card-img-top" alt={shoe.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{shoe.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{shoe.brand}</h6>
                                        <p className="card-text">{shoe.details}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{shoe.color}</li>
                                        <li className="list-group-item">{shoe.size}</li>
                                        <li className="list-group-item">{shoe.category}</li>
                                        <li className="list-group-item">{shoe.review}</li>
                                    </ul>
                                    <div className="card-footer">
                                        <button className="btn btn-danger" onClick={() => handleDeleteShoe(shoe.id)}>Delete</button>
                                        <button className="btn btn-primary" onClick={() => navigator.push('/shoes/new')}>Create</button>
                                        <NavLink href={'/shoes/new'} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Create Shoe</NavLink>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }


const ShoesPage = (props) => {
        const [shoeColumns, setShoeColumns] = useState([[], [], []]);

        const fetchData = async () => {
            const url = 'http://localhost:8080/api/shoes/';

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();

                    const requests = [];
                    for (let shoe of data.shoes) {
                        const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}`;
                        requests.push(fetch(detailUrl));
                    }

                    const responses = await Promise.all(requests);

                    const columns = [[], [], []];

                    let i = 0;
                    for (const shoeResponse of responses) {
                        if (shoeResponse.ok) {
                            const details = await shoeResponse.json();
                            columns[i].push(details);
                            i = (i + 1) % 3;
                        }
                    }

                    setShoeColumns(columns);
                }
            } catch (error) {
                console.error(error);
            }
        };

        useEffect(() => {
            fetchData();
        }, []);

        return (
            <>
                <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Shoes!</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">"Create your own virtual shoe collection featuring the most popular and your personal favorite footwear."</p>
                    </div>
                </div>
                <div className="container">
                    <h2>Your Shoes!</h2>
                    <div className="row">
                        {shoeColumns.map((shoes, index) => (
                            <ShoeColumn key={`shoe-column-${index}`} shoes={shoes} />
                        ))}
                    </div>
                </div>
            </>
        );
};


export default ShoesPage;
