# Sna3ti: A Marketplace for Local Crafts

Welcome to **Sna3ti**, a unique e-commerce platform developed by Marouane Benabdelkader and Mesbahi. 
This marketplace is dedicated to elevating local artisans by providing a digital space for them to display and sell their handcrafted products. Sna3ti offers an easy-to-use platform for customers to discover and purchase unique crafts, with features like integrated ratings, tracking, and a simplified purchasing process via WhatsApp. 
Join us in celebrating and supporting the artistry of local craftsmanship.


## Architecture

Below is the architecture diagram of Sna3ti, illustrating the core entities and their relationships within the platform:


![use case-class diagramme drawio (2)](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/9c55c08e-35f6-4f47-95c4-e96aa047dc11)



- `User`: The base entity representing all users of the system.
- `PhoneNumber`: A sub-entity of User that holds phone number information.
- `Admin`: A specialized user with administrative privileges.
- `Customer`: Represents customers who can purchase handicrafts and follow artisans.
- `HandiCraft`: The entity representing the handicrafts available on the platform.
- `Item`: The individual items for sale.
- `Rate`: Represents the ratings given by customers to items or artisans.
- `Following`: Captures the relationship between customers and the artisans they follow.

This structure ensures a modular and scalable approach to managing the various aspects of the e-commerce experience on Sna3ti.

## Site Navigation

The flowchart below outlines the user journey through the Sna3ti platform, highlighting the navigation paths and available features for different user roles:

![Websit_nav](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/151f4f5e-9268-41b5-9df5-d4aadd50f03e)


### Key Sections:

- **Index**: The starting point of the website, directing users to various sections such as Home, Registration, Products, Handicrafts, About Us, and Contact Us.

- **Home**: A welcoming page that leads to the Login section for existing users or Registration for new users.

- **Client Space**: After logging in, clients can access their Account, Profile, Settings, and view their Favorite products, Products purchased, and Handicrafts followed.

- **Handicraft Space**: Artisans have a dashboard where they can manage their Profile, publish, archive, update, or delete products.

- **Admin**: Upon logging in, an admin will have access to a dashboard to manage new Handicrafts, Products, Clients, and more.

Each path is designed to create an intuitive and efficient experience for users, whether they are customers looking to explore and purchase handicrafts or artisans and admins managing the offerings and operations of the marketplace.


## Technical Architecture

The Sna3ti platform is built with a robust and scalable technical architecture, ensuring a seamless user experience from frontend to backend. Here is a brief overview of our system design:

![Architecture](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/e531363f-085c-4071-8595-a8d618fa0d8c)

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

![268816550-764beb9d-9d2b-4640-9dcb-e9523db71a90](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/0bf2e1e7-afbc-4840-9d30-03bfec938964)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/edfb571f-352a-43f2-a388-b3267b771f6d)

![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/614a0a3d-0504-4f23-8ed3-47cbe2c11e01)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/3df122a6-542a-4c3f-a643-174ba9462cd7)

![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/4d2ab08b-0f86-49da-adcb-b75c400f7994)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/63584a84-f333-47e5-9ce5-e6406cbdb649)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/436a9796-ce0f-4667-accc-0c5cbf0cdf0c)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/d1dccb4c-e4b2-48c2-b6b3-3b96431822a3)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/aa3a6a7b-97b7-4ec9-b555-8f78688bac1d)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/ad89194b-b3b1-4da7-8625-4c04549e2f3b)

![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/37600412-5e70-447f-9297-c0eb9ac2cc67)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/61ab270c-6703-4235-a03d-0104817a207a)
![image](https://github.com/MarouaneBenabdelkader/sa3ti-Marketplace/assets/116631044/00253a75-ff90-4c87-9901-8e5b7bce7a9b)
