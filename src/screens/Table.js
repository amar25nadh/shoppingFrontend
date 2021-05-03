import React from 'react'

//import 'bootstrap/dist/css/bootstrap.min.css';

const Table = ({ droplets }) => {
    return (
        <table className="table">
            <thead class="thead-dark">
                <tr>
                    <th>Paid</th>
                    <th>Transaction Id</th>
                    <th>Delivery status</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>status</th>

                    <th>Date</th>

                </tr>
            </thead>
            <tbody>
                {(droplets.length > 0) ? droplets.map((droplet, index) => {

                    console.log(droplet);
                    return (
                        <tr key={index}>
                            <td textAlign="center">{String(droplet.isPaid)}</td>

                            <td textAlign="center">{droplet._id}</td>
                            <td textAlign="center">{String(droplet.isDelivered)}</td>
                            <td textAlign="center">{droplet.paymentMethod}</td>
                            <td>{droplet.amount / 100}</td>
                            <td>{droplet.status}</td>

                            <td>{droplet.createdAt}</td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
        </table>
    );
}

export default Table
