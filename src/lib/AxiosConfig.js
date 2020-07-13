import {useContext} from 'react'
import {AppContext} from "../contexts/AppContext";


function useAxiosConfig(){
    const [state, dispatch] = useContext(AppContext);
    let {profile} = state;
    return {
        headers: {
            'Authorization': profile.token
        }
    };
}

export default useAxiosConfig;