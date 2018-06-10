

var animalsArray = [];
var headerBtns;

 
   
$("#search-btn").on("click", function(){
    event.preventDefault()
    btnAnimal = $("#search").val();
     // console.log(btnAnimal);
    animalsArray.push(btnAnimal);
     // console.log(animalsArray)
      createBtn()
    })

function createBtn(){
    $("#header-btn").empty();
    // if ($("#search").val() === ""){
    //     let p = $("<p>").text("Add a value");
    //     $("<form>").append(p)
    // } else{
    for (let i = 0; i < animalsArray.length; i++){
        headerBtns = $("<button>").attr("data-animal", animalsArray[i]).addClass("animal").text(animalsArray[i]);
        $("#header-btn").append(headerBtns);
    }
}


$(document).on("click", ".animal", function(){
        let  queryParam =  $(this).attr("data-animal");
        let  apiKey = "wYd5qA3nDmheJvPCM3DRvmdtCkP4lsrG";
        let numGif = "10";
         console.log(queryParam);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryParam + "&api_key=" + apiKey + "&limit=" + numGif;
        console.log(queryURL);
       
        if (this){
            $("#images-container").empty()

        }

       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function(response){
        console.log(response)
        let imgURL = response.data;

        for (let i = 0; i < imgURL.length; i++){
         let image = $("<img>");
                image.attr({
                        "src": imgURL[i].images.fixed_height.url,
                        "alt": "cat image",
                        "class": "img-class",
                        "data-state": ""
                    })


            $("#images-container").append(image)
         }

       })
})