import React, { useEffect, useState } from "react";

function HatForm() {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        styleName:"",
        fabric:"",
        color:"",
        pictureUrl: "",
        location:""
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {};

        data.style_name = styleName;
        data.fabric = fabric;
        data.color = color;
        data.picture_url = pictureUrl;
        data.location = location;

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(hatUrl, fetchConfig);

        if (response.ok) {
            const newHat = await response.json();

            setStyleName('');
            setFabric('');
            setColor('');
            setPictureUrl('');
            setLocation('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create A New Hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input value={styleName} onChange={handleInputChange} placeholder="Style Name" required type="text" id="style_name" className="form-control" name="style_name" />
                            <label htmlFor="style_name">Style Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={fabric} onChange={handleInputChange} placeholder="Fabric" required type="text" id="fabric" className="form-control" name="fabric" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleInputChange} placeholder="Color" required type="text" id="color" className="form-control" name="color" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={pictureUrl} onChange={handleInputChange} placeholder="Picture URL" required type="text" id="picture_url" className="form-control" name="picture_url" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select value={location} onChange={handleInputChange} required id="location" className="form-select" name="location">
                                <option>Choose a Location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.href} value={location.href}>
                                            {location.closet_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HatForm;
