import React from "react";
import { useGetAllRegistrationsQuery } from "../../services/jsonApi";

function AllRegDet() {

    var { data, isLoading } = useGetAllRegistrationsQuery()
    let [sortStatus, setSortStatus] = React.useState(false)
    let [alldet, setAlldet] = React.useState([])

    React.useEffect(() => {
        if (!isLoading)
            setAlldet([...data])
    }, [isLoading])

    const handleSort = (type) => {

        setSortStatus(!sortStatus)

        alldet.sort((a, b) => {
            if (a[type] > b[type]) {
                return sortStatus ? 1 : -1
            }
            if (a[type] < b[type]) {
                return sortStatus ? -1 : 1
            }
            return 0
        })
        console.log(alldet);
    }
    // 
    return (
        <div className="container">
            <h1>All Registered Details</h1>
            {
                isLoading && (<h1>Please...Wait</h1>)
            }


            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th onClick={() => { handleSort('course') }}>Course</th>
                            <th onClick={() => { handleSort('name') }}>Name</th>
                            <th onClick={() => { handleSort('phone') }}>Phone Number</th>
                            <th onClick={() => { handleSort('date') }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isLoading && alldet.map((reg, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{reg.course}</td>
                                        <td>{reg.name}</td>
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
export default AllRegDet