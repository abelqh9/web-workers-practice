import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

    const [myWorker, setMyWorker] = useState(null);
    const [time, setTime] = useState(0)

    useEffect(() => {
        let newUrl = (new URL('./app.worker.js', import.meta.url) ),
            newWorker = new Worker(newUrl); 
        setMyWorker( newWorker );

        return () => {
            console.log("web worker se terminó");
            newWorker.terminate();
        }
    }, [])

    useEffect(() => {
        if (myWorker) {
            myWorker.onmessage = function (e) {
                setTime(oldTime => {
                    document.title = e.data;
                    return e.data;
                });
            };
        }
    }, [myWorker])

    function buttonHandler(e) {
        myWorker.postMessage(["work", time]);
    }

    return (
        <div className="App">
            <button onClick={buttonHandler}>Press here</button>     
        </div>
    );
}

export default App;
