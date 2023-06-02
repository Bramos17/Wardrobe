import React, { useEffect, useState } from 'react';

export default function NewShoeForm() {
    const [bins, setBins] = useState([])
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [details, setDetails] = useState('');
    const [review, setReview] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [bin, setBin] = useState('');

    const handleName = async (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleBrand = async (event) => {
        const value = event.target.value;
        setBrand(value);
    }

    const handleColor = async (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleSize = async (event) => {
        const value = event.target.value;
        setSize(value);
    }

    const handleDetails = async (event) => {
        const value = event.target.value;
        setDetails(value);
    }

    const handleReview = async (event) => {
        const value = event.target.value;
        setReview(value);
    }

    const handleCategory = async (event) => {
        const value = event.target.value;
        setCategory(value);
    }
    const handleUrl = async (event) => {
        const value = event.target.value;
        setUrl(value);
    }

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
            review: review,
            category: category,
            url,
            bin: bin,
        }


        const shoeUrl = "http://localhost:8080/api/shoes/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            }
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe)
            setName("")
            setBrand("")
            setColor("")
            setSize("")
            setDetails("")
            setReview("")
            setCategory("")
            setUrl("")
            setBin([])
            window.location.replace("/shoes")
        }
    }

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

    return (
        <div className="my-5 container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe</h1>
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
                                <input value={review} onChange={handleReview} placeholder="Review" required type="text" name="review" id="review" className="form-control" />
                                <label htmlFor="review">Reviews</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={category} onChange={handleCategory} placeholder="Category" required type="text" name="category" id="category" className="form-control" />
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={url}  onChange={handleUrl} placeholder="url" required type="text" name="url" id="url" className="form-control"/>
                                <label htmlFor="url">url</label>
                            </div>
                            <div className="mb-3">
                                <select value={bin} onChange={handleBin} required name="bin" id="bin" className="form-select">
                                    <option value="">Choose a bin</option>
                                    {bins.map((bin) => {
                                        return (
                                            <option key={bin.id} value={bin.id}>
                                                {bin.closet_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primate">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
