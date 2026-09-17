from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import qrcode
import io
import uuid

app = Flask(__name__)
CORS(app) # باش يخلي React يهضر معاه

# ذاكرة مؤقتة (من بعد غادي نبدلوها بـ Database)
links_db = {}

@app.route('/')
def home():
    return jsonify({"message": "LinkHub Pro API is running 🔥"})

# 1. API باش يقصر الرابط
@app.route('/api/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    original_url = data.get('url')
    if not original_url:
        return jsonify({"error": "URL is required"}), 400

    short_id = str(uuid.uuid4())[:6]
    links_db[short_id] = original_url
    return jsonify({"short_id": short_id, "short_url": f"/{short_id}"})

# 2. API باش يصاوب QR
@app.route('/api/qr', methods=['GET'])
def generate_qr():
    text = request.args.get('text')
    if not text:
        return jsonify({"error": "text is required"}), 400

    qr = qrcode.make(text)
    img_io = io.BytesIO()
    qr.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)