import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function HatListColumn(props) {
    return (
        <div className="col">
            {props.list.map(data => {
                return (
                    <div key={data.href} className="card mb-3 shadow">
                        <img src={data.picture_url} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title text-center">{data.style_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted text-center">
                                Location-Closet Name: {data.location.closet_name}
                            </h6>
                        </div>
                        <div className="card-text text-center">
                            <p>Fabric: {data.fabric}</p>
                            <p>Color: {data.color}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const HatList = (props) => {
    const [hatColumns, setHatColumns] = useState([[], [], [], []]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/hats/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let hat of data.hats) {
                    const detailUrl = `http://localhost:8090${hat.href}`;
                    requests.push(fetch(detailUrl));
                }

                const responses =  await Promise.all(requests);

                const columns = [[], [], [], []];

                let i = 0;
                for (const hatResponse of responses) {
                    if (hatResponse.ok) {
                        const details = await hatResponse.json();
                        columns[i].push(details);
                        i = i + 1;
                        if (i > 3) {
                            i = 0;
                        }
                    } else {
                        console.error(hatResponse);
                    }
                }

                setHatColumns(columns);


            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center">
                <h1 className="display-5 fw-bold">Wardrobify with Hats</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to='/hats/new' className="btn btn-primary btn-lg px-4 gap-3">Create New Hat</Link>
                </div>
            </div>
            <div className="container">
                <h2>Hats List</h2>
                <div className="row">
                    {hatColumns.map((hatList, index) => {
                        return (
                            <HatListColumn key={index} list={hatList} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default HatList;
