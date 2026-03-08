function showTool(id){
    // Hide all toolPages
    document.querySelectorAll(".toolPage").forEach(p => p.style.display = "none");

    // Show selected toolPage
    const page = document.getElementById(id);
    if(page){
        page.style.display = "flex"; // must be flex to center content
        page.style.flexDirection = "column";
        page.style.alignItems = "center";
        page.style.justifyContent = "center";
    }
}

// On page load, show home
window.onload = function(){
    showTool("home");
}
