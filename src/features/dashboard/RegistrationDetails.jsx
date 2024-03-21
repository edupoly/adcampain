import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLazyGetRegisteredByCourseAndCampaignerQuery } from "../../services/jsonApi";

const RegistrationDetails = () => {
    const navigate = useNavigate()
    var [getRegistered, { data }] = useLazyGetRegisteredByCourseAndCampaignerQuery()
    var { userDetails, isLoggedIn } = useSelector(state => state.usr);
    var { cname } = useParams()
    const [sortType, setSortType] = React.useState(false)
    const [allDet, setAllDet] = React.useState([])
    if (!cname) {
        cname = ''
    }
    if (!isLoggedIn) {
        navigate("/login")
    }
    useEffect(() => {
        getRegistered({ username: userDetails.username, course: cname }).then((res) => { setAllDet([...res.data]) })
    }, [cname])

    const sortRegister = (type) => {
        allDet.sort((a, b) => {
            if (a[type] > b[type])
                return sortType ? 1 : -1
            if (a[type] < b[type])
                return sortType ? -1 : 1
        })
        setSortType(!sortType)
        setAllDet([...allDet])
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li key={1} className="breadcrumb-item" aria-current="page"><Link to={`/`}>Home</Link></li>
                    <li key={2} className="breadcrumb-item" aria-current="page"><Link to={`/campaignerdashboard`}>DashBoard</Link></li>
                    <li key={3} className="breadcrumb-item active" aria-current="page"><Link to={`/campaignerdashboard/registered`}>Registerd Candidates</Link></li>
                    {cname&&<li key={4} className="breadcrumb-item active" aria-current="page"><Link to={`/campaignerdashboard/registered/${cname}`}>{cname}</Link></li>}
                </ol>
            </nav>
            {
                !data && <div>Loadingg............</div>
            }
            {(data && data.length === 0) && <div>No data Found</div>}
            {(data && data.length > 0) && <div>
                <h1>Registration Details</h1>
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th onClick={() => { sortRegister('name') }}>Name</th>
                            <th onClick={() => { sortRegister('phone') }}>Phone Number</th>
                            <th onClick={() => { sortRegister('course') }}>Course</th>
                            <th onClick={() => { sortRegister('date') }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDet.map((user, index) => {
                                return <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td><Link to={`/campaignerdashboard/registered/${user.course}`}>{user.course}</Link></td>
                                    <td>{new Date(user.date).toLocaleString()}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}
export default RegistrationDetails