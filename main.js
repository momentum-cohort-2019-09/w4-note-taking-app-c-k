// Your application is a note-taking app. It should display a list of all your notes and give you the ability to create new notes, edit old notes, and delete notes. Notes are made up of a title, text, optional tags, and the date/time most recently updated.

// {
// 	"username": "kc",
// 	"password": "pass"
// }

// listAllNotes

// newNote

// editNote

// deleteNote

// note:
//     title:
//     text:
//     tags:

const app = {

    data: {
        credentials: {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
        },
        notes: []
    },

    setCredentials: function(username, password) {
        this.data.credentials = {
            username: username,
            password: password
        }
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
    },

    addAuthHeader: function(headers) {
        if (!headers) { headers = {} }
        return Object.assign({}, headers, {
            'Authorization': 'Basic ' + btoa(`${app.data.credentials.username}:${app.data.credentials.password}`)
        })
    },

    login: function(username, password) {
        fetch('https://notes-api.glitch.me/api/notes', {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
                }
            })
            .then(response => {
                if (response.ok) {
                    this.setCredentials(username, password)
                    this.render()
                } else {
                    document.getElementById('login-error').innerText = 'That is not a valid username and password.'
                }
            })
    },

    retrieveNotes: function() {
        // console.log (username, password)
        return fetch('https://notes-api.glitch.me/api/notes', {
                headers: app.addAuthHeader()
            })
            .then(response => response.json())
            .then(notesData => {
                this.data.notes = notesData.notes
            })
            .catch(error => {})
    },

    addNote: function(title, text) {
        return fetch('https://notes-api.glitch.me/api/notes', {
            method: 'POST',
            body: JSON.stringify({"title": title, "text": text}),
            headers: this.addAuthHeader({
                'Content-Type': 'application/json'
              })
        })
        .then(response => {})
        .catch(error => {})
    },

    deleteNote: function(noteId) {
        let deleteLink = "https://notes-api.glitch.me/api/notes/" + noteId
        console.log(deleteLink)
        return fetch(deleteLink, {
            method: 'DELETE',
            headers: this.addAuthHeader({
                'Content-Type': 'application/json'
              })
        })
        .then(response => {})
        .catch(error => {})
    },

    notesToHTML: function(note) {
        return `
    <div class ="note">
      
      <div class = "title">
        Title: ${note.title}
      </div>
      
      <div class = "noteText">
        Text: ${note.text}
      </div>

      <div class = "tags">
        Tags: ${note.tags}
      </div>
      <div class ="timestamp">
        Timestamp: ${note.updated}
      </div>
      <button class ="delete" id="${note._id}" >Delete</button>
    </div>
  `
    },

    // onclick = "deleteNote(${note._id})"

    renderNotes: function() {
        console.log(this.data.notes)
        // document.getElementById('notes').innerHTML = document.getElementById('notes').innerHTML + this.data.notes.map(this.notesToHTML).join('\n')
        document.getElementById('notes').innerHTML = this.data.notes.map(this.notesToHTML).join('\n')
        console.log('render notes')
    },


    render: function() {
        if (!this.data.credentials.username || !this.data.credentials.password) {
            showLoginForm()
        } else {
            console.log('hide login form')
            hideLoginForm()
            this.retrieveNotes().then(() => this.renderNotes())
        }
    }
}

function showLoginForm() {
    document.getElementById('login-form').classList.remove('hidden')
    document.getElementById('notes').classList.add('hidden')
    document.getElementById('notes-form').classList.add('hidden')
}

function hideLoginForm() {
    document.getElementById('login-form').classList.add('hidden')
    document.getElementById('notes').classList.remove('hidden')
    document.getElementById('notes-form').classList.remove('hidden')
}


function main() {

    app.render()

    const loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault()
        const formData = new FormData(loginForm)
        const username = formData.get('username')
        const password = formData.get('password')
        app.login(username, password)
    })

    const notesForm = document.querySelector('#notes-form')
    notesForm.addEventListener('submit', function(event) {
        event.preventDefault()
        const notesFormData = new FormData(notesForm)
        const title = notesFormData.get('title')
        const text = notesFormData.get('note-text')
        // app.login(username, password)
        console.log(title, text)
        app.addNote(title,text)
        app.retrieveNotes()
        app.render()
    })

    const deleteBtn = document.getElementById('notes')
    deleteBtn.addEventListener('click', function (event) {
        event.preventDefault()
        const noteId = event.target.id
        console.log(noteId)
        app.deleteNote(noteId)
        app.retrieveNotes()
        app.render() 
    })

    // document.getElementById('delete').addEventListener('click', (event) => {
    //     event.preventDefault()


    // })

}

main()