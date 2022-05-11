const loginForm = document.getElementById('login_form')
const usernameInput = document.getElementById('username_input')
const passwordInput = document.getElementById('password_input')
const herokuLink = `https://build-a-build-jala0128.herokuapp.com`
const localhostLink = `http://127.0.0.1:9876`
const backendURL = window.location.href.includes(`127.0.0.1`)?localhostLink:herokuLink

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

    axios.get(`${backendURL}/login/${usernameInput.value}/${passwordInput.value}`).then(res => {
        window.localStorage.setItem('username', usernameInput.value)
        window.localStorage.setItem('userId', res.data[0].user_id)
        window.location.href = './buildPage.html'
        console.log(res.data)
    })
    
})