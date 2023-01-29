import React, { useState } from "react";
import { Icon } from "react-icons"
import EditProfile from "./EditProfile";
export default () => {
    const [editMode, setEditMode] = useState(false);

    const changeToFalse = () => {
        setEditMode(false);

    }

    return (
        <div className="outerBox m10">
            {editMode ? (
                <div>
                    <EditProfile changeToFalse={changeToFalse}/>
                </div>
            ) : (
                <div>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setEditMode(true)}
                    >
                        <Icon>edit</Icon>
                    </div>
                </div>
        )}
        </div>
    );
};