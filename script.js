var url = "https://api.github.com/users/";

var submit_btn = document.getElementById("button")
var user_name = document.getElementById("user_name")

submit_btn.addEventListener("click", function (event) {
    var name = document.getElementById("name").value;
    console.log(name)
    if (!name) {
        alert("Kindly fill the section")
    }
    event.preventDefault();
    async function makeRequest(link) {
        user_name.innerHTML = ""
        var data = await fetch(link + name);
        var parsed_data = await data.json()
        console.log(parsed_data)
        var repos_url = parsed_data["repos_url"]
        let user_act_name = parsed_data["name"]
        if(user_act_name!==null){
            user_name.append(user_act_name)
        }
        if(user_name.innerHTML==="undefined"){
            alert("Please enter a valid username!...")
            user_name.innerHTML="";
        }
        var repos = getRepos(repos_url)
        
        console.log(repos_url, repos)
    }
    makeRequest(url)
})

var card_container = document.getElementById("card_container")

async function getRepos(repos_url) {
    var repo_data = await fetch(repos_url)
    var parsed_repo_data = await repo_data.json();
    card_container.innerHTML = "";
    for (var i = 0; i < parsed_repo_data.length; i++) {
        // <a class="btn btn-primary" href="#" role="button">Link</a>
        var repo_link = parsed_repo_data[i]["html_url"];
        var repo_name = parsed_repo_data[i]["name"];
        var forks = parsed_repo_data[i]["forks_count"];
        var stars = parsed_repo_data[i]["stargazers_count"];
        var language = parsed_repo_data[i]["language"]
        var a = document.createElement("a")
        a.setAttribute("href", repo_link)
        a.setAttribute("class", "repo_names")
        a.setAttribute("target", "_blank")
        a.innerHTML = repo_name
        var card = document.createElement("div")
        card.setAttribute("class", "card")
        var card_body = document.createElement("div")
        card_body.setAttribute("class", "card-body")
        var card_title = document.createElement("h5")
        card_title.setAttribute("class", "card-title")
        var card_text = document.createElement("p")
        card_text.setAttribute("class", "card-text")
        card_text.innerHTML = `Contains the implementation of ${repo_name}`;
        var fork = document.createElement("h6")
        fork.innerHTML = `Forks : ${forks}`
        var star = document.createElement("h6")
        star.innerHTML = `stars : ${stars}`
        var lang = document.createElement("h6")
        lang.innerHTML = `Language :${language}`;
        card_title.append(a)
        card.append(card_body, card_title, card_text, fork, star, lang)
        card_container.append(card)
        console.log(parsed_repo_data)
        console.log(repo_name, repo_link)
    }
}