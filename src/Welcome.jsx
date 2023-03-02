
function Welcome (){
    return (
        <div>
            <h3><Name /></h3>
            <h2>Welcome to your ToDo List page! </h2>
        </div>
    );
}
export default Welcome;


function Name(){
    const name = "Nelly";
    return (
        <p>
            Hello {name},
        </p>
    );
}
