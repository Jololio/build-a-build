const loginForm = document.getElementById('login_form')
const usernameInput = document.getElementById('username_input')
const passwordInput = document.getElementById('password_input')

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

    axios.get(`https://build-a-build-jala0128.herokuapp.com/login/${usernameInput.value}/${passwordInput.value}`).then(res => {
        window.localStorage.setItem('username', usernameInput.value)
        window.localStorage.setItem('userId', res.data.user_id)
        window.location.href = './buildPage.html'
        console.log(res.data)
    })
    
})