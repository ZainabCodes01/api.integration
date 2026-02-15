import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";

type IPData = {
    ip: string;
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
    connection?: { org: string };
};

export default function IPData() {
    const [ip, setIp] = useState("");
    const [data, setData] = useState<IPData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValid = (ip: string) => {
        const Regex =
            /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
        return Regex.test(ip);
    };


    const fetchIPData = async () => {
        setError("");
        setLoading(true);
        if (isValid(ip)) {
            const response = await axios.get(`https://ipwho.is/${ip}`);

            if (response.data.success) {
                setError("");
                setData(response.data)
                toast.success(response.data.message);
            }
            else {
                setData(null);
                toast.error(response.data.message)
            }
        }
        else {
            setError("IP is not valid")
        }
        setLoading(false);
    };



    return (
            <div className="bg-cover bg-center min-h-screen flex items-center justify-center p-10 bg-[url('/Images/World-Bg.jpg')]">
            <div className="w-full max-w-6xl">
                <div className="relative grid md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-md rounded-2xl ">
                
                    <h2 className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-bold text-sky-300">
                        🌍 IP Tracker
                    </h2>
                    <div className="p-10 text-white flex flex-col justify-center">

                        <input
                            type="text"
                            placeholder="Enter IP address (e.g. 8.8.8.8)"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            className={`p-3 rounded-lg border bg-white/10 text-white placeholder-gray-300 mt-10 ${error ? "border-red-400" : "border-sky-400"}`}
                            
                        />
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-300">{error}</p>}

                        <div className="mt-5 flex gap-3">
                            <button
                                onClick={fetchIPData}
                                className="px-4 py-2 bg-sky-600/80 text-white rounded-lg hover:bg-cyan-700"
                            >
                                Search
                            </button>
                            
                        </div>

                        <div className="mt-8 text-sm max-h-60 overflow-y-auto pr-2">

                            {data && (
                                <div className="mt-5 space-y-2 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-lg">
                                    <h3 className="text-lg font-semibold text-cyan-300">
                                        IP Info:
                                    </h3>
                                    <p><strong>IP:</strong> {data.ip}</p>
                                    <p><strong>City:</strong> {data.city}</p>
                                    <p><strong>Region:</strong> {data.region}</p>
                                    <p><strong>Country:</strong> {data.country}</p>
                                    <p><strong>Organization:</strong> {data.connection?.org}</p>
                                    <p><strong>Latitude:</strong> {data.latitude}</p>
                                    <p><strong>Longitude:</strong> {data.longitude}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-10 flex items-center justify-center">
                        {data ? (
                            <div className="w-full h-[400px] rounded-xl overflow-hidden mt-10">
                                <MapContainer
                                    center={[data.latitude, data.longitude]}
                                    zoom={10}
                                    className="w-full h-full"
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[data.latitude, data.longitude]}>
                                        <Popup>
                                            <strong>{data.city}</strong>, {data.country}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        ) : (
                            <p className="text-gray-300">No map data available</p>
                        )}
                    </div>
                </div>
            </div>
            
        </div >
    );
}
