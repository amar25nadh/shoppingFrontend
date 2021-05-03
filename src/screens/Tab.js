import React from 'react'

//import 'bootstrap/dist/css/bootstrap.min.css';

const Tab = ({ droplets }) => {
    return (
        <table className="table">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th> email</th>
                    <th> Id</th>

                </tr>
            </thead>
            <tbody>
                {(droplets.length > 0) ? droplets.map((droplet, index) => {

                    console.log(droplet);
                    return (
                        <tr key={index}>
                            <td textAlign="center">{String(droplet.name)}</td>

                            <td textAlign="center">{droplet.email}</td>
                            <td textAlign="center">{String(droplet.id)}</td>
                        </tr>
                    )
                }) : <tr><td colSpan="5">Loading...</td></tr>}
            </tbody>
        </table>
    );
}

export default Tab
