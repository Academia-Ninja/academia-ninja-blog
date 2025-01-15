const user = fromUserData();

function fromUserData() {
    if (!window.netlifyIdentity) return;
    const user = window.netlifyIdentity.currentUser();

    return {
        name: user.user_metadata.full_name,
    }
}

function addUserDataIntoAnyField(user, field) {
    const fieldLabel = Array.from(document.querySelectorAll('label')).find(label => label.textContent.trim() === field);
    const fieldInput = document.getElementById(fieldLabel.getAttribute('for'));

    fieldInput.setAttribute('disabled', true);
    fieldInput.setAttribute('value', user.name);
}

function handleAddUserDataIntoFields() {
    if (window.location.hash === '#/collections/blog/new') {
        setTimeout(() => {
            addUserDataIntoAnyField(user, 'Author');
        }, 2000);
    } 
}

function onWindowLoaded() {
    handleAddUserDataIntoFields();
}

function onWindowChanged() {
    handleAddUserDataIntoFields();  
}

function registerWindowEvents() {
    window.addEventListener('popstate', onWindowChanged);
    window.addEventListener('load', onWindowLoaded);
}

registerWindowEvents();