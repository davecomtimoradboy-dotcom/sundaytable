# Sunday Table: React + Flask

The website has two parts:

- `frontend/` is the React page visitors see.
- `app.py` is the Flask server. It sends the menu to React at `/api/dishes` and receives the contact and reservation form submissions.

## Start it in VS Code

1. Open this whole folder in VS Code.
2. In the terminal, start Flask with `py app.py` and leave that terminal running.
3. Open a second terminal, move into the frontend folder with `cd frontend`, then install the JavaScript packages once with `npm install`.
4. Start the React page with `npm run dev`.
5. Open the address Vite prints, usually `http://localhost:5173`.

The browser page is React. When React asks for the menu, Vite passes that request to Flask. Flask returns the menu as JSON, and React turns it into food cards. The forms also send their answers to Flask. For now Flask replies with a demo confirmation; it does not email anyone or save reservations.
