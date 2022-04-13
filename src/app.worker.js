onmessage = function (e) {
    let [ status, initialTime ] = e.data;

    if (status === "work") {
        setInterval(() => {
            postMessage(initialTime++);
        }, 1000);
    }
}