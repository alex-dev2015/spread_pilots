const dataJson = {
  "pilots" : [
      {
          "gender": "male",
          "name"  : "Max Verstappen",
          "idade" : 27 ,
          "picture" : "https://upload.wikimedia.org/wikipedia/commons/8/8f/Max_Verstappen_2017_Malaysia_1.jpg" 
      },
      {
          "gender": "male",
          "name"  : "Alex Nascimento",
          "idade" : 34 ,
          "picture" : "https://i.postimg.cc/SKp2K1cv/Alex.jpg" 
      },
      {
          "gender": "female",
          "name"  : "Miss Luciara",
          "idade" : 54 ,
          "picture" : "https://randomuser.me/api/portraits/med/women/3.jpg" 
      },
      {
          "gender": "male",
          "name"  : "Mr Evangelino",
          "idade" : 40 ,
          "picture" : "https://randomuser.me/api/portraits/med/men/20.jpg" 
      },
     
      {
          "gender": "female",
          "name"  : "Angélica Fernandes",
          "idade" : 33 ,
          "picture" : "https://randomuser.me/api/portraits/med/women/31.jpg" 
      },
      {
          "gender": "female",
          "name"  : "Maiara Costa",
          "idade" : 60 ,
          "picture" : "https://randomuser.me/api/portraits/med/women/1.jpg" 
      },
      {
          "gender": "female",
          "name"  : "Dena Da Luz",
          "idade" : 65 ,
          "picture" : "https://randomuser.me/api/portraits/med/women/78.jpg" 
      },
      {
          "gender": "male",
          "name"  : "Esmeraldo Santos",
          "idade" : 61 ,
          "picture" : "https://randomuser.me/api/portraits/med/men/61.jpg" 
      },
      {
          "gender": "female",
          "name"  : "Lauriete Castro",
          "idade" : 63 ,
          "picture" : "https://randomuser.me/api/portraits/med/women/77.jpg" 
      },
      {
          "gender": "male",
          "name"  : "Susano Aragão",
          "idade" : 37 ,
          "picture" : "https://randomuser.me/api/portraits/med/men/19.jpg" 
      }
  ]
}

let globalUsers = [];

let numberFormat = null;
let inputName = null;

let listUsers = null;
let listIdade = null;
let listMedia = null;


window.addEventListener('load', () => {
  inputName = document.querySelector('#input_search');

  inputName.value = '';
  inputName.focus();

  listUsers = document.querySelector('#list_users');
  listIdade = document.querySelector('#list_idade');
  listMedia = document.querySelector('#list_media');

  numberFormat = Intl.NumberFormat('pt-BR');

  preventFormSubmit();
  activeInput();

  // animationSpinner();
  render(globalUsers);
});

function preventFormSubmit() {
  
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activeInput() {
  button = document.querySelector('#button_search');
  if (inputName.value.toLowerCase() === '') {
    button.classList.add('disabled');
    render([]);
  }

  async function handleTyping(event) {
    const countText = inputName.value.length;

    if (countText >= 1) {
      button.classList.remove('disabled');
    } else {
      button.classList.add('disabled');
      render([]);
    }

    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (countText >= 1) {
        
        await fetchUsers(inputName.value);
      }
    }
  }

  inputName.addEventListener('keyup', handleTyping);
}

async function fetchUsers(users) {
    
  globalUsers = dataJson.pilots.map(({ name, picture, idade, gender }) => {
    return {
       name,
       picture,
       idade,
       gender,
    };
  });
  
  globalUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const filtered = globalUsers.filter((usefilter) => {
    return usefilter.name.indexOf(users) !== -1;
  });

  if (users === 'all') {
    render(globalUsers)
  }else
    
  render(filtered);
}



function render(users) {
  renderSearchUsers(users);
  renderSearchStatistcs(users);
}

function renderSearchUsers(users) {
  listUsers.innerHTML = '';
  
  let usersElement = document.createElement('div');
  let resumeItems = document.querySelector('#filter_user');

  if (users.length === 0) {
    resumeItems.textContent = 'Nenhum Piloto Filtrado';
  } else {
    resumeItems.textContent = `${users.length} Piloto(s) encontrado(s)`;
  }

  users.forEach((user) => {
    let userDiv = document.createElement('div');
    userDiv.classList = 'user';
    
    
    const image = createPhotoThumb(user.picture, user.name);
    const info = createUserInfo(user.name, user.idade);

    userDiv.appendChild(image);
    userDiv.appendChild(info);

    usersElement.appendChild(userDiv);
  });

  listUsers.appendChild(usersElement);
}

function renderSearchStatistcs(users) {
  listIdade.innerHTML = '';
  listMedia.innerHTML = '';
 

  let statsElement = document.createElement('div');

  if (users.length !== 0) {
   
    // soma da idade de todos os pilotos
    
    const usersAgeSum = users.reduce((acc, cur) => acc + cur.idade, 0);
    
    listIdade.innerHTML = usersAgeSum;
    
    // idade média de todos os pilotos
    
    const usersAgeAvg = usersAgeSum / users.length;
    
    listMedia.innerHTML = formatNumber(usersAgeAvg.toFixed(2));
    
  }

  
}

function createPhotoThumb(src, alt) {
  const photoDiv = document.createElement('div');
  const photoImg = document.createElement('img');

  photoImg.src = src;
  photoImg.alt = alt;
  photoDiv.appendChild(photoImg);

  return photoDiv;
}

function createUserInfo(name, age) {
  const infoDiv = document.createElement('div');
  const infoSpan = document.createElement('span');

  infoSpan.textContent = `${name}, ${age} anos`;
  infoDiv.appendChild(infoSpan);

  return infoDiv;
}

function formatNumber(number) {
  return numberFormat.format(number);
}
