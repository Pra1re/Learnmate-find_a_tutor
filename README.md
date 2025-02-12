
#  LearnMate:  Empowering Seamless Learning and Collaboration
LearnMate is a platform designed to enhance education by fostering collaboration, simplifying complex concepts, and bridging the gap between students and knowledge. Whether it's interactive learning, peer-to-peer guidance, or innovative tools, LearnMate equips users with everything they need to succeed in their educational journey.




## Live link

To Check this project out Visit

```http
https://darling-treacle-5be5de.netlify.app/
```


## Documentation

[Documentation](assignment-category-14.pdf)


# API Reference

This API fetches and manipulates data stored in a MongoDB database. The data is hosted using a Node.js server.



#### Base URL
https://assignment-11-server-five-xi.vercel.app/



## Endpoints

### 1. Get All Items
- **URL:** `/data`
- **Method:** `GET`
- **Description:** Fetch all items from the database.
- **Response Example:**
    ```json
    [
        {
        "_id": "676d1943ffc6189cf55fe173",
        "name": "Maria Lopez",
        "verified": true,
        "rating": 5,
        "description": "Amazing experience learning Spanish! Highly recommended."
        ....
    },
    {
        "_id": "676d1943ffc6189cf55fe174",
        "name": "John Smith",
        "verified": false,
        "rating": 4,
        "description": "Great tutor! Helped me improve my English fluency."
        .....
    },
    ]
    ```

---

### 2. Get Item by ID
- **URL:** `/data/:id`
- **Method:** `GET`
- **Description:** Fetch a single item using its unique ID.
- **Path Parameter:**
    - `id` (String): The ID of the item.
- **Response Example:**
    ```json
    {
        "_id": "676d1943ffc6189cf55fe173",
        "name": "Maria Lopez",
        "verified": true,
        "rating": 5,
        "description": "Amazing experience   learning Spanish! Highly recommended."
        .....
    }
    ```

---

### 3. Add New Item
- **URL:** `/data`
- **Method:** `POST`
- **Description:** Add a new item to the database.
- **Request Body Example:**
    ```json
    {
        "name": "Maria Lopez",
        "image": "https://example.com/images/spanish.jpg",
        "language": "Spanish",
        "description": "Learn Spanish for travel, work, or casual conversation.",
        "price": 40,
        .......
    }
    ```
- **Response Example:**
    ```json
    {
        message:"item updated successfully"
        "_id": "67681a23ffc6189cf55fd87a",
        "name": "Maria Lopez",
        "image": "https://example.com/images/spanish.jpg",
        "language": "Spanish",
        "description": "Learn Spanish for travel, work, or casual conversation.",
        "price": 40,
        ......
    }
    ```

---

### 4. Update an Item
- **URL:** `/data/:id`
- **Method:** `PUT`
- **Description:** Update an existing item by its ID.
- **Path Parameter:**
    - `id` (String): The ID of the item.
- **Request Body Example:**
    ```json
    {
        "_id": "67681a23ffc6189cf55fd87a",
        "name": "Maria Lopez",
        "image": "https://example.com/images/spanish.jpg",
        "language": "Spanish",
        "description": "Learn Spanish for travel, work, or casual conversation.",
        "price": 40,
        "tutorEmail": "spanishtutor@example.com",
        "activeSession": true,
        "lessonsCompleted": "25",
        "duration": "3 months",
        "rating": 4.8,
        "maxStudents": "25",
        "level": "Beginner",
        "review": 3,
        "booked": false
    }
    ```
- **Response Example:**
    ```json
    {
        
        "_id": "67681a23ffc6189cf55fd87a",
        "name": "Maria Lopez",
        "image": "https://example.com/images/spanish.jpg",
        "language": "English",
        "description": "Learn English for travel, work, or casual conversation.",
        "price": 40,
        "tutorEmail": "Englishtutor@example.com",
        "activeSession": true,
        "lessonsCompleted": "25",
        "duration": "3 months",
        "rating": 4.8,
        "maxStudents": "25",
        "level": "Beginner",
        "review": 3,
        "booked": false
    
    }
    ```



## Technologies Used

- **MongoDB**: Used as the database to host website data, providing flexible and scalable access to structured and semi-structured data.

- **Firebase**: Leveraged Firebase for efficient and secure authentication management, ensuring a seamless user login and registration experience.


- **Custom Node.js Server**: Built a tailored Node.js server to handle API requests, manage data interactions with MongoDB, and provide a robust backend for smooth client-server communication.

- **React**: JavaScript library for building user interfaces, providing reusable components for the application.

- **React Hooks (useState, useEffect)**: Utilized for managing component state and side effects, enhancing dynamic interactions.

- **React Router**: Seamlessly navigate across multiple pages in your app without reloading, making each interaction feel smooth and intuitive for users.

- **React DOM**: The bridge between React and the browser, allowing React to efficiently update and render UI components in response to state changes. It makes your app interactive by managing the DOM elements that users see and interact with.

- **React Toastify**: Used for displaying toast notifications for actions log in ,log out.

- **JavaScript (ES6)**: Core language for implementing business logic, API fetching, and event handling.

- **HTML5 & CSS3**: Structure and styling of components, with responsive design tailored through Tailwind CSS.

- **Tailwind CSS**: Utility-first CSS framework to style components with ease and efficiency.


- **Axios**: Asynchronous data fetching from mongodb through node.js server to dynamically load product data.

- **Context API**: Manage and share global state across components, allowing seamless access to gadget data and user preferences without prop drilling.


- **Motion Div**: Add fluid, visually appealing animations to your web components with ease, creating dynamic and engaging user interfaces that captivate attention and enhance the overall user experience.

- **JWT (JSON Web Token)**: Securely transmit information between parties as a compact, self-contained token, enabling user authentication and authorization in modern web applications.

- **Token Verification**: Ensure the integrity and authenticity of JWTs by verifying their signatures and claims, providing a robust layer of security for protecting sensitive user data and resources.



## Features

- **Motion div**: Animation library is used to make a beautiful sliding animation in Banner section.


- **Structured Navigation Bar**: The site features a user-friendly, responsive navbar that includes essential menu items like Home,Become a tutor,mytutor etc.

- **Dynamic Category section**: Category section displays tutor categories in a clean grid layout, with cards showcasing trademark icon of every country,name and an arrow to guide you to desired page.


- **Toast Notifications**: Inform users when they log in or log out ,makes the experience interactive and informative.


- **404 Page Handling**: A custom 404 error page ensures that users are notified if they try to navigate to an unavailable route or resource, improving site navigation.

- **Dynamic Page Titles**: The website dynamically changes the page title based on the active route, providing users with contextual information.

- **Private Routing**: Restrict access to specific pages based on user authentication status, ensuring only logged-in users can view protected routes.

- **Dark Mode Toggle**: Enable users to switch seamlessly between light and dark themes directly from the navbar, enhancing accessibility and personalizing the user experience.
 
- **Responsive Design**: Craft flexible layouts that adapt flawlessly to any screen size or device, delivering a consistent and user-friendly experience across desktops, tablets, and smartphones.

