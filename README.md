# Property Management App - Frontend

This repository contains the frontend part of a property management application built with Next.js. The application allows users to manage their properties, including updating profiles, listing properties, and favoriting properties.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration for users.
- **Profile Management**: Users can update their profiles, including their profile picture and description.
- **Property Listings**: Users can view and manage their properties, including adding new properties and marking favorites.
- **Responsive Design**: The app is designed to work seamlessly on both mobile and desktop devices.
- **Skeleton UI**: Loading states with skeleton screens for a smooth user experience.
- **Error Handling**: Informative error messages displayed for failed actions.

## Installation

To get started with this project, you will need to have Node.js installed on your machine.

### Step 1: Clone the Repository

```bash
git clone https://github.com/hlyudzyk/djangobnb.git
cd djangobnb
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory and add the necessary environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_SOME_KEY=your_key_here
```

### Step 4: Running the Application

To run the application in development mode, use:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Step 5: Build for Production

To build the application for production, use:

```bash
npm run build
npm run start
```

The app will be available at `http://localhost:3000`.
## Usage

### Profile Management

- **Viewing Profile:** Navigate to the `/account` page to view your profile.
- **Updating Profile:** Change your profile picture, name, and description. The form state tracks the submission status and shows success or error messages.

### Property Management

- **Viewing Properties:** Properties can be viewed on the main dashboard.
- **Marking Favorites:** Mark properties as favorites to keep track of them.
- **Responsive Design:** The app adjusts to different screen sizes, making it easy to use on mobile and desktop.

## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Type safety and modern JavaScript features.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Hooks**: For managing state and side effects.

## Contributing

Contributions are welcome! If you have suggestions or bug reports, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
```
