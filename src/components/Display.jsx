import React, { useState, useEffect } from "react";
import "./display.css";
import axios from "axios";

function Display(props) {
    const [catQuery, setCatQuery] = useState([]); // Holds array of cat image queries
    const [blackListedCats, setBlackListedCats] = useState([]);
    const [currCat, setCurrCat] = useState({});
    const [currAttributes, setCurrAttributes] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [blacklistedAttributes, setBlackListedAttributes] = useState(
        props.upperBlacklistedAttributes
    ); // The blacklisted attributes

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://api.thecatapi.com/v1/images/search?limit=30&&has_breeds=1&api_key=live_kDQYD1Dc0vnJVvGBcWw8AaTeg0vHQmL2BcKIX71rzjEZJq56GP510TGw9RLug6x8"
            );
            setCatQuery(response.data);
        };
        fetchData();
    }, []); // Only does this on the initital render

    // Use useEffect to update blacklistedAttributes when props.upperBlacklistedAttributes changes
    useEffect(() => {
        setBlackListedAttributes(props.upperBlacklistedAttributes);
    }, [props.upperBlacklistedAttributes]);

    const handleClick = () => {
        setClicked(true);
        const filteredCats = [];
        console.log(blacklistedAttributes);
        for (var i = 0; i < catQuery.length; i++) {
            if (
                blacklistedAttributes.includes(`${catQuery[i].breeds[0].origin}`) ||
                blacklistedAttributes.includes(
                    `Grooming: ${catQuery[i].breeds[0].grooming}`
                ) ||
                blacklistedAttributes.includes(
                    `Life Span: ${catQuery[i].breeds[0].life_span}`
                ) ||
                blacklistedAttributes.includes(
                    `Social needs: ${catQuery[i].breeds[0].social_needs}`
                )
            ) {
                // Exclude cats with blacklisted attributes
            } else {
                filteredCats.push(catQuery[i]);
            }
        }
        setCurrCat(filteredCats[Math.floor(Math.random() * filteredCats.length)]); // Random index from 0-30
    };

    const handleButtonClick = (attribute) => {
        // Update the local state with the new blacklist
        setBlackListedAttributes((prevAttributes) => [...prevAttributes, attribute]);
        // Update the state by adding the attribute to the blacklist
        props.setUpperBlackListedAttributes((prevAttributes) => [
            ...prevAttributes,
            attribute,
        ]);
    };

    useEffect(() => {
        if (currCat.breeds) {
            setCurrAttributes([
                currCat.breeds[0].origin,
                `Life Span: ${currCat.breeds[0].life_span}`,
                `Grooming: ${currCat.breeds[0].grooming}`,
                `Social needs: ${currCat.breeds[0].social_needs}`,
            ]);
        }
    }, [currCat]); // Need this to ensure the page properly rerenders before the picture and name is displayed, might need to click twice otherwise

    return (
        <>
            <div className="display-container">
                <div className="display">
                    <h1>Cat App</h1>
                    <p>Look at random cats</p>
                    <p>🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱🐱</p>
                    {clicked ? (
                        <div className="changeables">
                            <h2>Name: {currCat.breeds[0].name}</h2>
                            {currAttributes.map((attribute) => (
                                <button
                                    className="button"
                                    onClick={() => handleButtonClick(attribute)}
                                >
                                    {attribute}
                                </button>
                            ))}
                            <img
                                src={currCat.url}
                                className="catImage"
                                alt="logo"
                                width="300"
                                height="300"
                            />
                        </div>
                    ) : null}
                    <button onClick={handleClick}>Discover</button>
                </div>
            </div>
        </>
    );
}

export default Display;
