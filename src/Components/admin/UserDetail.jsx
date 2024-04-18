import { useContext } from 'react';
import './Detail.css'
import MyContext from '../../context/myContext';

const UserDetail = () => {
    const context = useContext(MyContext)
    const {getAllUser}=context
    return (
        <div>
            <div>
                <div className="detail-heading-container">
                    {/* text  */}
                    <h1 className="detail-heading">All User</h1>
                </div>

                {/* table  */}
                <div className="detail-table">
                    <table className="detail-table-container" >
                        <tbody>
                            <tr>
                                <th scope="col" className="S-No-th">S.No.</th>
                                <th scope="col" className="th">Name</th>
                                <th scope="col" className="th">Email</th>
                                <th scope="col" className="th">Uid</th>
                                <th scope="col" className="th">Role</th>
                                <th scope="col" className="th">Date</th>
                            </tr>
                            {getAllUser.map((value,index)=>{
                                return(
                                    <tr key={index}>
                                <td>
                                    {index+1}
                                </td>
                                <td className="first-letter:uppercase ">
                                    {value.name}
                                </td>
                                <td className="cursor-pointer ">
                                {value.email}
                                </td>
                                <td className="cursor-pointer ">
                                {value.uid}
                                </td>
                                <td className="cursor-pointer ">
                                {value.role}
                                </td>
                                <td className="cursor-pointer ">
                                {value.date}
                                </td>
                                
                            </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;