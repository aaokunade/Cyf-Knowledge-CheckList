import React from 'react';


const Student = () => {
    return (
        <div>
            <h1>Name</h1>
            <div>
                <button id="html-css">HTML/CSS</button>
                <button id="javaScript">JavaScript</button>
                <button id="react">React</button>
            </div>
            <div id="html-css">
                <h2>HTML/CSS</h2>
                <div>
                    <p>Understand what 'parent' and 'child' is </p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
            <div id="javaScript">
                <h2>JavaScript</h2>
                <div>
                    <p>Understand what 'parent' and 'child' is</p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
            <div id="react">
                <h2>React</h2>
                <div>
                    <p>Understand what 'parent' and 'child' is</p>
                    <button>Not Confident</button>
                    <button>Needs Revision</button>
                    <button>Confident</button>
                </div>
            </div>
        </div>
    )
}

export default Student;
