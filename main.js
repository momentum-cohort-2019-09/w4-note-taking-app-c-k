// Your application is a note-taking app. It should display a list of all your notes and give you the ability to create new notes, edit old notes, and delete notes. Notes are made up of a title, text, optional tags, and the date/time most recently updated.

listAllNotes

newNote

editNote

deleteNote

note:
    title:
    text:
    tags:

const app = {
    {
        data: {
          credentials: {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
          },
          notes: []
        },
}