import React, { useEffect, useState } from 'react';

function NewShoeForm() {
    const [bins, setBins] = useState([])

    const fetchData = async () => {
        const url = "http://localhost:8100/api/bins";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [name, setName] = useState('');
    function handleName(event) {
        const value = event.target.value;
        setName(value);
    }

    const [brand, setBrand] = useState('');
    const handleBrand = async (event) => {
        const value = event.target.value;
        setBrand(value);
    }

    const [color, setColor] = useState('');
    const handleColor = async (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [size, setSize] = useState('');
    const handleSize = async (event) => {
        const value = event.target.value;
        setSize(value);
    }

    const [details, setDetails] = useState('');
    const handleDetails = async (event) => {
        const value = event.target.value;
        setDetails(value);
    }

    const [reviews, setReviews] = useState('');
    const handleReviews = async (event) => {
        const value = event.target.value;
        setReviews(value);
    }

    const [catagory, setCatagory] = useState('');
    const handleCatagory = async (event) => {
        const value = event.target.value;
        setCatagory(value);
    }

    const [picture_url, setPictureUrl] = useState('');
    const handlePictureUrl = async (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [bin, setBin] = useState('');
    const handleBin = async (event) => {
        const value = event.target.value;
        setBin(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            name: name,
            brand: brand,
            color: color,
            size: size,
            details: details,
            reviews: reviews,
            catagory: catagory,
            picture_url: picture_url,
            bin: bin,
        }
        console.log(data)


        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            }
        };
        console.log(fetchConfig)

        const response = await fetch(shoeUrl, fetchConfig);

        console.log(response)

        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);

            setName("")
            setBrand("")
            setColor("")
            setSize("")
            setDetails("")
            setReviews("")
            setCatagory("")
            setPictureUrl("")
            setBin("")
        }
    }

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a New Shoe</h1>
                        <form onSubmit={handleSubmit} id="crate-shoe-form">
                            <div className="form-floating mb-3">
                                <input value={name} onChange={handleName} placeholder="Name" required type="text"name="name" id="name"className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={brand} onChange={handleBrand} placeholder="Brand" required type="text" name="brand" id="brand" className="form-control" />
                                <label htmlFor="brand">Brand</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={color} onChange={handleColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="Color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={size} onChange={handleSize} placeholder="Size" required type="text" name="size" id="size" className="form-control" />
                                <label htmlFor="size">Size</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={details} onChange={handleDetails} placeholder="Details" required type="text" name="details" id="details" className="form-control" />
                                <label htmlFor="details">Details</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={reviews} onChange={handleReviews} placeholder="Reviews" required type="text" name="reviews" id="reviews" className="form-control" />
                                <label htmlFor="reviews">Reviews</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={catagory} onChange={handleCatagory} placeholder="Catagory" required type="text" name="catagory" id="catagory" className="form-control" />
                                <label htmlFor="catagory">Catagory</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={picture_url}  onChange={handlePictureUrl} placeholder="url" required type="text" name="url" id="url" className="form-control"/>
                                <label htmlFor="url">url</label>
                            </div>
                            <div className="mb-3">
                                <select value={bin} onChange={handleBin} required name="bin" id="bin" className="form-select">
                                    <option>Choose a Bin</option>
                                    {bins.map((bin) => {
                                        return (
                                            <option key={bin.href} value={bin.href}>
                                                {bin.closet_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewShoeForm;
