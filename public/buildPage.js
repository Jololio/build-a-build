const usernameHeader = document.getElementById('username_header')
let champDropdown = document.getElementById('champions')
let dropdownArr = [document.getElementById('item_dropdwn1'), document.getElementById('item_dropdwn2'), document.getElementById('item_dropdwn3'), document.getElementById('item_dropdwn4'), document.getElementById('item_dropdwn5'), document.getElementById('item_dropdwn6')]
let buildNamesContainer = document.getElementById('build_names_container')
let buildNameInput = document.getElementById('build_name_input')

usernameHeader.innerText = window.localStorage.getItem('username') + "'s Builds:" 

const getChampions = () => {
    axios.get('http://localhost:9876/champions').then(res => {
        res.data.forEach(champ => {
            champDropdown.innerHTML +=(`
            <option value='${champ.champion_id}' id='${champ.champ_name}'>
            ${champ.champ_name}
            </option>
        `) 
        })
    })
}
getChampions()
const getItems = () => {
    axios.get('http://localhost:9876/items').then(res => {
        dropdownArr.forEach(dropdown => {
            res.data.forEach(item => {
                dropdown.innerHTML += (`
                <option value='${item.item_id}' id='${item.item_id}'>${item.item_name}</option>
                `)
            })
        })
    })
}
getItems()
const saveBuild = () => {
    let body= {
        buildName: buildNameInput.value,
        userId: window.localStorage.getItem('userId'),
        champion: champDropdown.value,
        items: [
            dropdownArr[0].value,
            dropdownArr[1].value,
            dropdownArr[2].value,
            dropdownArr[3].value,
            dropdownArr[4].value,
            dropdownArr[5].value
        ]
    }
    console.log(body)
    axios.post('http://localhost:9876/create-build', body).then(res => {
        console.log(res)
    })
}

