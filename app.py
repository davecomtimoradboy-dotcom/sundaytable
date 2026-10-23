from flask import Flask, jsonify, request

app = Flask(__name__)

# Flask provides the food information as JSON for the React page.
DISHES = [
    {
        "id": 1,
        "name": "Garden pizza",
        "category": "OVEN FAVORITE",
        "description": "Tomato, basil, and melty mozzarella on a crisp crust.",
        "price": 14,
        "emoji": "🍕",
        "color": "peach",
    },
    {
        "id": 2,
        "name": "Sunny grain bowl",
        "category": "FRESH & BRIGHT",
        "description": "Roasted veggies, grains, greens, and lemony dressing.",
        "price": 12,
        "emoji": "🥗",
        "color": "green",
    },
    {
        "id": 3,
        "name": "Berry cake",
        "category": "A SWEET FINISH",
        "description": "Soft vanilla cake topped with berries and cream.",
        "price": 8,
        "emoji": "🍰",
        "color": "yellow",
    },
]


@app.route("/api/dishes")
def dishes():
    return jsonify(DISHES)


@app.route("/api/contact", methods=["POST"])
def contact():
    form = request.get_json(silent=True) or {}
    name = str(form.get("name", "")).strip()
    email = str(form.get("email", "")).strip()
    message = str(form.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"message": "Please fill in every field."}), 400

    return jsonify({
        "message": f"Thanks, {name}! This demo received your message, but it does not send email yet."
    })


@app.route("/api/reservations", methods=["POST"])
def reservations():
    form = request.get_json(silent=True) or {}
    name = str(form.get("name", "")).strip()
    date = str(form.get("date", "")).strip()
    time = str(form.get("time", "")).strip()
    guests = str(form.get("guests", "")).strip()

    if not name or not date or not time or not guests:
        return jsonify({"message": "Please fill in every field."}), 400

    return jsonify({
        "message": f"Thanks, {name}! This demo received your request, but the table is not actually booked."
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
