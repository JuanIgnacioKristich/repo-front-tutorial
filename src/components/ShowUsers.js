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

    const getUsers = async() => {
        const response = await axios.get(url);
        setUsers(response.data);
    }

    return (
        <div>ShowUsers</div>
    )
}

export default ShowUsers