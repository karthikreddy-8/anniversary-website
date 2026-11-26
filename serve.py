import http.server
import socketserver
import webbrowser
import os

PORT = 5173
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print(f"================================================================")
print(f"  Ashok ❤️ Hemalatha Wedding Anniversary Celebration Website")
print(f"================================================================")
print(f"  Local URL: http://localhost:{PORT}")
print(f"  Serving files from: {DIRECTORY}")
print(f"  Press Ctrl+C to stop the server anytime.")
print(f"================================================================")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gracefully stopped.")
