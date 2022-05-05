const loginForm = document.getElementById('login_form')
const usernameInput = document.getElementById('username_input')

const showRegisterForm = () => {
    document.getElementById('register_form').style.display = 'block'
    document.getElementById('login_form').style.display = 'none'
}
const showLoginForm = () => {
    document.getElementById('login_form').style.display = 'block'
    document.getElementById('register_form').style.display = 'none'
}

login_form.addEventListener('submit', (e) => {
    e.preventDefault()

    window.localStorage.setItem('username', usernameInput.value)
    window.localStorage.setItem('userId', 1)
    window.location.href = './buildPage.html'
})