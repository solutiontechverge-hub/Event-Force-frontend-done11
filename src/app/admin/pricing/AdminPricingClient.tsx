"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  Switch,
  FormControlLabel,
  MenuItem,
  Snackbar,
  Chip,
} from "@mui/material";
import { Delete, Save, Logout } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { usePricing } from "@/contexts/PricingContext";
import {
  saveFleetConfig,
  savePricing,
  seedPricingAndFleet,
} from "@/services/pricingService";
import {
  ROUTE_DEFINITIONS,
  VEHICLE_PRICE_KEYS,
  type FleetVehicleConfig,
  type PricingData,
  type VehiclePriceKey,
} from "@/types/fleetPricing";
import { FLEET_IMAGE_OPTIONS } from "@/data/fleet";
import { getFirebaseErrorMessage } from "@/lib/firebaseErrors";

const PRIMARY = "#52A4C1";

const VEHICLE_LABELS: Record<VehiclePriceKey, string> = {
  fordTaurus: "Ford Taurus",
  yukon: "GMC Yukon",
  bmw5: "BMW 5 Series",
  bmw7: "BMW 7 Series",
  mercedesS450: "Mercedes S450",
  mercedesVClass: "Mercedes V Class",
  sprinter12: "Sprinter 12",
  hiace12: "Toyota Hiace",
  coaster23: "Toyota Coaster",
  bus49: "Coach 49 Seats",
};

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function AdminPricingClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
  const { pricing, fleetConfig, isLoading, syncError } = usePricing();

  const [tab, setTab] = useState(0);
  const [draftPricing, setDraftPricing] = useState<PricingData | null>(null);
  const [draftFleet, setDraftFleet] = useState<FleetVehicleConfig[] | null>(
    null,
  );
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/admin-login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user?.email) {
      seedPricingAndFleet(user.email).catch(() => undefined);
    }
  }, [authLoading, isAuthenticated, user?.email]);

  useEffect(() => {
    if (!isLoading) {
      setDraftPricing(JSON.parse(JSON.stringify(pricing)));
      setDraftFleet(JSON.parse(JSON.stringify(fleetConfig.vehicles)));
    }
  }, [pricing, fleetConfig.vehicles, isLoading]);

  const handleSeed = async () => {
    if (!user?.email) return;
    setSeeding(true);
    try {
      await seedPricingAndFleet(user.email);
      setSnackbar({
        open: true,
        message: "Default data loaded to Firebase",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getFirebaseErrorMessage(error),
        severity: "error",
      });
    } finally {
      setSeeding(false);
    }
  };

  const handleSavePricing = async () => {
    if (!draftPricing || !user?.email) return;
    setSaving(true);
    try {
      await savePricing(draftPricing, user.email);
      setSnackbar({
        open: true,
        message: "Prices saved successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getFirebaseErrorMessage(error),
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFleet = async () => {
    if (!draftFleet || !user?.email) return;
    setSaving(true);
    try {
      await saveFleetConfig({ vehicles: draftFleet }, user.email);
      setSnackbar({
        open: true,
        message: "Fleet saved successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getFirebaseErrorMessage(error),
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateRate = (
    section: "hourly" | "daily8" | "daily12" | "extraHour",
    vehicleKey: VehiclePriceKey,
    value: string,
  ) => {
    if (!draftPricing) return;
    const parsed =
      value.trim() === "" || value.toLowerCase() === "na"
        ? null
        : Number(value);

    setDraftPricing({
      ...draftPricing,
      [section]: {
        ...draftPricing[section],
        [vehicleKey]: Number.isNaN(parsed) ? null : parsed,
      },
    });
  };

  const updateRouteRate = (
    routeKey: string,
    vehicleKey: VehiclePriceKey,
    value: string,
  ) => {
    if (!draftPricing) return;
    const parsed =
      value.trim() === "" || value.toLowerCase() === "na"
        ? null
        : Number(value);

    setDraftPricing({
      ...draftPricing,
      routes: {
        ...draftPricing.routes,
        [routeKey]: {
          ...(draftPricing.routes as Record<string, Record<string, number | null>>)[
            routeKey
          ],
          [vehicleKey]: Number.isNaN(parsed) ? null : parsed,
        },
      },
    });
  };

  const updateFleetVehicle = (
    index: number,
    field: keyof FleetVehicleConfig,
    value: FleetVehicleConfig[keyof FleetVehicleConfig],
  ) => {
    if (!draftFleet) return;
    const updated = [...draftFleet];
    updated[index] = { ...updated[index], [field]: value };
    setDraftFleet(updated);
  };

  const removeFleetVehicle = (index: number) => {
    if (!draftFleet) return;
    setDraftFleet(draftFleet.filter((_, i) => i !== index));
  };

  if (authLoading || isLoading || !draftPricing || !draftFleet) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: PRIMARY }} />
      </Box>
    );
  }

  const renderRateTable = (
    title: string,
    section: "hourly" | "daily8" | "daily12" | "extraHour",
  ) => (
    <Box mb={4}>
      <Typography variant="h6" mb={2} fontWeight={700}>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f8fb" }}>
              <TableCell>Vehicle</TableCell>
              <TableCell>Rate (SAR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {VEHICLE_PRICE_KEYS.map((key) => (
              <TableRow key={key}>
                <TableCell>{VEHICLE_LABELS[key]}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="NA"
                    value={draftPricing[section][key] ?? ""}
                    onChange={(e) => updateRate(section, key, e.target.value)}
                    sx={{ width: 140 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f8fa", py: 4, px: 2 }}>
      <Box maxWidth="1200px" mx="auto">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography variant="h4" fontWeight={800} color={PRIMARY}>
              Admin — Prices & Fleet
            </Typography>
            <Typography color="text.secondary">
              Changes sync to homepage, fleet, details & booking
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={async () => {
                await logout();
                router.push("/admin-login");
              }}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              onClick={handleSeed}
              disabled={seeding}
            >
              {seeding ? "Loading..." : "Reset to Defaults"}
            </Button>
          </Box>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Logged in as <strong>{user?.email}</strong>. Hourly rates show on
          fleet cards. Route & daily rates apply in booking.
        </Alert>

        {syncError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <strong>Firebase not connected.</strong> {syncError} Copy the rules
            from <code>firestore.rules</code> into{" "}
            <a
              href="https://console.firebase.google.com/project/eventforce-ffabe/firestore/rules"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firebase Console → Firestore Rules
            </a>{" "}
            and publish, or run{" "}
            <code>npx firebase deploy --only firestore:rules</code>.
          </Alert>
        )}

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              px: 2,
              "& .Mui-selected": { color: `${PRIMARY} !important` },
              "& .MuiTabs-indicator": { backgroundColor: PRIMARY },
            }}
          >
            <Tab label="Fleet Vehicles" />
            <Tab label="Hourly Rates" />
            <Tab label="Route Rates" />
            <Tab label="Daily Rates" />
          </Tabs>

          <Box p={3}>
            {tab === 0 && (
              <>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Manage Cars
                </Typography>

                {draftFleet.map((vehicle, index) => (
                  <Paper
                    key={vehicle.id}
                    sx={{ p: 2, mb: 2, borderRadius: 2 }}
                    variant="outlined"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography fontWeight={700}>{vehicle.name}</Typography>
                      <IconButton
                        color="error"
                        onClick={() => removeFleetVehicle(index)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    <Box
                      display="grid"
                      gridTemplateColumns={{
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                      }}
                      gap={2}
                    >
                      <TextField
                        label="Name"
                        size="small"
                        value={vehicle.name}
                        onChange={(e) => {
                          updateFleetVehicle(index, "name", e.target.value);
                          updateFleetVehicle(
                            index,
                            "slug",
                            slugify(e.target.value),
                          );
                        }}
                      />
                      <TextField
                        label="Class"
                        size="small"
                        value={vehicle.class}
                        onChange={(e) =>
                          updateFleetVehicle(index, "class", e.target.value)
                        }
                      />
                      <TextField
                        label="Year"
                        size="small"
                        value={vehicle.year}
                        onChange={(e) =>
                          updateFleetVehicle(index, "year", e.target.value)
                        }
                      />
                      <TextField
                        select
                        label="Image"
                        size="small"
                        value={vehicle.imageKey}
                        onChange={(e) =>
                          updateFleetVehicle(index, "imageKey", e.target.value)
                        }
                      >
                        {FLEET_IMAGE_OPTIONS.map((key) => (
                          <MenuItem key={key} value={key}>
                            {key}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        label="Branches (comma separated)"
                        size="small"
                        value={vehicle.branches.join(", ")}
                        onChange={(e) =>
                          updateFleetVehicle(
                            index,
                            "branches",
                            e.target.value.split(",").map((b) => b.trim()),
                          )
                        }
                      />
                      <TextField
                        label="Features (comma separated)"
                        size="small"
                        value={vehicle.features.join(", ")}
                        onChange={(e) =>
                          updateFleetVehicle(
                            index,
                            "features",
                            e.target.value.split(",").map((f) => f.trim()),
                          )
                        }
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={vehicle.showOnHomepage}
                            onChange={(e) =>
                              updateFleetVehicle(
                                index,
                                "showOnHomepage",
                                e.target.checked,
                              )
                            }
                          />
                        }
                        label="Show on Homepage (Most Rented)"
                      />
                    </Box>
                  </Paper>
                ))}

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveFleet}
                  disabled={saving}
                  sx={{ backgroundColor: PRIMARY, mt: 2 }}
                >
                  {saving ? "Saving..." : "Save Fleet"}
                </Button>
              </>
            )}

            {tab === 1 && (
              <>
                {renderRateTable(
                  "Hourly Rates (shown on fleet cards)",
                  "hourly",
                )}
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSavePricing}
                  disabled={saving}
                  sx={{ backgroundColor: PRIMARY }}
                >
                  {saving ? "Saving..." : "Save Hourly Rates"}
                </Button>
              </>
            )}

            {tab === 2 && (
              <>
                {ROUTE_DEFINITIONS.map((route) => (
                  <Box key={route.key} mb={4}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="h6" fontWeight={700}>
                        {route.label}
                      </Typography>
                      <Chip label={route.category} size="small" />
                    </Box>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f0f8fb" }}>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Rate (SAR)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {VEHICLE_PRICE_KEYS.map((key) => (
                            <TableRow key={key}>
                              <TableCell>{VEHICLE_LABELS[key]}</TableCell>
                              <TableCell>
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder="NA"
                                  value={
                                    (
                                      draftPricing.routes as Record<
                                        string,
                                        Record<string, number | null>
                                      >
                                    )[route.key]?.[key] ?? ""
                                  }
                                  onChange={(e) =>
                                    updateRouteRate(
                                      route.key,
                                      key,
                                      e.target.value,
                                    )
                                  }
                                  sx={{ width: 140 }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSavePricing}
                  disabled={saving}
                  sx={{ backgroundColor: PRIMARY }}
                >
                  {saving ? "Saving..." : "Save Route Rates"}
                </Button>
              </>
            )}

            {tab === 3 && (
              <>
                {renderRateTable("8 Hours Package", "daily8")}
                {renderRateTable("12 Hours Package", "daily12")}
                {renderRateTable("Extra Hour Rate", "extraHour")}
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSavePricing}
                  disabled={saving}
                  sx={{ backgroundColor: PRIMARY }}
                >
                  {saving ? "Saving..." : "Save Daily Rates"}
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
