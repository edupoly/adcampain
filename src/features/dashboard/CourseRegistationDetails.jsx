import React, { useEffect } from "react";
import { useLazyGetRegisterByCourseQuery } from "../../services/jsonApi";
import { useParams } from "react-router-dom";

function CourseRegDet() {
    var [courseDet, { data }] = useLazyGetRegisterByCourseQuery()
    var { pname } = useParams()
    console.log(data);
    useEffect(() => {
        courseDet(pname).then((res) => {
            // console.log(res);
        })
    }, [])
    return (
        <div>
            
            {
                !data && (<h1>Please...Wait</h1>)
            }
            <div className="container">
            <h1>Course Registration Details: {pname}</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Campaigner</th>
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
                                        <td>{reg.phone}</td>
                                        <td>{reg.campaigner}</td>
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
export default CourseRegDet