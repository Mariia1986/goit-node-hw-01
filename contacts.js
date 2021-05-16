const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      return console.table(contacts);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const findContacts = contacts.find(
        (el) => el.id.toString() === contactId.toString()
      );

      return console.table(findContacts);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const deleteContacts = contacts.filter(
        (el) => el.id.toString() !== contactId.toString()
      );
      changeContact(contactsPath, contacts);
      return console.table(deleteContacts);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = { id: uuidv4(), name, email, phone };

      const addContacts = [...contacts, newContact];
      changeContact(contactsPath, addContacts);

      return console.table(addContacts);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function changeContact(path, arr) {
  const contacts = JSON.stringify(arr, null, 2);
  fs.writeFile(path, contacts, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
