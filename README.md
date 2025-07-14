# SafetyHelp - Women Safety Platform

SafetyHelp is a modern, user-friendly, and visually engaging community safety platform designed with a "Universe UI" aesthetic. It focuses on empowering women by providing tools for community interaction, incident reporting, emergency assistance, and safety education, with a special emphasis on issues like harassment, consent, and the #MeToo movement.

## Features

### 1. User Authentication
*   **Registration:** Users can create new accounts with email, password, and username.
*   **Login:** Secure login for registered users.
*   **Logout:** Users can securely log out of their sessions.
*   **Email Confirmation:** Integrates with Supabase's email verification flow (configurable in Supabase settings).

### 2. Home Dashboard
*   **Personalized Welcome:** Greets logged-in users by their username.
*   **Key Safety Statistics:** Displays mock statistics like total members, safety reports, active alerts, and safety score.
*   **Platform Features Overview:** Quick access cards to main sections like Community Feed, Safety Map, Safety Knowledge, and Emergency Services.
*   **Quick Actions:** Direct buttons for activating Emergency SOS, reporting incidents, and taking the Safety Quiz.
*   **Recent Activity:** Shows a feed of recent community posts and reported incidents with sentiment and severity indicators.

### 3. Community Feed (`/community`)
*   **Post Creation:** Users can share updates, incident reports, safety tips, community announcements, and posts specifically related to "Woman Safety."
*   **Sentiment Analysis (Simulated):** Posts are analyzed for sentiment (positive, negative, neutral) and severity (high, medium, low) using a simulated external ML service.
*   **Interactive Posts:** Displays posts with author, timestamp, content, category, sentiment, and severity.
*   **Voting System:** Users can upvote and downvote posts.
*   **Category Filtering:** Filter posts by various categories (All, Community, Incident, Safety Tip, Alert, Woman Safety).

### 4. Safety Map (`/map`)
*   **Interactive Map (Placeholder):** A visual representation of incident hotspots and safe zones (map integration is a future enhancement).
*   **Safety Reports List:** Displays a list of mock safety reports with details like type, category, severity, author, date, and location.
*   **Report Filtering:** Filter reports by type (All, Incidents, Safety Tips, Alerts, Community, Woman Safety).
*   **Detailed Report View:** Clicking on a report opens a dialog with comprehensive details.

### 5. Emergency SOS (`/sos`)
*   **Activate Emergency Alert:** Users can select an emergency type (Medical, Fire, Crime/Assault, Accident, Natural Disaster, General) and add an optional message.
*   **Location Display:** Shows a mock current location with accuracy.
*   **Quick Dial Buttons:** Direct call buttons for common emergency services (Police, Fire, Ambulance, Helpline).
*   **Personal Emergency Contacts:** Displays a list of mock personal emergency contacts with a call button and an option to add new contacts.
*   **Essential Safety Tips:** Provides a list of general safety tips for emergencies.

### 6. Safety Knowledge Quiz (`/quiz`)
*   **Interactive Quiz:** A multi-question quiz designed to test knowledge on woman safety topics, including consent, harassment, child safety, #MeToo, bystander intervention, and personal safety planning.
*   **Question Progression:** Users answer questions one by one with a timer.
*   **Answer Feedback:** Provides immediate feedback on correctness and an explanation for each answer.
*   **Quiz Statistics:** Tracks total attempts, average score, and best score, persisted in local storage.
*   **Retake Option:** Allows users to retake the quiz.

### 7. Emergency Services Directory (`/emergency-services`)
*   **Quick Emergency Numbers (India):** A dedicated section for India-specific emergency helplines and their descriptions.
*   **Nearby Services Search:** Search functionality to find services by name or address.
*   **Category Filtering:** Filter services by categories such as Police Stations, NGOs (Women Safety), Hospitals, Crisis Helplines, Legal Aid, and Shelters.
*   **Service Details:** Displays mock service details including name, category, address, distance, open status, and rating.
*   **Call & Directions:** Buttons to simulate calling the service and getting directions.

### 8. Responsive Navigation
*   **Desktop Navigation:** A clear navigation bar with links to all main sections.
*   **Mobile Navigation:** A responsive hamburger menu (`Sheet` component) for smaller screens, providing access to all navigation links and user authentication options.

## Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **UI Library:** React.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Components:** shadcn/ui
*   **Icons:** Lucide React
*   **Authentication & Database:** Supabase
*   **Sentiment Analysis:** Python (simulated via an external ML service API call)
*   **AI Integration:** AI SDK (for potential future integrations, currently uses a mock external ML service endpoint)

## Setup Instructions

To run this project locally, follow these steps:

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-url>
    cd safetyhelp-platform
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up Supabase:**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Go to `Project Settings` > `API` to find your `Project URL` and `Anon Key`.
    *   Set up your environment variables:
        \`\`\`bash
        # In your Vercel project settings or local .env.local file
        NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
        NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        \`\`\`
    *   **Database Schema:** You will need a `community_posts` table in Supabase. Here's a basic SQL schema:
        \`\`\`sql
        CREATE TABLE community_posts (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          author_username TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          sentiment TEXT,
          severity TEXT,
          upvotes INTEGER DEFAULT 0,
          downvotes INTEGER DEFAULT 0
        );
        \`\`\`
    *   **Email Confirmation:** By default, Supabase requires email confirmation. If you want users to log in immediately after registration (less secure), you can disable "Email Confirmations" in your Supabase project's Authentication Settings.

4.  **ML Service Endpoint:**
    The sentiment analysis feature calls an external ML service. In `app/api/analyze-sentiment/route.ts`, the placeholder URL `https://your-deployed-ml-service.com/analyze` is used. For a functional sentiment analysis, you would need to deploy your `scripts/sentiment_analyzer.py` or a similar ML model to a serverless function or a dedicated service and update this URL. The current implementation includes a fallback keyword-based sentiment analysis if the external call fails.

## Running the Project

To run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is designed for deployment on Vercel. Ensure your Supabase environment variables are configured in your Vercel project settings.

## Future Enhancements

*   **Real Map Integration:** Integrate a live map service (e.g., Google Maps, Mapbox) to display incident hotspots and safe zones dynamically.
*   **Push Notifications:** Implement real-time push notifications for emergency alerts and community updates.
*   **User Profiles:** Develop comprehensive user profiles where users can manage their data, view their posts, and track their quiz progress.
*   **Commenting Feature:** Add a commenting system to community posts.
*   **Post Editing/Deletion:** Allow users to edit or delete their own community posts.
*   **Advanced Search & Filtering:** Enhance search capabilities across all sections.
*   **Admin Dashboard:** Create an admin interface for content moderation and user management.
*   **Real-time SOS:** Implement actual SOS dispatching to emergency contacts or services.
*   **Accessibility Improvements:** Further enhance accessibility features across the platform.
