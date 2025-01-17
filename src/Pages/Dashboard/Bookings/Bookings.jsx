import { FaTrashAlt } from "react-icons/fa";
import useInfo from "../../../Components/Hooks/useInfo";

const Bookings = () => {
    const [bookings] = useInfo();
    const totalPrice = bookings.reduce((total, book) => total + book.price, 0)
    const handleDelete=id=>{

    }
    return (
        <div className="p-5">
            <div className="p-3 flex justify-evenly">
            <h2 className="text-3xl">My Bookings {bookings.length}</h2>
            <h2 className="text-3xl">Total Price {totalPrice}</h2>
            <button className="btn">Pay</button>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                  #
                                </th>
                                <th>Package Name</th>
                                <th>Guide Name</th>
                                <th>Tour date</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Pay</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((book,index)=><tr key={book._id}>
                                <th>
                                    {index+1}
                                </th>
                                <td>
                                {book.packageName}
                                </td>
                                <td>
                                   {book.guideName}
                                    
                                </td>
                                <td>{book.tourDate}</td>
                                <td>{book.price}</td>
                                <td>{book.status}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Pay</button>
                                </th>
                                <th>
                                    <button
                                    onClick={()=>handleDelete(book._id)} 
                                    className="text-red-500 btn btn-ghost btn-xs">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>)
                            }
                            
                           
                        </tbody>
                       
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;