import { jwtDecode } from "jwt-decode";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    if (!token || !decodedToken) {
        navigate('/signin');
        return null;
    }

    if(decodedToken){
        axios.get(`${BASE_URL}/api/v1/account/balance`, { headers: { authorization: `Bearer ${token}` } })
        .then(response => {
            setBalance(response.data.balance);
        })  
        .catch(error => {
            console.error(error);
        });

    }

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}
 
export default Dashboard