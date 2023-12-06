import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Phone from './Phone';
import Footer from './Footer';
import Videogames from "./Videogames";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Main() {
    const [phone, setphone] = useState(false);
    const [game, setgame] = useState(false);

    return (
        <>
            <main>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">¡Hola, bienvenido!</h1>
                            <p className="lead text-body-secondary">Aqui encontraras diferentes télefonos celulares y videojuegos, puedes escoger el que más sea de tu interes, puedes dar click en los botones para ir al catálogo que deseas visitar.</p>
                            <p>
                                <a href="#" className="btn btn-primary my-2" onClick={() => {
                                    setphone(true);
                                }}><i className="bi bi-phone-fill"></i> Ver télefonos celulares</a>
                                <a href="#" className="btn btn-warning my-2" style={{ marginLeft: "20px" }} onClick={() => {
                                    setgame(true);
                                    setphone(false);
                                }}><i className="bi bi-controller"></i> Ver videojuegos</a>
                            </p>
                        </div>
                    </div>
                </section>
                {
                    !phone ? <Videogames /> : <Phone />
                }
            </main>
            <Footer />
        </>
    )
}

export default Main
