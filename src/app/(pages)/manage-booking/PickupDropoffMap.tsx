import React, { useRef, useState } from "react";
import { Box, TextField, Typography, MenuItem, Button } from "@mui/material";
import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

/* ================= TYPES ================= */

interface BaseLocation {
  address: string;
}

interface MapLocation extends BaseLocation {
  lat: number;
  lng: number;
}

type Location = BaseLocation | MapLocation;
type LocationMode = "" | "map" | string;

interface Props {
  setPickupLocation: (value: string) => void;
  setDestinationLocation: (value: string) => void;
}

/* ================= CONSTANTS ================= */

const libraries: "places"[] = ["places"];

const PRESET_LOCATIONS: string[] = [
  "Riyadh",
  "JED CITY",
  "JED APT",
  "Makkah City",
  "Madinah City",
  "Dammam City",
];

/* ================= TYPE GUARD ================= */

const isMapLocation = (loc: Location | null): loc is MapLocation =>
  !!loc && typeof (loc as MapLocation).lat === "number";

/* ================= COMPONENT ================= */

const PickupDestinationSingleFlow: React.FC<Props> = ({
  setPickupLocation,
  setDestinationLocation,
}) => {
  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [pickupMode, setPickupMode] = useState<LocationMode>("");
  const [destMode, setDestMode] = useState<LocationMode>("");

  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  /* ================= CURRENT LOCATION ================= */

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results) => {
          if (results?.[0]) {
            const address = results[0].formatted_address;

            setPickup({
              address,
              lat,
              lng,
            });

            setPickupLocation(address); // ✅ parent update
          }
        });
      },
      () => alert("Location permission denied")
    );
  };

  /* ================= MAP CENTER ================= */

  const mapCenter = (() => {
    if (isMapLocation(pickup)) return { lat: pickup.lat, lng: pickup.lng };
    if (isMapLocation(destination))
      return { lat: destination.lat, lng: destination.lng };
    return null;
  })();

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBZPM5OmCSG1s4BN7VI696m-ZMbvg3Yozk"
      libraries={libraries}
    >
      {/* ================= PICKUP ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Pickup Location *
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          value={pickupMode}
          onChange={(e) => {
            const value = e.target.value as LocationMode;
            setPickupMode(value);

            if (value !== "map") {
              setPickup({ address: value });
              setPickupLocation(value); // ✅ update parent
            } else {
              setPickup(null);
            }
          }}
        >
          <MenuItem value="" disabled>
            Select pickup
          </MenuItem>

          {PRESET_LOCATIONS.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}

          <MenuItem value="map">
            🔍 Search on Google Map
          </MenuItem>
        </TextField>
      </Box>

      {pickupMode === "map" && (
        <Box sx={{ mb: 3 }}>
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

              setPickupLocation(address); // ✅ parent update
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search pickup"
            />
          </Autocomplete>

          <Button onClick={getCurrentLocation}>
            📍 Use my location
          </Button>
        </Box>
      )}

      {/* ================= DESTINATION ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Destination *
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          value={destMode}
          onChange={(e) => {
            const value = e.target.value as LocationMode;
            setDestMode(value);

            if (value !== "map") {
              setDestination({ address: value });
              setDestinationLocation(value); // ✅ FIXED
            } else {
              setDestination(null);
            }
          }}
        >
          <MenuItem value="" disabled>
            Select destination
          </MenuItem>

          {PRESET_LOCATIONS.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}

          <MenuItem value="map">
            🔍 Search on Google Map
          </MenuItem>
        </TextField>
      </Box>

      {destMode === "map" && (
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

            setDestinationLocation(address); // ✅ FIXED
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search destination"
          />
        </Autocomplete>
      )}

      {/* ================= MAP ================= */}
      {mapCenter && (
        <GoogleMap
          zoom={12}
          center={mapCenter}
          mapContainerStyle={{
            height: "280px",
            width: "100%",
          }}
        >
          {isMapLocation(pickup) && (
            <Marker
              position={{ lat: pickup.lat, lng: pickup.lng }}
              label="P"
            />
          )}

          {isMapLocation(destination) && (
            <Marker
              position={{ lat: destination.lat, lng: destination.lng }}
              label="D"
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default PickupDestinationSingleFlow;
