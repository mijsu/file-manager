const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}
document.addEventListener("DOMContentLoaded", function () {
  const currentUrl = window.location.href;
  const sidebarLinks = document.querySelectorAll("#sidebar a");

  sidebarLinks.forEach(link => {
    if (link.href === currentUrl) {
      link.classList.add("active");

      // Find the closest sub-menu and mark the parent dropdown button as active
      const subMenu = link.closest(".sub-menu");
      if (subMenu) {
        subMenu.classList.add("show");
        const parentDropdown = subMenu.previousElementSibling;

        if (parentDropdown && parentDropdown.classList.contains("dropdown-btn")) {
          parentDropdown.classList.add("active"); // Highlight parent menu
        }
        
        // If the link is a child in the sub-menu, make sure the parent dropdown is active
        const parentLink = subMenu.previousElementSibling;
        if (parentLink && parentLink.classList.contains("dropdown-btn")) {
          parentLink.classList.add("active"); // Parent menu gets active
        }
      }
    }
  });

  // Ensure only one main link is active (excluding parent dropdowns)
  const activeLinks = document.querySelectorAll("#sidebar > ul > li > a.active");
  if (activeLinks.length > 1) {
    activeLinks.forEach(mainLink => {
      const hasActiveSubItem = mainLink.nextElementSibling?.querySelector(".active");
      if (!hasActiveSubItem) {
        mainLink.classList.remove("active");
      }
    });
  }
});
