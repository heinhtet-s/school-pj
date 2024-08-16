import { ClipLoader } from "react-spinners";

const LoadingIndicator = (props)=>{

    const { loading,color, label } = props;

    if(loading=== false)   return null;

    return(
        <div>
            <div className="absolute left-2/4 top-2/4 m-auto rounded-md bg-gray-400 flex flex-col items-center backdrop-filter backdrop-blur-lg opacity-90 bg-gradient-to-r from-gray-300 to-blue-100">
                <ClipLoader color={color || "#4724d4"} loading={true} size={70} margin={4} />
            </div>
        </div>
    );

}

export default LoadingIndicator;