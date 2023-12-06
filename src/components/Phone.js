import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import url from "./Data";

function Phone() {

    const [data, setdata] = useState();
    const [showForm, setShowForm] = useState(false);
    const [editphone, seteditphone] = useState(null);

    const [newPhone, setNewPhone] = useState({
        marca: "",
        modelo: "",
        color: "",
        precio: 0,
        descripcion: "",
        operadora: ""
    });

    const clearForm = () => {
        setNewPhone({
            marca: "",
            modelo: "",
            color: "",
            precio: 0,
            descripcion: "",
            operadora: ""
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
        seteditphone(data);
        setNewPhone(data);
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
                body: JSON.stringify(newPhone)
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                alert("¡Registro guardado exitosamente!");
                clearForm();
                fetchAPI();
                setShowForm(false);
            } else {
                console.error("Error al agregar el teléfono");
            }
        } catch (error) {
            console.error("Error al agregar el teléfono", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/${editphone.celularId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPhone)
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                fetchAPI();
                setShowForm(false);
                // Limpia los campos del formulario
                clearForm();
                seteditphone(null);
            } else {
                console.error("Error al editar el teléfono");
            }
        } catch (error) {
            console.error("Error al editar el teléfono", error);
        }
    };

    const handleDelete = async (celularId) => {
        try {
            const response = await fetch(`${url}?id=${celularId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Si la solicitud fue exitosa, actualiza los datos
                fetchAPI();
            } else {
                console.error("Error al eliminar el teléfono");
            }
        } catch (error) {
            console.error("Error al eliminar el teléfono", error);
        }
    };


    const cancelEdit = () => {
        seteditphone(null);
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
                            seteditphone(null);
                            setShowForm(true);
                        }}
                    ><i className="bi bi-plus-circle-fill"></i> Agregar un nuevo télefono</button>

                    {showForm && (
                        <form onSubmit={editphone ? handleEditSubmit : handleSubmit} style={{ marginBottom: "30px" }}>
                            <p><i className="bi bi-exclamation-octagon-fill"></i> Por favor, complete los campos que se estan solicitando</p>
                            <div className="mb-3">
                                <label for="marca" className="form-label"><i className="bi bi-phone"></i> Marca del télefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="marca"
                                    value={newPhone.marca}
                                    onChange={(e) => setNewPhone({ ...newPhone, marca: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="modelo" className="form-label"><i className="bi bi-question-diamond"></i> Model del télefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="modelo"
                                    value={newPhone.modelo}
                                    onChange={(e) => setNewPhone({ ...newPhone, modelo: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="color" className="form-label"><i className="bi bi-palette"></i> Color del télefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    value={newPhone.color}
                                    onChange={(e) => setNewPhone({ ...newPhone, color: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="precio" className="form-label"><i className="bi bi-tags"></i> Precio del télefono</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="precio"
                                    value={newPhone.precio}
                                    onChange={(e) => setNewPhone({ ...newPhone, precio: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="descripcion" className="form-label"><i className="bi bi-window-dock"></i> Descripción del télefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    value={newPhone.descripcion}
                                    onChange={(e) => setNewPhone({ ...newPhone, descripcion: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="operadora" className="form-label"><i className="bi bi-sim"></i> Operadora del télefono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="operadora"
                                    value={newPhone.operadora}
                                    onChange={(e) => setNewPhone({ ...newPhone, operadora: e.target.value })}
                                    required
                                ></input>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-success" type="submit" style={{ marginRight: "10px" }}><i className="bi bi-bookmark-check"></i> {editphone ? "Guardar cambios" : "Aceptar"}</button>
                                <button className="btn btn-danger" type="button" onClick={() => cancelEdit()}><i className="bi bi-x-circle"></i> Cancelar {editphone ? "edición" : ""}</button>
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
                                                <p className="card-text">Especificaciones del télefono:</p>
                                                <li>Marca: {data.marca}</li>
                                                <li>Modelo: {data.modelo}</li>
                                                <li>Color: {data.color}</li>
                                                <li>Precio: ${data.precio}</li>
                                                <li>Descripcion: {data.descripcion}</li>
                                                <li>Operadora: {data.operadora}</li>
                                            </ul>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-sm btn-outline-success" onClick={() => {
                                                        handleEditClick(data)
                                                    }}><i className="bi bi-pencil-square"></i> Editar</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(data.celularId)}
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
