import {useSelector,useDispatch} from "react-redux"
import { changeEmail } from "./redux/userSlice";

interface UserState {
    name: string;
    username: string;
    email: string;
  }


export const Email =() =>{
    const dispatch =useDispatch();
    const email= useSelector((state: {user:UserState})=> state.user.email);
    
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(changeEmail(e.target.value))
    }
    return(
        <input type="email" value={email} placeholder="Email" onChange={handleChange}></input>
    );
}