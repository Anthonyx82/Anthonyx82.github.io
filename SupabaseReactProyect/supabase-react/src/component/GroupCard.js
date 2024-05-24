import React from "react";

function GroupCard({ group, onClick }) {
    return (
        <div className="card card-body" onClick={onClick}>
            <h1 className="h5">{group.name}</h1>
        </div>
    );
}

export default GroupCard;
