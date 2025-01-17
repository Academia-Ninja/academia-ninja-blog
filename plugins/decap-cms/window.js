const user = fromUserData()

function fromUserData() {
  if (!window.netlifyIdentity) return
  const user = window.netlifyIdentity.currentUser()

  return {
    name: user.user_metadata.full_name,
    roles: user.app_metadata.roles,
  }
}

function addUserDataToForm(user) {
  if (window.location.hash === "#/collections/blog/new") {
    const params = {
      author: user.name,
    }

    const searchParams = new URLSearchParams(params)

    window.location.href = `${window.location.href}?${searchParams.toString()}`
    window.location.reload()
  }
}

function manageMenuItemsByUserRole(user, menuItems = []) {
  const observer = new MutationObserver(() => {
    const navList = Array.from(document.querySelectorAll("nav > ul > li"))

    navList.forEach(navItem => {
      const menuItemText = navItem.childNodes.item(0).textContent.trim()

      if (!user.roles.includes("Admin") && menuItems.includes(menuItemText)) {
        navItem.remove()
        observer.disconnect()
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

function onWindowLoaded() {
  manageMenuItemsByUserRole(user, ["Workflow", "Media"])
}

function onWindowChanged() {
  addUserDataToForm(user)
}

function registerWindowEvents() {
  window.addEventListener("popstate", onWindowChanged)
  window.addEventListener("load", onWindowLoaded)
}

registerWindowEvents()
