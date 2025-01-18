import { FaTrashAlt } from "react-icons/fa";
import useInfo from "../../../Components/Hooks/useInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Bookings = () => {
    const [bookings, refetch] = useInfo();
    const totalPrice = bookings.reduce((total, book) => total + book.price, 0)
    const axiosSecure = useAxiosSecure();
    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        //console.log(res)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="p-5">
            <div className="p-3 flex justify-evenly">
                <h2 className="text-3xl">My Bookings {bookings.length}</h2>
                <h2 className="text-3xl">Total Price {totalPrice}</h2>
                
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
                                

                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((book, index) => <tr key={book._id}>
                                <th>
                                    {index + 1}
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
                                    {book.status === "pending" ? (
                                        <>
                                            <Link to={`/dashboard/payment/${book._id}`}>
                                                <button className="btn btn-ghost btn-xs">Pay</button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-500 btn btn-ghost btn-xs ml-2"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500">Payed</span>
                                    )}
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