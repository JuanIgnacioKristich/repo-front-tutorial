import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';


const ShowUsers = () => {
    const url ="http://localhost:3000/api/users/";
    const [users, setUsers] = useState([])
    const [id, setId] = useState('');
    const [firstname, setFirstname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(url);
        setUsers(response.data);
    }

    const openModal = (op, id, firstname, Email, Password) => {
        setId('');
        setFirstname('');
        setEmail('');
        setPassword ('');
        setOperation(op);
        if (op === 1) {
            setTitle('Registrar Usuario');
        }
        else if (op === 2) {
            setTitle('Editar Usuario');
            setId(id);
            setFirstname(firstname);
            setPassword(Password);
            setEmail(Email);
        }
        window.setTimeout(function () {
            document.getElementById('firstname').focus();
        }, 500);
    }

    const validar = () => {
        var parametros;
        var metodo;
        if (firstname.trim() === '') {
            show_alert('Escribe el firstname del usuario', 'warning');
        }
        else if (Email.trim() === '') {
            show_alert('Escribe el Email del usuario', 'warning');
        }
        else if (Password.trim() === '') {
            show_alert('Escribe el Email del usuario', 'warning');
        }
        else {
            if (operation === 1) {
                parametros = { firstname: firstname.trim(), Email: Email.trim(), Password: Password.trim() };
                metodo = 'POST';
            }
            else {
                parametros = { id: id, firstname: firstname.trim(), Email: Email.trim(), Password: Password.trim() };
                metodo = 'PUT';
            }
            enviarSolicitud(metodo, parametros);
        }
    }

    const enviarSolicitud = async (metodo, parametros) => {
        console.log("metodo=", metodo);
        console.log("parametros=", parametros);
        await axios({ method: metodo, url: url, data: parametros })
            .then(function (respuesta) {
                var tipo = respuesta.data[0];
                var msj = respuesta.data[1];
                show_alert(msj, tipo);
                if (tipo === 'success') {
                    document.getElementById('btnCerrar').click();
                    getUsers();
                }
            })
            .catch(function (error) {
                show_alert('Error en la solicitud', 'error');
                console.log(error);
            });
    }

    const deleteProduct = (id, firstname) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Seguro de eliminar el usuario ' + firstname + ' ?',
            icon: 'question', text: 'No se podrá dar marcha atrás',
            showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud('DELETE', { id: id });
            }
            else {
                show_alert('El producto NO fue eliminado', 'info');
            }
        });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>#</th><th>First Name</th><th>Email</th><th>Password</th><th></th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {users.map((user, i) => (
                                        <tr key={user.id}>
                                            <td>{(i + 1)}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.Email}</td>
                                            <td>{user.Password}</td>
                                            <td>
                                                <button onClick={() => openModal(2, user.id, user.firstname, user.Email, user.Password)}
                                                    className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deleteProduct(user.id, user.firstname)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalUsers' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='firstname' className='form-control' placeholder='First Name' value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='email' id='Email' className='form-control' placeholder='Email' value={Email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='password' id='Password' className='form-control' placeholder='Password' value={Password}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ShowUsers

