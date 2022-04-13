import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

    const [myWorker, setMyWorker] = useState(null);

    useEffect(() => {
        let newUrl = (new URL('./app.worker.js', import.meta.url) ),
            newWorker = new Worker(newUrl); 
        setMyWorker( newWorker );

        return () => {
            newWorker.terminate();
        }
    }, [])

    useEffect(() => {
        if (myWorker) {
            myWorker.onmessage = function (e) {
                console.log(e.data);
            };
        }
    }, [myWorker])

    function buttonHandler(e) {
        setInterval(() => {
            myWorker.postMessage([Math.random()]);
        }, 1000)
    }

    return (
        <div className="App">
            <button onClick={buttonHandler}>Press here</button>     
        </div>
    );
}

export default App;
