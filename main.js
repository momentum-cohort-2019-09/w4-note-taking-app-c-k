// Your application is a note-taking app. It should display a list of all your notes and give you the ability to create new notes, edit old notes, and delete notes. Notes are made up of a title, text, optional tags, and the date/time most recently updated.

// {
// 	"username": "kc",
// 	"password": "pass"
// }

listAllNotes

newNote

editNote

deleteNote

note:
    title:
    text:
    tags:

const app = {

  data: {
    credentials: {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    },
    notes: []
  },

  setCredentials: function (username,password) {
    this.data.credentials = {
      username: username,
      password: password
    }
    sessionStorage.setItem('username',username)
    sessionStorage.setItem('username',username)
  },


  render: function () {
    if (!this.data.credentials.username) || !this.data.credentials.password) {
      showLoginForm()
    }
  }
}

function showLoginForm () {
  document.getElementById('login-form')
}

function main(){

  app.render()

  const
}

main()