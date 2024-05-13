# Headless CMS - Basic CRUD Functionality

Welcome to the rudimentary headless CMS! This project provides extremely basic CRUD functionality, allowing you to manage entities and their attributes through a simple frontend interface. 

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Ensure you have Node.js and MySQL installed.
3. Install project dependencies by running `npm install`.
4. Set up your MySQL database. You can configure the connection details in the `config.js` file.
5. Run the backend server by executing `npm run server`.
6. Run the frontend application by executing `PORT=3001, npm start`.

## Functionality

### Entity Management

- Create entities with different attributes and their types.
- Automatically generate table definitions in MySQL based on entity attributes.
- Automatica![Screenshot from 2024-05-13 12-35-20](https://github.com/AtulRajput01/CMS/assets/92659293/cede41bc-7f33-414b-959d-3a024e0431ed)

### CRUD Operations

- **Create:** Add new entries to an entity with specified attribute values.
- **Read:** View existing entries for each entity.
- **Update:** Modify existing entries with new attribute values.
- **Delete:** Remove entries from an entity.


## Usage

### Creating Entities

1. Navigate to the frontend interface.
2. Click on the "Create Entity" button.
3. Specify the entity name and its attributes along with their types.
4. Save the entity, which will automatically create a corresponding table in the MySQL database.
![Screenshot from 2024-05-13 12-39-04](https://github.com/AtulRajput01/CMS/assets/92659293/11d4770c-71f2-492e-aad1-e85070ce3f45)


### Managing Data

1. Select an entity from the list.
2. Perform CRUD operations as needed:
   - **Create:** Click on the "Add Entry" button, fill in the attribute values, and save.
   - **Read:** View existing entries in the table.
   - **Update:** Click on an entry to edit its attribute values and save changes.
   - **Delete:** Remove an entry by selecting it and clicking on the delete button.
![Screenshot from 2024-05-13 12-40-58](https://github.com/AtulRajput01/CMS/assets/92659293/dad43749-37c7-486c-8b3b-4c4e28ac9054)

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MySQL

## Contributors

- [Atul Rajput](https://github.com/AtulRajput/CMS)

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** Replace `Atul Rajput` and `AtulRajput01` with your actual name or GitHub username, and update the license file if necessary. Happy coding! 🚀
