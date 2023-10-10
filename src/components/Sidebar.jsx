import React, { useState, useEffect } from "react";
import "./sidebar.css";

function Sidebar(props) {
    const [blacklistedAttributes, setBlackListedAttributes] = useState(
        props.upperBlacklistedAttributes
    ); // The blacklisted attributes

    // Use useEffect to update blacklistedAttributes when props.upperBlacklistedAttributes changes
    useEffect(() => {
        setBlackListedAttributes(props.upperBlacklistedAttributes);
    }, [props.upperBlacklistedAttributes]);

    const handleButtonClick = (attribute) => {
        // Remove the attribute from the blacklist
        const updatedBlacklist = blacklistedAttributes.filter(
            (item) => item !== attribute
        );
        setBlackListedAttributes(updatedBlacklist);

        // Update the state in the parent component (props.setUpperBlackListedAttributes).
        props.setUpperBlackListedAttributes(updatedBlacklist);
    };
    return (
        <>
            <div className="sidebar-container">
                <h1>Ban List</h1>
                <p>Select attributes from your liking to ban it</p>
                <div className="banlist">
                    {blacklistedAttributes.map((attribute) => (
                        <button
                            className="button"
                            onClick={() => handleButtonClick(attribute)}
                        >
                            {attribute}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
