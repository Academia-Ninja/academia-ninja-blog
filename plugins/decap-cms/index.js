const user = fromUserData();

function fromUserData() {
    if (!window.netlifyIdentity) return;
    const user = window.netlifyIdentity.currentUser();

    return {
        name: user.user_metadata.full_name,
    }
}

function addUserDataIntoAnyField(user, field) {
    const fieldLabel = Array.from(document.querySelectorAll('label').find(label => label.textContent.trim() === field));
    const fieldInput = document.getElementById(fieldLabel.getAttribute('for'));

    fieldInput.value = user.name;
}

function onPageChange() {
    if (window.location.hash === '#/collections/blog/new')
        addUserDataIntoAnyField(user, 'Author');
}

function registerWindowEvents() {
    window.addEventListener('popstate', onPageChange);
}

registerWindowEvents();