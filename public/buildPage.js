const usernameHeader = document.getElementById('username_header')
let champDropdown = document.getElementById('champions')
let dropdownArr = [document.getElementById('item_dropdwn1'), document.getElementById('item_dropdwn2'), document.getElementById('item_dropdwn3'), document.getElementById('item_dropdwn4'), document.getElementById('item_dropdwn5'), document.getElementById('item_dropdwn6')]
let buildNamesContainer = document.getElementById('build_names_container')
let buildNameInput = document.getElementById('build_name_input')
let viewBuildContainer = document.getElementById('view_build_container')
let currentBuild = null;

usernameHeader.innerText = window.localStorage.getItem('username') + "'s Builds:" 

const getChampions = () => {
    axios.get('https://build-a-build-jala0128.herokuapp.com/champions').then(res => {
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
    axios.get('https://build-a-build-jala0128.herokuapp.com/items').then(res => {
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
    if(currentBuild) {
        // Build Update Endpoint
        body.buildId = currentBuild.build_id
        axios.put('https://build-a-build-jala0128.herokuapp.com/edit-build', body).then(res => {
            alert('Build Updated!')
            getBuildNames()
        })
    }
    else {
        axios.post('https://build-a-build-jala0128.herokuapp.com/create-build', body).then(res => {
            getBuildNames()
        })
    }
}

const showBuildContainer = () => {
    let editorContainer = document.getElementById('editor_container')
    viewBuildContainer.style.display = 'block'
    editorContainer.style.display = 'none'
}
const getBuildItems = (build, isEditing) => {
    console.log(build)
    let {item_1, item_2, item_3, item_4, item_5, item_6, champ_name, build_name} = build
    let editorContainer = document.getElementById('editor_container')
    axios.get(`https://build-a-build-jala0128.herokuapp.com/items?item_1=${item_1}&item_2=${item_2}&item_3=${item_3}&item_4=${item_4}&item_5=${item_5}&item_6=${item_6}`).then(res => {
        document.getElementById(`build_name_header`).innerHTML = build_name
        document.getElementById(`champ_name_header`).innerHTML = champ_name
        res.data.forEach((item, i) => {
            document.getElementById(`build_item${i+1}`).innerHTML = item.item_name  
        })

        if(isEditing) {
            champDropdown.value = build.champion_id
            buildNameInput.value = build.build_name
            for (let i = 0; i < res.data.length; i++) {
              dropdownArr[i].value = res.data[i].item_id
            }
        }
    })
}
const showEditor = () => {
    let editorContainer = document.getElementById('editor_container')
    viewBuildContainer.style.display = 'none'
    editorContainer.style.display = 'block'
} 
const getBuildNames = () => {
    axios.get('https://build-a-build-jala0128.herokuapp.com/builds').then(res => {
        let buildNamesContainer = document.getElementById('build_names_container')
        buildNamesContainer.innerHTML = ''
        for (let i = 0; i < res.data.length; i++){
            let buildName = document.createElement('h1')
            buildName.style.cursor = 'pointer'
            buildName.textContent = res.data[i].build_name
            buildNamesContainer.appendChild(buildName)
            buildName.addEventListener('click', () => {
                showBuildContainer()
                currentBuild = res.data[i]
                getBuildItems(res.data[i])
            })
        }
    })
}
getBuildNames()
const deleteBuild = () => {
    console.log(currentBuild)
    axios.delete(`https://build-a-build-jala0128.herokuapp.com/delete-build/${currentBuild.build_id}`).then(res => {
        alert('Build has been deleted!')
        getBuildNames()
    })
}
const editBuild = () => {
    showEditor()
    getBuildItems(currentBuild, true)
}