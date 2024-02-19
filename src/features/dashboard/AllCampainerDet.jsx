import React from "react";
import { useGetAllCampainersFromUsersQuery } from "../../services/jsonApi";
import { Link, useNavigate } from "react-router-dom";

function AllCampainerDet() {
    var { data, isLoading } = useGetAllCampainersFromUsersQuery()
    var nav = useNavigate()
    // console.log(data);
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
    return (
        <div className="container">
            <h1>All Campaigner Details</h1>
            {isLoading && (<h1>....Loading</h1>)}
            <div >
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th onClick={()=>{handleSort('username')}}>Name</th>
                            <th onClick={()=>{handleSort('email')}}>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isLoading && alldet.map((reg, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td><Link to={`/registeredmembers/${reg.username}`}>{reg.username}</Link> </td>
                                        <td>{reg.email}</td>
                                        <td>{reg.password}</td>
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
export default AllCampainerDet