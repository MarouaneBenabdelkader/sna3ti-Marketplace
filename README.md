# Sna3ti: A Marketplace for Local Crafts

Welcome to **Sna3ti**, a unique e-commerce platform developed by Marouane Benabdelkader and Messbahi. 
This marketplace is dedicated to elevating local artisans by providing a digital space for them to display and sell their handcrafted products. Sna3ti offers an easy-to-use platform for customers to discover and purchase unique crafts, with features like integrated ratings, tracking, and a simplified purchasing process via WhatsApp. 
Join us in celebrating and supporting the artistry of local craftsmanship.


## Architecture

Below is the architecture diagram of Sna3ti, illustrating the core entities and their relationships within the platform:


![use case-class diagramme drawio (2)](https://github.com/MarouaneBenabdelkader/sna3ti/assets/116631044/ec2296cd-9927-4d40-b203-de40258d19ac)



- `User`: The base entity representing all users of the system.
- `PhoneNumber`: A sub-entity of User that holds phone number information.
- `Admin`: A specialized user with administrative privileges.
- `Customer`: Represents customers who can purchase handicrafts and follow artisans.
- `HandiCraft`: The entity representing the crafts available on the platform.
- `Item`: The individual items for sale.
- `Rate`: Represents the ratings given by customers to items or artisans.
- `Following`: Captures the relationship between customers and the artisans they follow.

This structure ensures a modular and scalable approach to managing the various aspects of the e-commerce experience on Sna3ti.

## Site Navigation

The flowchart below outlines the user journey through the Sna3ti platform, highlighting the navigation paths and available features for different user roles:

![Websit_nav](https://github.com/MarouaneBenabdelkader/sna3ti/assets/116631044/f5369e70-fc16-45ea-9575-71a3e271908e)


### Key Sections:

- **Index**: The starting point of the website, directing users to various sections such as Home, Registration, Products, Handicrafts, About Us, and Contact Us.

- **Home**: A welcoming page that leads to the Login section for existing users or Registration for new users.

- **Client Space**: After logging in, clients can access their Account, Profile, Settings, and view their Favorite products, Products purchased, and Handicrafts followed.

- **Handicraft Space**: Artisans have a dashboard where they can manage their Profile, publish, archive, update, or delete products.

- **Admin**: Upon logging in, an admin will have access to a dashboard to manage new Handicrafts, Products, Clients, and more.

Each path is designed to create an intuitive and efficient experience for users, whether they are customers looking to explore and purchase handicrafts or artisans and admins managing the offerings and operations of the marketplace.


## Technical Architecture

The Sna3ti platform is built with a robust and scalable technical architecture, ensuring a seamless user experience from frontend to backend. Here is a brief overview of our system design:

![Architecture](https://github.com/MarouaneBenabdelkader/sna3ti/assets/116631044/f8747170-633a-4a01-8e51-15ec9aa27572)

### Frontend

- **User Interface**: Crafted with the Next.js framework, the frontend provides a dynamic and responsive user interface that adapts to various devices and screen sizes.
- **Browser**: Users interact with the application through any modern web browser, engaging with the Next.js-generated pages.

### Backend

- **Next.js**: Serving both as part of the frontend and backend, Next.js handles server-side rendering and API routes.
- **Controllers**: Our RESTful API, built with Node.js, allows for effective communication between the frontend and the database.
- **Mongoose**: This MongoDB object modeling tool facilitates schema design and data interaction for our MongoDB Atlas database.
- **MongoDB Atlas**: Our chosen database service provides a flexible and scalable cloud-based solution for storing and managing application data.
- **Redis**: Utilized for caching improving the performance of database-driven operations.

This architecture diagram visually represents the flow of data and interactions across the platform, ensuring all components work together harmoniously to deliver a top-notch e-commerce experience.

