var giphyArray = [];
var headerBtns;
var btnGiphy;
   
$("#search-btn").on("click", function(event){
    event.preventDefault()
    btnGiphy = $("#search").val();
     // console.log(btnGiphy);
     // console.log(giphyArray)
          if (btnGiphy == ""){
        $("#header-btn").text("Add a query to the field.");
    } else {
        $("#header-btn").empty();
        giphyArray.push(btnGiphy);
        createBtn();
    }
    })

function createBtn(){
    $("#header-btn").empty();
    for (let i = 0; i < giphyArray.length; i++){
        headerBtns = $("<button>").attr("data-gif", giphyArray[i]).addClass("gifBtn").text(giphyArray[i]);
        $("#header-btn").append(headerBtns);
        if (i === 16)  {
            $("#header-btn").empty();
            var clearMessage = $("<p>").text('Click the "Clear All" Button').addClass("message");
            $("#clear-message").html(clearMessage);
            return    
        }
    }
}

$(document).on("click", ".gifBtn", function(){
        let queryParam =  $(this).attr("data-gif");
        let apiKey = "wYd5qA3nDmheJvPCM3DRvmdtCkP4lsrG";
        let numberofGifs = "10";
        let image;
         console.log(queryParam);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryParam + "&api_key=" + apiKey + "&limit=" + numberofGifs;
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
            image = $("<img>");
                image.attr({
                        "src": imgURL[i].images.fixed_height_still.url,
                        "data-animate": imgURL[i].images.fixed_height.url,
                        "data-still": imgURL[i].images.fixed_height_still.url,
                        "alt": "cat image",
                        "class": "img-class",
                        "data-state": "still"
                    })      
            $("#images-container").append(image)
         }
       })

       $(document).on("click", ".img-class", function(){
            var state = $(this).attr("data-state");
            console.log(state);
            if (state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
             }
         })
})

function clear(){
    $("#header-btn").empty();
    $("images-container").empty();
}

$("clear-btn").on("click", function(){
    clear();
})