var submit = document.querySelector("#submit");
var container = document.querySelector(".container");
var form = document.querySelector("#anime-form");
var title = document.querySelector("#title");
var rating = document.querySelector("#rating");
var tbody = document.querySelector("#anime-list");
var ratingValue = document.querySelector("#rating-value");


class Anime{
    constructor(title,rating){
        this.title = title,
        this.rating = rating
    }
}
class Store{

    static getAnimeList(){
        let animeList;

        if(localStorage.getItem('animeList') === null){
            animeList = []
        }
        else{
            animeList = JSON.parse(localStorage.getItem('animeList'));
        }

        return animeList;
    }

    static addAnime(anime){
        const animeList = Store.getAnimeList();
        animeList.push(anime);
        localStorage.setItem('animeList',JSON.stringify(animeList)); 

    }

    static removeAnime(title){
        const animeList = Store.getAnimeList();
        animeList.forEach((anime,index) => {
            if(anime.title === title){
                console.log(index)
                animeList.splice(index,1);
            }
        });
        localStorage.setItem('animeList',JSON.stringify(animeList)); 
    }

    static checkifAnimeExists(){
        var flag = false; 
        const animeList = Store.getAnimeList();
        animeList.forEach((anime) => {
        if(anime.title === title.value){
            console.log(true);
            flag = true;
        }
        });
        return flag;
    }

    

}
class UI{
    static displayAnimeList(){
        var storedAnimeList =Store.getAnimeList();  

        var animeList = storedAnimeList;

        animeList.forEach(animeItem => UI.addAnimetoList(animeItem));
    }

    static setRating(){
        ratingValue.textContent = rating.value;
    }

    static addAnimetoList(animeItem){
        var tr = document.createElement("tr");

        tr.innerHTML =`
            <td>${animeItem.title}</td>
            <td>${animeItem.rating}</td>
            <td class="delete"><a href="#" class="btn btn-danger btn-small delete-button">X</a></td>        
        `
        tbody.appendChild(tr);
    }


    static showAlert(message,className){
        var div = document.createElement("div");
        div.className =`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form)

        setTimeout(() => {
            div.remove();
        }, 2000);

    }
    static addAnimeFromForm(){
        if(title.value.length){
            if(Store.checkifAnimeExists()){
                UI.showAlert("This Anime was already added","danger")
            }
            else{
                var animeItem = new Anime(title.value,rating.value);
                console.log(animeItem);
                
                Store.addAnime(animeItem);
                UI.addAnimetoList(animeItem);
                title.value="";
    
                rating.value="";
                UI.showAlert("Anime successfully added","success")
            }
        }
        
        else{
            UI.showAlert("Please enter the Anime name","danger")
        }
    }
}

UI.setRating();

document.addEventListener("DOMContentLoaded",UI.displayAnimeList);

submit.addEventListener("click",UI.addAnimeFromForm);

rating.addEventListener("input", UI.setRating);

tbody.addEventListener("click",function(event){
    if(event.target.classList.contains("delete-button")){
        Store.removeAnime(event.target.parentNode.previousElementSibling.previousElementSibling.textContent)
        event.target.parentNode.parentNode.remove();
        UI.showAlert("Anime successfully removed","success")
	}
    
})

