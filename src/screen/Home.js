import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import MyCard from '../component/MyCard'
import Footer from '../component/Footer'



function Home() {
    const [search, setSearch] = useState('')
    const [foodCat, setfoodCat] = useState([])
    const [foodItem, setfoodItem] = useState([])

    // async-await ka use isliye krenge kyunki fetch asynchronous operaton hota hai..
    const LoadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }

            });

            const responseData = await response.json();

            setfoodItem(responseData[0])
            setfoodCat(responseData[1])

            // console.log(responseData[0], responseData[1]);
            // console.log("Hello world")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        LoadData();
    }, [])



    return (
        <>
            <div > <Navbar /> </div>
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-caption d-none d-md-block" style={{ "zIndex": "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </div>

                    </div>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" style={{ "filter": "brightness(30%" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pastry" style={{ "filter": "brightness(30%" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?barbeque" style={{ "filter": "brightness(30%" }} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCat && foodCat.length !== 0 ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {foodItem && foodItem.length !== 0 ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                    .map(filteritems => {
                                        return (
                                            <div key={filteritems._id} className='col-12 col-md-6 col-lg-3'>
                                                <MyCard foodItem={filteritems}
                                                    options={filteritems.options[0]}
                                                    
                                                />
                                            </div>
                                        )
                                    }) : <div>***</div>
                                }
                            </div>
                        )
                    })
                        :
                        <div>"No such data found "</div>
                }
            </div>

            <div className='m-2'>

            </div>
            <div> <Footer /> </div>
        </>
    )
}

export default Home