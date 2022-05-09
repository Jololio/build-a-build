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
    console.log(dropdownArr, champDropdown)
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
const getBuildItems = (build) => {
    console.log(build)
    let {item_1, item_2, item_3, item_4, item_5, item_6} = build
    axios.get(`http://localhost:9876/items?item_1=${item_1}&item_2=${item_2}&item_3=${item_3}&item_4=${item_4}&item_5=${item_5}&item_6=${item_6}`).then(res => {
        console.log(res.data)
        let buildNameDisplay = document.getElementById('build_name_display')
        let championNameDisplay = document.getElementById('champion_name_display')
        for (let i = 0; i < res.data.length; i++){
            let itemContainer = document.getElementById(`item${i+1}_container`)
            itemContainer.innerHTML = `<h1>${res.data[i].item_name}</h1>`
        }
        buildNameDisplay.innerHTML = `<h1>${build.build_name}</h1>`
        championNameDisplay.innerHTML = `<h1>${build.champ_name}</h1>`
    })
} 
const getBuildNames = () => {
    axios.get('http://localhost:9876/builds').then(res => {
        console.log(res.data)
        let buildNamesContainer = document.getElementById('build_names_container')
        console.log(buildNamesContainer)
        for (let i = 0; i < res.data.length; i++){
            console.log(res.data[i])
            let buildName = document.createElement('h1')
            buildName.textContent = res.data[i].build_name
            buildNamesContainer.appendChild(buildName)
            buildName.addEventListener('click', () => {
                getBuildItems(res.data[i])
            })
        }
    })
}
getBuildNames()
const insertBuildForm = () => {
    let editorContainer = document.getElementById('editor_container')
    editorContainer.innerHTML = `<h1>CREATE A NEW BUILD:</h1>
    <div id="build_name_display">
      <input id="build_name_input" placeholder="Name your build">
    </div>
  <div id="champion_name_display">
    <label for="champions">Choose a champion</label>
    <select name="champions" id="champions">
      <option value="" style="display: none">Choose a champion</option>
    </select>
  </div>

    <section class="dropdown_container">
      <div id="item1_container">
      <label for="item_dropdwn1">First Item</label>
      <select name="item_dropdwn1" id="item_dropdwn1">
        <option value="" style="display: none">Choose an item</option>
      </select>
      </div>

      <div id="item2_container">
      <label for="item_dropdwn2">Second Item</label>
      <select name="item_dropdwn2" id="item_dropdwn2">
        <option value="" style="display: none">Choose an item</option>
      </select>
    </div>
    </section>
     
    <section class="dropdown_container">
      <div id="item3_container">
      <label for="item_dropdwn3">Third Item</label>
      <select name="item_dropdwn3" id="item_dropdwn3">
        <option value="" style="display: none">Choose an item</option>
      </select>
      </div>
      
      <div id="item4_container">
      <label for="item_dropdwn4">Fourth Item</label>
      <select name="item_dropdwn4" id="item_dropdwn4">
        <option value="" style="display: none">Choose an item</option>
      </select>
      </div>
    </section>

    <section class="dropdown_container">
      <div id="item5_container">
      <label for="item_dropdwn5">Fifth Item</label>
      <select name="item_dropdwn5" id="item_dropdwn5">
        <option value="" style="display: none">Choose an item</option>
      </select>
      </div>

      <div id="item6_container">
      <label for="item_dropdwn6">Sixth Item</label>
      <select name="item_dropdwn6" id="item_dropdwn6">
        <option value="" style="display: none">Choose an item</option>
      </select>
    </div>
    </section>
    

    <button id="save_button" onclick="saveBuild()">Save Build</button>`
    getChampions()
    getItems()
}
document.getElementById('create_button').addEventListener('click', insertBuildForm)