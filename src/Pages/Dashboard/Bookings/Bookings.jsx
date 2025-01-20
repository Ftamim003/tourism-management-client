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
            <h2 className="text-lg md:text-3xl">My Bookings ({bookings.length})</h2>
            <h2 className="text-lg md:text-3xl">Total Price: {totalPrice}</h2>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full bg-white border border-gray-200">
                {/* Table Head */}
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Package Name</th>
                        <th className="px-4 py-2">Guide Name</th>
                        <th className="px-4 py-2">Tour Date</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {bookings.map((book, index) => (
                        <tr key={book._id} className="border-t">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 truncate">{book.packageName}</td>
                            <td className="px-4 py-2">{book.guideName}</td>
                            <td className="px-4 py-2">{new Date(book.tourDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">{book.price}</td>
                            <td className="px-4 py-2 capitalize">{book.status}</td>
                            <td className="px-4 py-2 space-x-2">
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
                                    <span className="text-gray-500">Paid</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Bookings;