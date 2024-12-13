# Event Calendar App
A dynamic and responsive event calendar application built using Next.js and Tailwind CSS. This app allows users to view, add, edit, delete, and filter events in an intuitive calendar interface. The data persists across page refreshes using localStorage.
## Features
### Calendar View
- Displays a monthly grid with all days properly aligned.
- Highlights the current day and selected day visually.
- Allows navigation between months using "Previous" and "Next" buttons.
### Event Management
- Add events by clicking on a day.
- Edit or delete existing events.
- Each event includes:
  - Event name
  - Start and end time
  - Optional description
- Prevents overlapping events by validating time ranges.
### Event List
- Displays a list of events for the selected day in a modal.
- Supports filtering events by keyword.
### Data Persistence
- Events are stored in localStorage to persist data across page refreshes.
## Installation and Usage
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
### Steps to Run Locally
1. Clone the Repository
   ```bash
   git clone https://github.com/Diparya/event-calendar.git
   cd event-calendar
2. Install Dependencies
   ```bash
   npm install
   # or
   yarn install
3. Start the Development Server
   ```bash
   npm run dev
   # or
   yarn dev
4. Open the App Navigate to http://localhost:3000 in your web browser.
   
