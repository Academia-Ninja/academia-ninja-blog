const user = fromUserData()

function fromUserData() {
  if (!window.netlifyIdentity) return
  const user = window.netlifyIdentity.currentUser()

  return {
    name: user.user_metadata.full_name,
    roles: user.app_metadata.roles,
  }
}

function addUserDataIntoAnyField(user, field) {
  const fieldLabel = Array.from(document.querySelectorAll("label")).find(
    label => label.textContent.trim() === field
  )
  const fieldInput = document.getElementById(fieldLabel.getAttribute("for"))

  fieldInput.setAttribute("disabled", true)
  fieldInput.setAttribute("value", user.name)
}

function handleAddUserDataIntoFields(user) {
  if (window.location.hash === "#/collections/blog/new") {
    setTimeout(() => {
      addUserDataIntoAnyField(user, "Author")
    }, 1000)
  }
}

function manageMenuItemsByUserRole(user, menuItems = []) {
  setTimeout(() => {
    const navList = Array.from(document.querySelectorAll("nav > ul > li"))

    navList.forEach(navItem => {
      const menuItemText = navItem.childNodes.item(0).textContent.trim()

      if (!user.roles.includes("Admin") && menuItems.includes(menuItemText))
        navItem.remove()
    })
  }, 1000)
}

function onWindowLoaded() {
  handleAddUserDataIntoFields(user)
  manageMenuItemsByUserRole(user, ["Workflow", "Media"])
}

function onWindowChanged() {
  handleAddUserDataIntoFields(user)
}

function registerWindowEvents() {
  window.addEventListener("popstate", onWindowChanged)
  window.addEventListener("load", onWindowLoaded)
}

registerWindowEvents()
