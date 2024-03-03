const WaitingPage = () =>{
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get('username')

    return(
        <div className="waiting-page">    
            <h3>Waiting for {username + "'s"} poll to be activated</h3>
        </div>
    )
}

export default WaitingPage