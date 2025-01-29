import requests
import folium
import webbrowser
import os

# Replace with your actual Google API Key
API_KEY = "AIzaSyBbIlXENXBUtRJFGTSUzLkdHI95u3wsF8E"

def get_live_location():
    url = f"https://www.googleapis.com/geolocation/v1/geolocate?key={API_KEY}"
    data = {"considerIp": True}  # Uses IP address for location

    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        location = response.json()["location"]
        return location["lat"], location["lng"]
    else:
        print("Error:", response.json())
        return None, None

def generate_map(lat, lng):
    # Create a map centered at the given coordinates
    location_map = folium.Map(location=[lat, lng], zoom_start=15)

    # Add a marker for the live location
    folium.Marker(
        [lat, lng],
        popup="You are here!",
        tooltip="Current Location",
        icon=folium.Icon(color="blue", icon="cloud"),
    ).add_to(location_map)

    # Save the map as an HTML file
    map_file = "live_location_map.html"
    location_map.save(map_file)

    # Open the map in a browser
    webbrowser.open("file://" + os.path.abspath(map_file))

if __name__ == "__main__":
    lat, lng = get_live_location()
    if lat and lng:
        print(f"Live Location: Latitude: {lat}, Longitude: {lng}")
        generate_map(lat, lng)
    else:
        print("Could not retrieve location.")