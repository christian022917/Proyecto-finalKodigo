import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import url from "./DataGames";

function Phone() {

    const [data, setdata] = useState();
    const [showForm, setShowForm] = useState(false);
    const [editgame, seteditgame] = useState(null);

    const [newGame, setNewGame] = useState({
        titulo: "",
        descripcion: "",
        plataforma: "",
        precio: 0,
        categoria: ""
    });

    const clearForm = () => {
        setNewGame({
            titulo: "",
            descripcion: "",
            plataforma: "",
            precio: 0,
            categoria: ""
        });
    };

    const fetchAPI = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const responseJSON = await response.json();
                setdata(responseJSON);
            } else {
                alert("Error, hay un problema con la API");
            }
        } catch (error) {
            alert("Error, hay un problema con la API");
        }
    }

    const handleEditClick = (data) => {
        seteditgame(data);
        setNewGame(data);
        setShowForm(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGame)
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                alert("¡Registro guardado exitosamente!");
                clearForm();
                fetchAPI();
                setShowForm(false);
            } else {
                console.error("Error al agregar el videojuego");
            }
        } catch (error) {
            console.error("Error al agregar el videojuego", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/${editgame.juegoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGame)
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                fetchAPI();
                setShowForm(false);
                // Limpia los campos del formulario
                clearForm();
                seteditgame(null);
            } else {
                console.error("Error al editar el videojuego");
            }
        } catch (error) {
            console.error("Error al editar el videojuego", error);
        }
    };

    const handleDelete = async (juegoId) => {
        try {
            const response = await fetch(`${url}?id=${juegoId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                fetchAPI();
            } else {
                console.error("Error al eliminar el videojuego");
            }
        } catch (error) {
            console.error("Error al eliminar el videojuego", error);
        }
    };


    const cancelEdit = () => {
        seteditgame(null);
        setShowForm(false);
        clearForm();
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginBottom: "20px" }}
                        onClick={() => {
                            seteditgame(null);
                            setShowForm(true);
                        }}
                    ><i className="bi bi-plus-circle-fill"></i> Agregar un nuevo videojuego</button>

                    {showForm && (
                        <form onSubmit={editgame ? handleEditSubmit : handleSubmit} style={{ marginBottom: "30px" }}>
                            <p><i className="bi bi-exclamation-octagon-fill"></i> Por favor, complete los campos que se estan solicitando</p>
                            <div className="mb-3">
                                <label for="titulo" className="form-label"><i className="bi bi-controller"></i> Título del videojuego</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titulo"
                                    value={newGame.titulo}
                                    onChange={(e) => setNewGame({ ...newGame, titulo: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="descripcion" className="form-label"><i className="bi bi-question-diamond"></i> Descripción del videojuego</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    value={newGame.descripcion}
                                    onChange={(e) => setNewGame({ ...newGame, descripcion: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="plataforma" className="form-label"><i className="bi bi-display"></i> Plataforma</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="plataforma"
                                    value={newGame.color}
                                    onChange={(e) => setNewGame({ ...newGame, plataforma: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="precio" className="form-label"><i className="bi bi-tags"></i> Precio del videojuego</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precio"
                                    value={newGame.precio}
                                    onChange={(e) => setNewGame({ ...newGame, precio: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="categoria" className="form-label"><i className="bi bi-joystick"></i> Categoria del videojuego</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoria"
                                    value={newGame.categoria}
                                    onChange={(e) => setNewGame({ ...newGame, categoria: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-success" type="submit" style={{ marginRight: "10px" }}><i className="bi bi-bookmark-check"></i> {editgame ? "Guardar cambios" : "Aceptar"}</button>
                                <button className="btn btn-danger" type="button" onClick={() => cancelEdit()}><i className="bi bi-x-circle"></i> Cancelar {editgame ? "edición" : ""}</button>
                            </div>
                        </form>
                    )}

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {!data ? "Cargando datos..." :
                            data.map((data, index) => {
                                return <div className="col">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <ul>
                                                <p className="card-text">Especificaciones del videojuego:</p>
                                                <li>Titulo: {data.titulo}</li>
                                                <li>Descripción: {data.descripcion}</li>
                                                <li>Plataforma: {data.plataforma}</li>
                                                <li>Precio: ${data.precio}</li>
                                                <li>Categoria: {data.categoria}</li>
                                            </ul>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-sm btn-outline-success" onClick={() => {
                                                        handleEditClick(data)
                                                    }}><i className="bi bi-pencil-square"></i> Editar</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(data.juegoId)}
                                                    >
                                                        <i className="bi bi-trash"></i> Eliminar
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Phone
