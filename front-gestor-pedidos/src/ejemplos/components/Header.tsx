import {useSelector} from "react-redux"

interface UserState {
    name: string;
    username: string;
    email: string;
  }

const initialState={
    name:"",
    username:"",
    email:"",
};

export const Header= ()=> { 
    const user = useSelector((state: { user: UserState }) => state.user);
    return(
        <header>
            <h1>Pagina de prueba</h1>
            <ul>
                <li>Name: {user.name}</li>
                <li>Email:{user.email}</li>
                <li>User Name:{user.username}</li>
            </ul>
        </header>
    )
}