import './SimpleSider.css'

function SimpleSider({ title }) {
    return (
        <div id="simpleSider">
            {title ? <h1>{title}</h1> : <h1></h1>}
        </div>
    )
}

export default SimpleSider;
