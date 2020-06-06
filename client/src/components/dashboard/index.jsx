import React from 'react';

import './index.scss';

const Dashboard = () => {
    return(
        <div className="dashboard col-sm-12">
            <div className="panel col-sm-4">
                <div className="inner"> <a href="/add">Add User</a> </div>
            </div>
            <div className="panel col-sm-4">
                <div className="inner"> <a href="/search">Search User</a> </div>
            </div>
            <div className="panel col-sm-4">
                <div className="inner"> <a href="/somthing_else">Not Found</a> </div>
            </div>
        </div>
    )
}
export default Dashboard;
