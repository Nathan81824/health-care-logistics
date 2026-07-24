document.addEventListener("DOMContentLoaded", async function(){

    const container = document.getElementById("auth-container");


    try{

        const response = await fetch("components/auth/auth.html");


        const html = await response.text();


        container.innerHTML = html;


        console.log("Auth loaded");


        // start auth after html loads
        initAuth();


    }
    catch(error){

        console.error(error);

    }

});