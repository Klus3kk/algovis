# algovis

**AlgoVis** is an interactive web application aimed at demonstrating the internal workings of popular algorithms. This project is designed for students, engineers, and anyone interested in understanding how algorithms operate under the hood. With real-time visualizations, users can experience algorithms step-by-step, seeing how they process input data to reach solutions. 

## **Features:**
- **Algorithm Categories**: Supports various types of algorithms:
  - **Sorting Algorithms**: Bubble Sort, Quick Sort, Merge Sort, etc.
  - **Pathfinding Algorithms**: A* Search, Dijkstra.
  - **Graph Algorithms**: DFS, BFS.
- **Real-Time Statistics Panel**: Displays key execution metrics like comparisons, swaps, and steps as the algorithm processes.
- **Dynamic Explanations**: Offers real-time descriptions of the algorithm’s current step, providing educational insights as the visualization runs.
- **Customizable Inputs**: Users can adjust parameters like array size and algorithm speed using sliders.
- **Dark/Light Mode**: Fully responsive UI with a theme switcher.

## **Tech Stack:**
- **Frontend**: 
  - **Next.js** for server-side rendering and performance.
  - **D3.js** for interactive data visualizations.
  - **Tailwind CSS** for responsive and modern styling.
- **Backend**: 
  - **Node.js** with **Express** for backend services.
  - **PostgreSQL** for saving user preferences and algorithm history.
- **CI/CD**: 
  - Automated pipelines with **GitHub Actions** for continuous integration and deployment.
  - Deployment on **Vercel** for fast and easy hosting.
- **Docker**: Containerization of the PostgreSQL database for consistent and isolated development environments.

## **Usage:**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Klus3kk/algovis.git
   cd algovis
   ```

2. **Set up Docker (PostgreSQL)**:
   - **Start the PostgreSQL container**:
     ```bash
     docker-compose up -d
     ```
   - To stop and remove the container:
     ```bash
     docker-compose down
     ```

3. **Install Dependencies**:
   - Navigate to the `frontend` and `backend` directories and install the dependencies:
     ```bash
     cd frontend
     npm install
     cd ../backend
     npm install
     ```

4. **Run Locally**:
   - **Frontend**:
     ```bash
     npm run dev
     ```
   - **Backend**:
     ```bash
     node server.js
     ```

5. **Deploy with Vercel**:
   - You can deploy the frontend directly on Vercel with:
     ```bash
     vercel --prod
     ```

6. **Testing and CI/CD**:
   - **GitHub Actions** handles automated testing and deployment. Simply push to the `main` branch to trigger the pipeline.

---

## **Docker Commands Overview**
- **Build the Project with Docker**:
  ```bash
  docker build -t algovis .
  ```

- **Run the Project in Docker**:
  ```bash
  docker run -p 3000:3000 -d algovis
  ```

- **Docker-Compose** to orchestrate services:
  ```bash
  docker-compose up
  ```

- **Shut Down Containers**:
  ```bash
  docker-compose down
  ```
