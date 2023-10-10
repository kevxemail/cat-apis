import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Display from "./components/Display";
function App() {
    const [blacklistedAttributes, setBlackListedAttributes] = useState([]); // The blacklisted attributes
    const changeBlackListedAttributes = (attributeList) => {
        setBlackListedAttributes(attributeList);
    };
    return (
        <>
            <Sidebar
                upperBlacklistedAttributes={blacklistedAttributes}
                setUpperBlackListedAttributes={changeBlackListedAttributes}
            />
            <Display
                upperBlacklistedAttributes={blacklistedAttributes}
                setUpperBlackListedAttributes={changeBlackListedAttributes} // We can pass in a function too
            />
        </>
    );
}

export default App;
