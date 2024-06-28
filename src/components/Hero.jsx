import React, { useEffect, useState } from 'react'
import "./Hero.css"
function Hero() {
    let [userData, setUserData] = useState();
    let [username, setUsername] = useState('');
    let [repoCount, setRepoCount] = useState(0);

    let getData = async (username) => {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();
        setUserData(data);
        let response2 = await fetch(data.repos_url);
        let repo = await response2.json();
        setRepoCount(repo.length);
    }
  return (
    <>
    <div className='container'>
        <h2>GitHub User Finder</h2>
        <div id='search-section'>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                <button className='search' onClick={() => getData(username)}>search</button>
            </form>
        </div>
        {userData ? <div className='user-details'>
            <div className="avatar">
            <a href={`https://github.com/${userData.login}`} target='same'>
                <img src={userData.avatar_url} alt="avatar" />
            </a>
        </div>
        <div className="info">
            <h3>{userData.name}</h3>
            <h5>{userData.login}</h5>
            <i>{userData.bio}</i>
            <div className='more-info'>
                <p>location: {userData.location ? userData.location : 'NA'}</p>
                <p>company: {userData.company ? userData.company : "NA"}</p>
                <p>followers: {userData.followers}</p>
                <p>following: {userData.following}</p>
            </div>
            <a href={`https://github.com/${userData.login}`} target='same'>
            <button>Repo_Count: {repoCount}</button>
            </a>
        </div>
        </div> : ""}
    </div>
    </>
  )
}

export default Hero