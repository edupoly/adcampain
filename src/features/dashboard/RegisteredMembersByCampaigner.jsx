import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetAllRegistrationMembersByCamQuery } from "../../services/jsonApi";

function RegisteredMemByCam(){
    var {rname} = useParams()
    var [getRegMem, {data}] = useLazyGetAllRegistrationMembersByCamQuery()
    

    useEffect(()=>{
        getRegMem(rname)
    },[])
    return(
        <div className="container">
            <h1>Registered Members by {rname} </h1>
            {!data && (<h1>....Loading</h1>)}
            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((reg, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{reg.name}</td>
                                        <td>{reg.course}</td>
                                        <td>{reg.phone}</td>
                                        <td>{new Date(reg.date).toLocaleString()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default RegisteredMemByCam