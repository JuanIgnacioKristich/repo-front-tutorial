import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from '../functions';

const ShowUsers = () => {
    const url = "http://127.0.0.1:3000/users";
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [firstname, setFirstmame] = useState('');
    const [lastname, setLastname] = useState('');
    const [active, setActive] = useState(1);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(url);
        setUsers(response.data);
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4-offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row-mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>#</th><th>First Name</th><th>Last Name</th><th>Active</th><th></th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {
                                        users.map((user, i) => (
                                            <tr key={user.id}>
                                                <td>{(i + 1)}</td>
                                                <td>{user.firstname}</td>
                                                <td>{user.lastname}</td>
                                                <td>{user.active ? 'Sí' : 'No'}</td>
                                                <td>
                                                    <button className='btn btn-warning'>
                                                        <i className='fa-solid fa-edit'></i>
                                                    </button>
                                                    &nbsp;
                                                    <button className='btn btn-danger'>
                                                        <i className='fa-solid fa-trash'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-fade'>
            </div>
        </div>
    )
}

export default ShowUsers