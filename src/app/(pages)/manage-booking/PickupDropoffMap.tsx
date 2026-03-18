"use client";

import React, { useState, useRef } from "react";
import { Box, TextField, Typography, MenuItem, Button } from "@mui/material";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

interface Props {
  airportOnly?: boolean;
  setPickupLocation: (value: string) => void;
  setDestinationLocation: (value: string) => void;
  setSelectedRouteKey: (key: string | null) => void; // ✅ NEW
}

/* ================= ROUTES ================= */

const ROUTES = [
  { label: "Riyadh Airport → City", pickup: "Riyadh Airport", destination: "City", key: "riyadh-airport-city" },
  { label: " City →  Riyadh Airport", pickup: "Riyadh Airport", destination: "City", key: "riyadh-airport-city1" },
  { label: "Dammam Airport → City", pickup: "Dammam Airport", destination: "City", key: "dammam-airport-city" },
  { label: "City  →  Dammam Airport", pickup: "Dammam Airport", destination: "City", key: "dammam-airport-city1" },
  { label: "Jeddah Airport → City", pickup: "Jeddah Airport", destination: "City", key: "jeddah-airport-city" },
  { label: "City  →  Jeddah Airport", pickup: "Jeddah Airport", destination: "City", key: "jeddah-airport-city1" },
  { label: "Madinah Airport → City", pickup: "Madinah Airport", destination: "City", key: "madina-airport-city" },
  { label: "City  →  Madinah Airport", pickup: "Madinah Airport", destination: "City", key: "madina-airport-city1" },

  { label: "Riyadh Downtown → City", pickup: "Riyadh Downtown", destination: "City", key: "riyadh-downtown-city" },
  { label: "City  →  Riyadh Downtown", pickup: "Riyadh Downtown", destination: "City", key: "riyadh-downtown-city1" },
  { label: "Jeddah Downtown → City", pickup: "Jeddah Downtown", destination: "City", key: "jeddah-downtown-city" },
  { label: "City  →  Jeddah Downtown", pickup: "Jeddah Downtown", destination: "City", key: "jeddah-downtown-city1" },

  { label: "Jeddah → KAUST", pickup: "Jeddah", destination: "KAUST", key: "jeddah-kaust" },
  { label: "KAUST → Jeddah", pickup: "KAUST", destination: "Jeddah", key: "kaust-jeddah1" },
  { label: "Jeddah → KAEC", pickup: "Jeddah", destination: "KAEC", key: "jeddah-kaec" },
  { label: "KAEC → Jeddah", pickup: "KAEC", destination: "Jeddah", key: "kaec-jeddah1" },
  { label: "Jeddah → Yanbu", pickup: "Jeddah", destination: "Yanbu", key: "jeddah-yanbu" },
  { label: "Yanbu → Jeddah", pickup: "Yanbu", destination: "Jeddah", key: "yanbu-jeddah1" },
  { label: "Jeddah → NEOM", pickup: "Jeddah", destination: "NEOM", key: "jeddah-neom" },
  { label: "NEOM → Jeddah", pickup: "NEOM", destination: "Jeddah", key: "neom-jeddah1" },
  { label: "Red Sea Umluj → Jeddah", pickup: "Red Sea Umluj", destination: "Jeddah", key: "red-sea-umluj-jeddah" },
    { label: "Jeddah → Red Sea Umluj", pickup: "Jeddah", destination: "Red Sea Umluj", key: "jeddah-red-sea-umluj1" },

  { label: "Jeddah Airport → Makkah", pickup: "Jeddah Airport", destination: "Makkah", key: "jeddah-airport-makkah" },
  { label: "Makkah → Jeddah Airport", pickup: "Makkah", destination: "Jeddah Airport", key: "makkah-jeddah-airport1" },
  { label: "Makkah → Madinah", pickup: "Makkah", destination: "Madinah", key: "jeddah-makkah-medina" },
  { label: "Madinah  → Makkah", pickup: "Makkah", destination: "Madinah", key: "jeddah-makkah-medina1" },
  { label: "Jeddah  → Makkah", pickup: "Makkah", destination: "Madinah", key: "jeddah-makkah-medina" },
  { label: " Makkah → Jeddah", pickup: "Makkah", destination: "Jeddah", key: "makkah-jeddah1" },
  { label: " Madinah → Jeddah", pickup: "Makkah", destination: "Jeddah", key: "makkah-jeddah" },
  { label: " Jeddah → Madinah", pickup: "Makkah", destination: "Jeddah", key: "makkah-jeddah1" },
];

const libraries: "places"[] = ["places"];

const PickupDestinationSingleFlow: React.FC<Props> = ({
  airportOnly,
  setPickupLocation,
  setDestinationLocation,
  setSelectedRouteKey,
}) => {
  const [selectedRouteKeyLocal, setSelectedRouteKeyLocal] = useState("");
  const [useMap, setUseMap] = useState(false);

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [pickup, setPickup] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);

  const filteredRoutes = airportOnly
    ? ROUTES.filter((r) => r.pickup.toLowerCase().includes("airport"))
    : ROUTES;

  const handleRouteChange = (value: string) => {
    if (value === "map") {
      setUseMap(true);
      setSelectedRouteKeyLocal("");
      setSelectedRouteKey(null);
      setPickupLocation("");
      setDestinationLocation("");
      return;
    }

    const route = ROUTES.find((r) => r.key === value);

    setSelectedRouteKeyLocal(value);
    setSelectedRouteKey(value);
    setUseMap(false);

    if (route) {
      setPickupLocation(route.pickup);
      setDestinationLocation(route.destination);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results) => {
        if (!results?.[0]) return;

        const address = results[0].formatted_address;

        setPickup({ address, lat, lng });
        setPickupLocation(address);
      });
    });
  };

  const mapCenter = pickup?.lat
    ? { lat: pickup.lat, lng: pickup.lng }
    : destination?.lat
    ? { lat: destination.lat, lng: destination.lng }
    : null;

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={libraries}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
          Select Route *
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          value={selectedRouteKeyLocal}
          onChange={(e) => handleRouteChange(e.target.value)}
        >
          <MenuItem value="" disabled>
            Select route
          </MenuItem>

          {filteredRoutes.map((route) => (
            <MenuItem key={route.key} value={route.key}>
              {route.label}
            </MenuItem>
          ))}

          <MenuItem value="map">🔍 Custom (Google Map)</MenuItem>
        </TextField>
      </Box>

      {useMap && (
        <>
          <Autocomplete
            onLoad={(ref) => (pickupRef.current = ref)}
            onPlaceChanged={() => {
              const place = pickupRef.current?.getPlace();
              if (!place?.geometry?.location) return;

              const address = place.formatted_address || "";

              setPickup({
                address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });

              setPickupLocation(address);
            }}
          >
            <TextField fullWidth size="small" placeholder="Pickup location" />
          </Autocomplete>

          <Button onClick={getCurrentLocation}>📍 Use my location</Button>

          <Autocomplete
            onLoad={(ref) => (destRef.current = ref)}
            onPlaceChanged={() => {
              const place = destRef.current?.getPlace();
              if (!place?.geometry?.location) return;

              const address = place.formatted_address || "";

              setDestination({
                address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              });

              setDestinationLocation(address);
            }}
          >
            <TextField fullWidth size="small" placeholder="Destination" />
          </Autocomplete>

          {mapCenter && (
            <GoogleMap
              zoom={12}
              center={mapCenter}
              mapContainerStyle={{ height: "280px", width: "100%" }}
            >
              {pickup?.lat && <Marker position={pickup} label="P" />}
              {destination?.lat && <Marker position={destination} label="D" />}
            </GoogleMap>
          )}
        </>
      )}
    </LoadScript>
  );
};

export default PickupDestinationSingleFlow;