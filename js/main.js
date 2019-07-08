var userInfo = document.getElementById("userInfo");
var repos = document.getElementById("repos");
var head = document.getElementById("repoHead");
var btnFollow=document.getElementById("followers");
var getData=document.getElementById("followersData");
var head1=document.getElementById("head");
var user;
var data = () => {
    var name = document.getElementById("text");
    name = name.value;
    var fetchData = async () => {

        userInfo.innerHTML = `<img src="images/load.gif" id="loader" width="50" />`;
        var info = await fetch('https://api.github.com/users/' + name);
        console.log(name);
        var gitInfo = await info.json();
        user=gitInfo;
        console.log(gitInfo);
        getData.innerHTML="";

        if (!name) {
            swal("Empty field", "Please fill the above field", "error");
            userInfo.innerHTML = "";
            repos.innerHTML = "";
            getData.innerHTML="";
        }
        else if(gitInfo.message){
            swal("Invalid name", "User not found", "error");
            userInfo.innerHTML = "";
            repos.innerHTML = "";
            getData.innerHTML="";
        }
        else {
            userInfo.innerHTML = "";

            // userInfo.innerHTML = `
            //     <img src=${gitInfo.avatar_url} width="250" id="pic" />
            //     <h5>Name: ${gitInfo.name}</h5>
            //     <h5>Github name: ${gitInfo.login}</h5>
            //     <h5>No.of public repos: ${gitInfo.public_repos}</h5>
            //     <h5>No.of followers: ${gitInfo.followers}</h5>
            //     <h5>No.of followers: ${gitInfo.followers}</h5>
            //     <h5>Bio: ${gitInfo.bio}</h5>
    
            // `

            userInfo.innerHTML=`
            <div class="card" style="width: 18rem; margin:auto">
            
            <img class="card-img-top" src=${gitInfo.avatar_url} alt="Card image cap">

          
            <div class="card-body">
              <h5 class="card-title">${gitInfo.name}</h5>
              <p class="card-text">${gitInfo.bio}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">No.of public repos: ${gitInfo.public_repos}</li>
              <li class="list-group-item">No.of followers: ${gitInfo.followers}</li>
              <li class="list-group-item">No.of followers: ${gitInfo.followers}</li>
            </ul>
            <div class="card-body">
              <a href="${gitInfo.html_url}" target="_blank" class="card-link">See Profile</a>
              
            </div>
          </div>
            `

            var fetchRepo = async () => {
                repos.innerHTML = "";

                var repo = await fetch(gitInfo.repos_url);
                var repoData = await repo.json();
                console.log(repoData);

                head.innerHTML = `<h2>Repositories</h2>`;
                repoData.forEach((items, index) => {

                    if (index < 5) {
                    //     repos.innerHTML += `
                   
                    // <div id="repoBox">
                    //     <h4>${items.name}</h4>
                    //     <p>${items.description}</p>
                    //     <a href="${items.html_url}" target ="_blank" class="btn btn-primary" >See Full Repository</a>
                    // </div>
                

                    // `

                    repos.innerHTML+=`
                    <div class="card bg-light"  id="cards">
                    
                    <div class="card-body">
                      <h5 class="card-title">${items.name}</h5>
                      <p class="card-text">${items.description}</p>
                      <a href=${items.html_url} target="_blank" class="btn btn-primary">See Full Repository</a>
                    </div>
                  </div>    
                    `
                    }



                })

                btnFollow.style.display="block";

                
               


                






            }
            

            
            
        }

        fetchRepo();
        
    }

    fetchData();
    // return false;
}


var showFollowers=()=>{
    console.log(user);
    var fetchFollowers=async () =>{
        var getFollwers=await fetch(user.followers_url);
        var followersData=await getFollwers.json();
        getData.innerHTML="";
        head1.innerHTML=`<h2>Followers</h2>`
        followersData.forEach((items)=>{
            getData.innerHTML+=`
            <div class="card bg-light"  id="cards">
            <img class="card-img-top" src=${items.avatar_url} alt="Card image cap" >
            <div class="card-body">
              <h5 class="card-title">${items.login}</h5>
              
              <a href=${items.html_url} target="_blank" class="btn btn-primary">See Profile</a>
            </div>
          </div>            
            `
        })

        if(getData.innerHTML == ""){
            getData.innerHTML=`<h2 id="msg">${user.name} has no followers</h2>`;
        }
        console.log(followersData);
    }


    fetchFollowers();
}