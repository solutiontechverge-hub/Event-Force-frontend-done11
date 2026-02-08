'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Skeleton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  CalendarToday,
  CloudUpload,
  ArrowDropDown,
  ArrowBack,
} from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SlideUpInView } from '@/components/animations';
import { sendBookingEmail } from '@/services/emailService';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CarBmw7Series,
  CarChinesbus49Sea,
  CarFordTaurus,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarToyotaCoaster,
  ManageBookingBg,
  MeTrendCrystalSolidWhite10,
  MeTrendWhitePlatinumTriCoat01,
  MeTrendHotPepperRed01,
  MeTrendLustrousGrey01,
  MeTrendVaporBlue01,
  MeTrendAgateBlack01,
  Gmc1,
  Gmc2,
  Gmc3,
  Gmc4,
  Gmc5,
  Gmc6,
  Gmc7,
  BmwBlack1,
  Bmw2,
  Bmw3,
  Bmw4,
  Bmw5,
  Bmw6,
  Bmw7,
  Bmw8,
  MercedesS450White,
  MercedesS450Black,
  Bmw7SeriesBlack1,
  Bmw7SeriesAlpineWhite,
  Bmw7SeriesMineralWhiteMetallic,
  Bmw7SeriesOxideGrayMetallic,
  Bmw7SeriesBrooklynGreyMetallic,
  MercedesVClassBlack,
  MercedesVClassSilver,
  MercedesVClassBlue,
  MercedesVClassGrey,
  ToyotaHiaceBlack,
  ToyotaHiaceSilver,
  ToyotaCoasterDefault,
  ToyotaCoasterSafetyRobust,
  ToyotaCoasterWhiteLavender,
  ToyotaCoasterWhiteTurquoise,
  ToyotaCoasterWhiteBeige,
  ToyotaCoasterYellow,
  ChineseBus49Default,
  ChineseBus49YuTong,
  ChineseBus49KingLong,
} from '../../../../public/images';

interface Car {
  name: string;
  price: string;
  duration: string;
  image: any;
  class: string;
  year: string;
  branch: string;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
  image: {
    src: string;
    width: number;
    height: number;
    blurWidth: number;
    blurHeight: number;
    blurDataURL: string;
  };
}

const fleet: Car[] = [
  {
    name: 'Ford Taurus',
    price: '125 SAR',
    duration: 'Per hour',
    image: MeTrendAgateBlack01, // Default to black (#1A1A1A)
    class: 'Economy',
    year: '2024',
    branch: 'Riyadh'
  },
  {
    name: 'GMC Yukon',
    price: '150 SAR',
    duration: 'Per hour',
    image: CarGmc,
    class: 'SUV',
    year: '2024',
    branch: 'Jeddah'
  },
  {
    name: 'BMW 5 Series',
    price: '150 SAR',
    duration: 'Per day',
    image: BmwBlack1,
    class: 'Luxury',
    year: '2025',
    branch: 'Riyadh'
  },
  {
    name: 'Mercedes S450',
    price: '400 SAR',
    duration: 'Per day',
    image: CarMercedesS450,
    class: 'Luxury',
    year: '2025',
    branch: 'Jeddah'
  },
  {
    name: 'BMW 7 Series',
    price: '400 SAR',
    duration: 'Per day',
    image: CarBmw7Series,
    class: 'Luxury',
    year: '2025',
    branch: 'Riyadh'
  },
  {
    name: 'Mercedes V Class',
    price: '300 SAR',
    duration: 'Per day',
    image: CarMercedesVClass,
    class: 'Van',
    year: '2024',
    branch: 'Jeddah'
  },
  {
    name: 'Toyota Hiace',
    price: '1000 SAR',
    duration: '12 hours',
    image: CarHiace,
    class: 'Van',
    year: '2024',
    branch: 'Riyadh'
  },
  {
    name: 'Toyota Coaster',
    price: '1500 SAR',
    duration: '12 hours',
    image: CarToyotaCoaster,
    class: 'Bus',
    year: '2024',
    branch: 'Jeddah'
  },
  {
    name: 'Coach 49 Seats',
    price: '2000 SAR',
    duration: '12 hours',
    image: CarChinesbus49Sea,
    class: 'Bus',
    year: '2024',
    branch: 'Riyadh'
  },
];

const ManageBookingClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [hoveredCarImage, setHoveredCarImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+966',
    contactNumber: '',
    selectedCar: 'black',
    selectedColor: '',
    serviceType: '',
    pickupLocation: '',
    destination: '',
    tripType: '',
    photo: null as File | null,
    pickupDate: '',
    returnDate: '',
  });

  useEffect(() => {
    // Delay to show skeleton - ensures it's visible on initial load
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Get car from URL params
  const carParam = searchParams?.get('car') || '';
  const priceParam = searchParams?.get('price') || '';
  const durationParam = searchParams?.get('duration') || '';
  const colorIdParam = searchParams?.get('colorId') || '';
  const colorIndexParam = searchParams?.get('colorIndex') || '';

  // Function to get color image based on car name and color ID
  const getColorImage = (carName: string, colorId: string) => {
    if (!colorId) return null;

    const normalizedName = carName.toLowerCase();

    if (normalizedName.includes('ford taurus')) {
      // Ford Taurus: Always return black image (#1A1A1A) - no other colors
      return MeTrendAgateBlack01;
    }

    if (normalizedName.includes('gmc yukon') || normalizedName.includes('gmc')) {
      const colorMap: { [key: string]: any } = {
        'glacier-white-tricoat': Gmc1,
        'titanium-rush-metallic': Gmc2,
        'summit-white': Gmc3,
        'onyx-black': Gmc4,
        'volcanic-red-tintcoat': Gmc5,
        'sterling-metallic': Gmc6,
        'downpour-metallic': Gmc7,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('bmw 5 series') || normalizedName.includes('bmw 5')) {
      const colorMap: { [key: string]: any } = {
        'black': BmwBlack1,
        'color-2': Bmw2,
        'color-3': Bmw3,
        'color-4': Bmw4,
        'color-5': Bmw5,
        'color-6': Bmw6,
        'color-7': Bmw7,
        'color-8': Bmw8,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('mercedes s450') || normalizedName.includes('mercedes s class')) {
      const colorMap: { [key: string]: any } = {
        'black': MercedesS450Black,
        'white': MercedesS450White,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('bmw 7 series') || normalizedName.includes('bmw 7')) {
      const colorMap: { [key: string]: any } = {
        'black': Bmw7SeriesBlack1,
        'alpine-white': Bmw7SeriesAlpineWhite,
        'mineral-white-metallic': Bmw7SeriesMineralWhiteMetallic,
        'oxide-gray-metallic': Bmw7SeriesOxideGrayMetallic,
        'brooklyn-grey-metallic': Bmw7SeriesBrooklynGreyMetallic,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('mercedes v class') || normalizedName.includes('mercedes v-class')) {
      const colorMap: { [key: string]: any } = {
        'black': MercedesVClassBlack,
        'silver': MercedesVClassSilver,
        'blue': MercedesVClassBlue,
        'grey': MercedesVClassGrey,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('toyota hiace') || normalizedName.includes('hiace')) {
      const colorMap: { [key: string]: any } = {
        'black': ToyotaHiaceBlack,
        'silver': ToyotaHiaceSilver,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('toyota coaster') || normalizedName.includes('coaster')) {
      const colorMap: { [key: string]: any } = {
        'default': ToyotaCoasterDefault,
        'safety-robust': ToyotaCoasterSafetyRobust,
        'white-lavender': ToyotaCoasterWhiteLavender,
        'white-turquoise': ToyotaCoasterWhiteTurquoise,
        'white-beige': ToyotaCoasterWhiteBeige,
        'yellow': ToyotaCoasterYellow,
      };
      return colorMap[colorId] || null;
    }

    if (normalizedName.includes('chines bus 49') || normalizedName.includes('chinese bus 49') || normalizedName.includes('49 seater')) {
      const colorMap: { [key: string]: any } = {
        'default': ChineseBus49Default,
        'yu-tong': ChineseBus49YuTong,
        'king-long': ChineseBus49KingLong,
      };
      return colorMap[colorId] || null;
    }

    return null;
  };

  // Function to get all color options for a car
  const getColorOptionsForCar = (carName: string) => {
    if (!carName) return [];

    const normalizedName = carName.toLowerCase();

    // Ford Taurus: Default color is #1A1A1A (black), no color selection - return empty array
    if (normalizedName.includes('ford taurus')) {
      return [];
    }

    if (normalizedName.includes('gmc yukon') || normalizedName.includes('gmc')) {
      return [
        { id: 'glacier-white-tricoat', name: 'Glacier White Tricoat', color: '#FFFFFF', image: Gmc1 },
        { id: 'titanium-rush-metallic', name: 'Titanium Rush Metallic', color: '#4A5568', image: Gmc2 },
        { id: 'summit-white', name: 'Summit White', color: '#F5F5F5', image: Gmc3 },
        { id: 'onyx-black', name: 'Onyx Black', color: '#1A1A1A', image: Gmc4 },
        { id: 'volcanic-red-tintcoat', name: 'Volcanic Red Tintcoat', color: '#8B2635', image: Gmc5 },
        { id: 'sterling-metallic', name: 'Sterling Metallic', color: '#9CA3AF', image: Gmc6 },
        { id: 'downpour-metallic', name: 'Downpour Metallic', color: '#4B5563', image: Gmc7 },
      ];
    }

    if (normalizedName.includes('bmw 5 series') || normalizedName.includes('bmw 5')) {
      return [
        { id: 'black', name: 'Black', color: '#1A1A1A', image: BmwBlack1 },
        { id: 'color-2', name: 'Color Option 2', color: '#4A5568', image: Bmw2 },
        { id: 'color-3', name: 'Color Option 3', color: '#9CA3AF', image: Bmw3 },
        { id: 'color-4', name: 'Color Option 4', color: '#4B5563', image: Bmw4 },
        { id: 'color-5', name: 'Color Option 5', color: '#1E40AF', image: Bmw5 },
        { id: 'color-6', name: 'Color Option 6', color: '#92400E', image: Bmw6 },
        { id: 'color-7', name: 'Color Option 7', color: '#065F46', image: Bmw7 },
        { id: 'color-8', name: 'Color Option 8', color: '#1E3A8A', image: Bmw8 },
      ];
    }

    if (normalizedName.includes('mercedes s450') || normalizedName.includes('mercedes s class')) {
      return [
        { id: 'black', name: 'Black', color: '#1A1A1A', image: MercedesS450Black },
        { id: 'white', name: 'White', color: '#FFFFFF', image: MercedesS450White },
      ];
    }

    if (normalizedName.includes('bmw 7 series') || normalizedName.includes('bmw 7')) {
      return [
        { id: 'black', name: 'Black', color: '#1A1A1A', image: Bmw7SeriesBlack1 },
        { id: 'alpine-white', name: 'Alpine White', color: '#FFFFFF', image: Bmw7SeriesAlpineWhite },
        { id: 'mineral-white-metallic', name: 'Mineral White Metallic', color: '#F5F5F5', image: Bmw7SeriesMineralWhiteMetallic },
        { id: 'oxide-gray-metallic', name: 'Oxide Gray Metallic', color: '#4A1A1A', image: Bmw7SeriesOxideGrayMetallic },
        { id: 'brooklyn-grey-metallic', name: 'Brooklyn Grey Metallic', color: '#1A1F2E', image: Bmw7SeriesBrooklynGreyMetallic },
      ];
    }

    if (normalizedName.includes('mercedes v class') || normalizedName.includes('mercedes v-class')) {
      return [
        { id: 'black', name: 'Black', color: '#1A1A1A', image: MercedesVClassBlack },
        { id: 'silver', name: 'Silver', color: '#FFFFFF', image: MercedesVClassSilver },
        { id: 'blue', name: 'Blue', color: '#F5F5F5', image: MercedesVClassBlue },
        { id: 'grey', name: 'Grey', color: '#6B7280', image: MercedesVClassGrey },
      ];
    }

    if (normalizedName.includes('toyota hiace') || normalizedName.includes('hiace')) {
      return [
        { id: 'black', name: 'Black', color: '#1A1A1A', image: ToyotaHiaceBlack },
        { id: 'silver', name: 'Silver', color: '#C0C0C0', image: ToyotaHiaceSilver },
      ];
    }

    if (normalizedName.includes('toyota coaster') || normalizedName.includes('coaster')) {
      return [
        { id: 'default', name: 'Default', color: '#52A4C1', image: ToyotaCoasterDefault },
        { id: 'safety-robust', name: 'Safety Robust', color: '#9699CD', image: ToyotaCoasterSafetyRobust },
        { id: 'white-lavender', name: 'White / Lavender', color: '#E6E6FA', image: ToyotaCoasterWhiteLavender },
        { id: 'white-turquoise', name: 'White / Turquoise', color: '#40E0D0', image: ToyotaCoasterWhiteTurquoise },
        { id: 'white-beige', name: 'White Beige', color: '#F5F5DC', image: ToyotaCoasterWhiteBeige },
        { id: 'yellow', name: 'Yellow', color: '#FFD700', image: ToyotaCoasterYellow },
      ];
    }

    if (normalizedName.includes('chines bus 49') || normalizedName.includes('chinese bus 49') || normalizedName.includes('49 seater')) {
      return [
        { id: 'default', name: 'Default', color: '#253F58', image: ChineseBus49Default },
        { id: 'yu-tong', name: 'Yu Tong', color: '#E8F2F6', image: ChineseBus49YuTong },
        { id: 'king-long', name: 'King Long', color: '#4D85B4', image: ChineseBus49KingLong },
      ];
    }

    // Default: return empty array for cars without color options
    return [];
  };

  // Find the selected car
  const selectedCar = useMemo(() => {
    if (carParam) {
      const carName = carParam.replace(/-/g, ' ');
      return fleet.find(car =>
        car.name.toLowerCase() === carName.toLowerCase()
      ) || null;
    }
    return null;
  }, [carParam]);

  // Get selected color image
  const selectedColorImage = useMemo(() => {
    if (selectedCar && colorIdParam) {
      return getColorImage(selectedCar.name, colorIdParam);
    }
    return null;
  }, [selectedCar, colorIdParam]);

  // Set default car if provided in URL or use first car as default
  useEffect(() => {
    if (selectedCar && !formData.selectedCar) {
      setFormData(prev => ({
        ...prev,
        selectedCar: selectedCar.name,
        // For Ford Taurus: always set to black (#1A1A1A), for others use URL color if available
        selectedColor: selectedCar.name.toLowerCase().includes('ford taurus')
          ? 'agate-black'
          : (colorIdParam || prev.selectedColor),
      }));
    } else if (!formData.selectedCar && !selectedCar) {
      // Set first car as default if no car is selected
      setFormData(prev => ({
        ...prev,
        selectedCar: fleet[0].name,
        // For Ford Taurus: always set to black (#1A1A1A)
        selectedColor: fleet[0].name.toLowerCase().includes('ford taurus') ? 'agate-black' : prev.selectedColor,
      }));
    }
  }, [selectedCar, colorIdParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: value,
      };
      // Reset selected color when car changes
      if (name === 'selectedCar') {
        // For Ford Taurus: always set to black (#1A1A1A) as default
        // For other vehicles: reset to empty
        updated.selectedColor = value.toLowerCase().includes('ford taurus') ? 'agate-black' : '';
      }
      // Reset location fields when service type changes
      if (name === 'serviceType') {
        updated.pickupLocation = '';
        updated.destination = '';
      }
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file,
      }));
    }
  };

  // Get minimum datetime (2 hours from now) for pickup date
  const getMinDateTime = () => {
    const now = new Date();
    const minDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, '0');
    const day = String(minDate.getDate()).padStart(2, '0');
    const hours = String(minDate.getHours()).padStart(2, '0');
    const minutes = String(minDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate pickup date is at least 2 hours in advance
      if (formData.pickupDate) {
        const pickupDateTime = new Date(formData.pickupDate);
        const minDateTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

        if (pickupDateTime < minDateTime) {
          setSnackbar({
            open: true,
            message: t('booking.minTime'),
            severity: 'error',
          });
          setIsSubmitting(false);
          return;
        }
      }

      await sendBookingEmail(formData);
      setSnackbar({
        open: true,
        message: `${t('booking.success')} Please check your spam folder as well after confirming booking.`,
        severity: 'success',
      });
      // Optionally reset form after successful submission
      // setFormData({ ... });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || t('booking.error'),
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    router.push('/our-fleet');
  };

  const handleBackToDetails = () => {
    if (displayCar) {
      // Construct vehicleId from car name - convert to lowercase and replace spaces with hyphens
      const vehicleId = displayCar.name.toLowerCase().replace(/\s+/g, '-');

      // Build URL with current color selection if available
      const params = new URLSearchParams();
      if (colorIdParam) {
        params.set('color', colorIdParam);
      }
      if (colorIndexParam) {
        params.set('colorIndex', colorIndexParam);
      }

      const queryString = params.toString();
      const url = `/our-fleet/${vehicleId}${queryString ? `?${queryString}` : ''}`;
      router.push(url);
    } else {
      // Fallback to fleet page if car not found
      router.push('/our-fleet');
    }
  };

  // Get available colors for the selected car
  // const availableColors = useMemo(() => {
  //   const carName = formData.selectedCar || selectedCar?.name || '';
  //   return getColorOptionsForCar(carName);
  // }, [formData.selectedCar, selectedCar]);


  const availableColors: ColorOption[] = [
    {
      "id": "black",
      "name": "Black",
      "color": "#1A1A1A",
      "image": {
        "src": "/_next/static/media/bmwblack1.2ddcfe47.png",
        "width": 1344,
        "height": 806,
        "blurWidth": 8,
        "blurHeight": 5,
        "blurDataURL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAg0lEQVR42o1MPQqDMBg1zVehXdpIWodAJRjqIOgYQQ8QN3XxKp7Bgzh6EK8g6Alcnf0U3H3wePD+LOsqKKU2c5zw67r5m7EEAJ5HQAihvq8qY0xXVOWUZumqtV6UUg3Gt71g/zyvlVKOURzPQoiBc97jW73vz5cX8g9wD1A/aD2ONWIDgw8QaoRGAusAAAAASUVORK5CYII="
      }
    },


  ]
  console.log(availableColors);

  // Get the selected color image from formData
  const formSelectedColorImage = useMemo(() => {
    if (formData.selectedCar && formData.selectedColor) {
      return getColorImage(formData.selectedCar, formData.selectedColor);
    }
    return null;
  }, [formData.selectedCar, formData.selectedColor]);

  const displayCar = useMemo(() => {
    let car = null;
    if (formData.selectedCar) {
      car = fleet.find(c => c.name === formData.selectedCar) || selectedCar || fleet[0];
    } else {
      car = selectedCar || fleet[0];
    }

    // For Ford Taurus: Always use black image (#1A1A1A) as default - force black always
    if (car?.name.toLowerCase().includes('ford taurus')) {
      return {
        ...car,
        image: MeTrendAgateBlack01, // Always black, no exceptions
      };
    }

    // For other vehicles: Priority: formData.selectedColor > URL color > default car image
    let imageToUse = car?.image;
    if (formSelectedColorImage) {
      imageToUse = formSelectedColorImage;
    } else if (selectedColorImage) {
      imageToUse = selectedColorImage;
    }

    return {
      ...car,
      image: imageToUse || car?.image,
    };
  }, [formData.selectedCar, selectedCar, formSelectedColorImage, selectedColorImage]);

  // Pricing calculation based on spreadsheet
  const calculatePrice = useMemo(() => {
    if (!formData.selectedCar || !formData.serviceType) return null;

    const carName = formData.selectedCar.toLowerCase();
    const serviceType = formData.serviceType;
    const pickupLocation = formData.pickupLocation.toLowerCase();
    const destination = formData.destination.toLowerCase();

    // Map vehicle names to spreadsheet columns
    const getVehicleKey = (name: string) => {
      if (name.includes('ford taurus')) return 'fordTaurus';
      if (name.includes('gmc yukon') || name.includes('yukon')) return 'yukon';
      if (name.includes('bmw 5')) return 'bmw5';
      if (name.includes('bmw 7') || name.includes('mercedes s450')) return 'bmw7Mercedes';
      if (name.includes('toyota hiace') || name.includes('hiace')) return 'hiace12';
      if (name.includes('toyota coaster') || name.includes('coaster')) return 'coaster23';
      if (name.includes('chines bus 49') || name.includes('chinese bus 49') || name.includes('49 seater')) return 'bus49';
      return null;
    };

    const vehicleKey = getVehicleKey(carName);
    if (!vehicleKey) return null;

    // Pricing data from spreadsheet
    const pricing: any = {
      // Airport Pickup/Drop to City
      'riyadh-airport-city': {
        fordTaurus: 150,
        yukon: 300,
        bmw5: 250,
        bmw7Mercedes: 450,
        hiace12: 500,
        coaster23: 800,
        bus49: 1200,
      },
      'dammam-airport-city': {
        fordTaurus: 150,
        yukon: 300,
        bmw5: 250,
        bmw7Mercedes: 450,
        hiace12: 500,
        coaster23: 800,
        bus49: 1200,
      },
      'jeddah-airport-city': {
        fordTaurus: 150,
        yukon: 300,
        bmw5: 250,
        bmw7Mercedes: 400,
        hiace12: 500,
        coaster23: 800,
        bus49: 1200,
      },
      'madina-airport-city': {
        fordTaurus: 150,
        yukon: 250,
        bmw5: 250,
        bmw7Mercedes: 450,
        hiace12: 300,
        coaster23: 800,
        bus49: 1200,
      },
      // Downtown to Inside City
      'riyadh-downtown-city': {
        fordTaurus: 125,
        yukon: 250,
        bmw5: 225,
        bmw7Mercedes: 350,
        hiace12: 400,
        coaster23: 600,
        bus49: 1000,
      },
      'dammam-downtown-city': {
        fordTaurus: 125,
        yukon: 250,
        bmw5: 225,
        bmw7Mercedes: 350,
        hiace12: 400,
        coaster23: 600,
        bus49: 1000,
      },
      'jeddah-downtown-city': {
        fordTaurus: 125,
        yukon: 250,
        bmw5: 225,
        bmw7Mercedes: 350,
        hiace12: 400,
        coaster23: 600,
        bus49: 1000,
      },
      'madina-downtown-city': {
        fordTaurus: 125,
        yukon: 225,
        bmw5: 225,
        bmw7Mercedes: 800,
        hiace12: 400,
        coaster23: 600,
        bus49: 1000,
      },
      // Inter-city routes
      'jeddah-kaust': {
        fordTaurus: 225,
        yukon: 400,
        bmw5: 400,
        bmw7Mercedes: 1250,
        hiace12: 600,
        coaster23: 1000,
        bus49: 1500,
      },
      'jeddah-kaec': {
        fordTaurus: 300,
        yukon: 500,
        bmw5: 500,
        bmw7Mercedes: 1400,
        hiace12: 750,
        coaster23: 1200,
        bus49: 2000,
      },
      'jeddah-yanbu': {
        fordTaurus: 600,
        yukon: 1000,
        bmw5: 1000,
        bmw7Mercedes: 3000,
        hiace12: 1200,
        coaster23: 2000,
        bus49: 2500,
      },
      'jeddah-red-sea-umluj': {
        fordTaurus: 1500,
        yukon: 2500,
        bmw5: 2500,
        bmw7Mercedes: 4500,
        hiace12: 1600,
        coaster23: 3000,
        bus49: 3500,
      },
      'jeddah-neom': {
        fordTaurus: 2500,
        yukon: 3500,
        bmw5: 3500,
        bmw7Mercedes: 5000,
        hiace12: 2000,
        coaster23: 3500,
        bus49: 4000,
      },
      'jeddah-airport-makkah': {
        fordTaurus: 300,
        yukon: 500,
        bmw5: 500,
        bmw7Mercedes: 1250,
        hiace12: 600,
        coaster23: 1000,
        bus49: 1000,
      },
      'jeddah-makkah-medina': {
        fordTaurus: 900,
        yukon: 1500,
        bmw5: 1500,
        bmw7Mercedes: 3000,
        hiace12: 1400,
        coaster23: 1800,
        bus49: 2000,
      },
      // Hourly rates
      'hourly': {
        fordTaurus: 125,
        yukon: 150,
        bmw5: 150,
        bmw7Mercedes: 400,
        hiace12: null, // NA
        coaster23: null, // NA
        bus49: null, // NA
      },
      // Package rates
      '8-hours': {
        fordTaurus: 750,
        yukon: 1200,
        bmw5: 1200,
        bmw7Mercedes: 2000, // Range: 2000-2500, using min
        hiace12: 850,
        coaster23: 1200,
        bus49: 1500,
      },
      '12-hours': {
        fordTaurus: 1000,
        yukon: 1500,
        bmw5: 1500,
        bmw7Mercedes: 2400, // Range: 2400-3000, using min
        hiace12: 1000,
        coaster23: 1500,
        bus49: 2000,
      },
      // Extra hour rate
      'extra-hour': {
        fordTaurus: 125,
        yukon: 150,
        bmw5: 150,
        bmw7Mercedes: 300,
        hiace12: 125,
        coaster23: 150,
        bus49: 250,
      },
    };

    // Determine pricing key based on service type and locations
    let pricingKey = '';

    if (serviceType === 'hourly') {
      pricingKey = 'hourly';
    } else if (serviceType === '8-hours') {
      pricingKey = '8-hours';
    } else if (serviceType === '12-hours') {
      pricingKey = '12-hours';
    } else if (serviceType === 'extra-hour') {
      pricingKey = 'extra-hour';
    } else if (serviceType === 'airport-pickup') {
      // Airport pickup/drop to city
      if (pickupLocation.includes('riyadh')) {
        pricingKey = 'riyadh-airport-city';
      } else if (pickupLocation.includes('dammam')) {
        pricingKey = 'dammam-airport-city';
      } else if (pickupLocation.includes('jeddah')) {
        if (destination.includes('makkah')) {
          pricingKey = 'jeddah-airport-makkah';
        } else {
          pricingKey = 'jeddah-airport-city';
        }
      } else if (pickupLocation.includes('madina') || pickupLocation.includes('medina')) {
        pricingKey = 'madina-airport-city';
      }
    } else if (serviceType === 'downtown') {
      // Downtown to inside city
      if (pickupLocation.includes('riyadh')) {
        pricingKey = 'riyadh-downtown-city';
      } else if (pickupLocation.includes('dammam')) {
        pricingKey = 'dammam-downtown-city';
      } else if (pickupLocation.includes('jeddah')) {
        pricingKey = 'jeddah-downtown-city';
      } else if (pickupLocation.includes('madina') || pickupLocation.includes('medina')) {
        pricingKey = 'madina-downtown-city';
      }
    } else if (serviceType === 'inter-city') {
      // Inter-city routes
      if (pickupLocation.includes('jeddah')) {
        if (destination.includes('kaust')) {
          pricingKey = 'jeddah-kaust';
        } else if (destination.includes('kaec')) {
          pricingKey = 'jeddah-kaec';
        } else if (destination.includes('yanbu')) {
          pricingKey = 'jeddah-yanbu';
        } else if (destination.includes('umluj') || destination.includes('red sea')) {
          pricingKey = 'jeddah-red-sea-umluj';
        } else if (destination.includes('neom')) {
          pricingKey = 'jeddah-neom';
        } else if (destination.includes('makkah')) {
          pricingKey = 'jeddah-airport-makkah';
        } else if (destination.includes('medina') || destination.includes('madina')) {
          pricingKey = 'jeddah-makkah-medina';
        }
      } else if ((pickupLocation.includes('jeddah') || pickupLocation.includes('makkah')) && (destination.includes('medina') || destination.includes('madina'))) {
        pricingKey = 'jeddah-makkah-medina';
      }
    }

    if (!pricingKey || !pricing[pricingKey]) return null;

    const price = pricing[pricingKey][vehicleKey];
    return price !== null && price !== undefined ? price : null;
  }, [formData.selectedCar, formData.serviceType, formData.pickupLocation, formData.destination]);





  if (!isMounted) {
    return (
      <>
        <Header />

        {/* Hero Section Skeleton */}
        <Box
          sx={{
            pt: 8,
            height: '35vh',
            minHeight: '300px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#52A4C1',
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton
                variant="text"
                width="40%"
                height={60}
                sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.3)' }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.2)' }}
              />
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Car Details Card Skeleton - Left Side */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" width="60%" height={40} animation="wave" sx={{ mb: 3 }} />
                    <Skeleton variant="rectangular" height={350} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />
                    <Skeleton variant="text" width="50%" height={30} animation="wave" />
                  </CardContent>
                </Card>
              </Grid>

              {/* Booking Form Skeleton - Right Side */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    {/* Form Fields Skeleton */}
                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Skeleton variant="rectangular" width={120} height={40} animation="wave" sx={{ borderRadius: '8px' }} />
                      <Skeleton variant="rectangular" width="100%" height={40} animation="wave" sx={{ borderRadius: '8px' }} />
                    </Box>

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={120} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 3 }} />

                    <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={40} animation="wave" sx={{ borderRadius: '8px', mb: 4 }} />

                    {/* Buttons Skeleton */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Skeleton variant="rectangular" width="50%" height={48} animation="wave" sx={{ borderRadius: '8px' }} />
                      <Skeleton variant="rectangular" width="50%" height={48} animation="wave" sx={{ borderRadius: '8px' }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          height: '35vh',
          minHeight: '300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#52A4C1',
        }}
      >
        {/* Background Image */}
        {isMounted && (
          <Box
            className={heroImageLoaded ? 'hero-image-container loaded' : 'hero-image-container'}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={ManageBookingBg.src || ManageBookingBg}
              alt="Booking Form Hero Background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              priority
              onLoad={() => setHeroImageLoaded(true)}
              sizes="100vw"
            />
          </Box>
        )}

        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: { xs: 700, sm: 700, md: 'bold' },
                  mb: { xs: 1.5, sm: 2, md: 2 },
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.3 }
                }}
              >
                {t('booking.title')}
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' },
                  fontWeight: { xs: 400, sm: 400, md: 400 },
                  maxWidth: '800px',
                  mx: 'auto',
                  px: { xs: 2, sm: 0, md: 0 }
                }}
              >
                {t('booking.subtitle')}
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          {/* Back to Details Button */}
          {displayCar && (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={handleBackToDetails}
                sx={{
                  color: '#52A4C1',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(82, 164, 193, 0.1)',
                  },
                }}
              >
                Back to Vehicle Details
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            {/* Car Details Card - Left Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  position: { md: 'sticky' },
                  top: { md: 100 },
                  height: 'fit-content',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      color: '#52A4C1',
                    }}
                  >
                    {displayCar.name}
                  </Typography>

                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: 250, sm: 300, md: 350 },
                      mb: 3,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5',
                      cursor: 'zoom-in',
                    }}
                    onMouseEnter={() => setHoveredCarImage(true)}
                    onMouseLeave={() => setHoveredCarImage(false)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transform: hoveredCarImage ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform',
                      }}
                    >
                      <Image
                        src={displayCar.image.src || displayCar.image}
                        alt={displayCar.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#52A4C1',
                      mb: 1,
                    }}
                  >
                    {calculatePrice !== null ? (
                      <>
                        {t('booking.price')}: {calculatePrice} SAR
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            color: '#666',
                            fontSize: '0.75rem',
                            mt: 0.5,
                          }}
                        >
                          {t('booking.excludesVAT')}
                        </Typography>
                      </>
                    ) : (
                      `${t('booking.rent')}: ${displayCar.price}/${displayCar.duration}`
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Booking Form - Right Side */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box component="form" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.fullName')}*
                      </Typography>
                      <TextField
                        fullWidth
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t('booking.fullNamePlaceholder')}
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      />
                    </Box>

                    {/* Email Address */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.email')}*
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('booking.emailPlaceholder')}
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      />
                    </Box>

                    {/* Contact Number */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.phone')}*
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          size="small"
                          sx={{
                            width: '120px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F8',
                            },
                          }}
                        />
                        <TextField
                          fullWidth
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder={t('booking.phonePlaceholder')}
                          required
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F8',
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Select Car */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.selectCar')}
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      >
                        <Select
                          name="selectedCar"
                          value={formData.selectedCar}
                          onChange={handleSelectChange}
                          displayEmpty
                          IconComponent={ArrowDropDown}
                          MenuProps={{
                            disableScrollLock: true,
                            PaperProps: {
                              sx: {
                                zIndex: 9999,
                                maxHeight: 300,
                              },
                            },
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left',
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            {t('booking.selectCarPlaceholder')}
                          </MenuItem>
                          {fleet.map((car) => (
                            <MenuItem key={car.name} value={car.name}>
                              {car.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* Select Color - Hidden for Ford Taurus (default black #1A1A1A), shown for other vehicles */}
                    {/* {formData.selectedCar && availableColors.length > 0 && !formData.selectedCar.toLowerCase().includes('ford taurus') && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: '#333',
                            fontSize: '0.875rem',
                          }}
                        >
                          {t('booking.color')}
                        </Typography>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F8',
                            },
                          }}
                        >
                          <Select
                            name="selectedColor"
                            value={formData.selectedColor}
                            onChange={handleSelectChange}
                            displayEmpty
                            IconComponent={ArrowDropDown}
                            MenuProps={{
                              disableScrollLock: true,
                              PaperProps: {
                                sx: {
                                  zIndex: 9999,
                                  maxHeight: 300,
                                },
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              {t('booking.color')}
                            </MenuItem>
                            {availableColors.map((color) => (
                              <MenuItem key={color.id} value={color.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Box
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: '50%',
                                      backgroundColor: color.color,
                                      border: '1px solid #E0E0E0',
                                    }}
                                  />
                                  <Typography>{color.name}</Typography>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )} */}

                    {/* Service Type */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.serviceType')}*
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      >
                        <Select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleSelectChange}
                          displayEmpty
                          required
                          IconComponent={ArrowDropDown}
                          MenuProps={{
                            disableScrollLock: true,
                            PaperProps: {
                              sx: {
                                zIndex: 9999,
                                maxHeight: 300,
                              },
                            },
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left',
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            {t('booking.selectServiceType')}
                          </MenuItem>
                          <MenuItem value="airport-pickup">{t('service.airport')}</MenuItem>
                          <MenuItem value="downtown">{t('service.downtown')}</MenuItem>
                          <MenuItem value="inter-city">{t('service.intercity')}</MenuItem>
                          <MenuItem value="hourly">{t('service.hourly')}</MenuItem>
                          <MenuItem value="8-hours">{t('service.8hours')}</MenuItem>
                          <MenuItem value="12-hours">{t('service.12hours')}</MenuItem>


                        </Select>
                      </FormControl>
                    </Box>

                    {/* Pickup Location - Show for airport, downtown, and inter-city */}
                    {(formData.serviceType === 'airport-pickup' || formData.serviceType === 'downtown' || formData.serviceType === 'inter-city') && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: '#333',
                            fontSize: '0.875rem',
                          }}
                        >
                          {t('booking.pickupLocation')}*
                        </Typography>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F8',
                            },
                          }}
                        >
                          <Select
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleSelectChange}
                            displayEmpty
                            required
                            IconComponent={ArrowDropDown}
                            MenuProps={{
                              disableScrollLock: true,
                              PaperProps: {
                                sx: {
                                  zIndex: 9999,
                                  maxHeight: 300,
                                },
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              {t('booking.pickupLocationPlaceholder')}
                            </MenuItem>
                            <MenuItem value="Riyadh">Riyadh</MenuItem>
                            <MenuItem value="Dammam">Dammam</MenuItem>
                            <MenuItem value="Jeddah">Jeddah</MenuItem>
                            <MenuItem value="Makkah">Makkah</MenuItem>
                            <MenuItem value="Madina">Madina</MenuItem>
                            <MenuItem value="JED APT">JED APT</MenuItem>
                            <MenuItem value="JED CITY">JED CITY</MenuItem>
                            <MenuItem value="Makah City">Makah City</MenuItem>
                            <MenuItem value="Madinah City">Madinah City</MenuItem>
                            <MenuItem value="Madinah APT">Madinah APT</MenuItem>
                            <MenuItem value="DAMMAM APT">DAMMAM APT</MenuItem>
                            <MenuItem value="DAMMAM CITY">DAMMAM CITY</MenuItem>
                            <MenuItem value="RYD APT">RYD APT</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    )}

                    {/* Destination - Show for inter-city routes or Jeddah Airport to Makkah */}
                    {(formData.serviceType === 'inter-city' || (formData.serviceType === 'airport-pickup' && formData.pickupLocation === 'Jeddah' || formData.pickupLocation === 'Riyadh')) && (
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: '#333',
                            fontSize: '0.875rem',
                          }}
                        >
                          {t('booking.destination')}*
                        </Typography>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F8',
                            },
                          }}
                        >
                          <Select
                            name="destination"
                            value={formData.destination}
                            onChange={handleSelectChange}
                            displayEmpty
                            required
                            IconComponent={ArrowDropDown}
                            MenuProps={{
                              disableScrollLock: true,
                              PaperProps: {
                                sx: {
                                  zIndex: 9999,
                                  maxHeight: 300,
                                },
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              {t('booking.destinationPlaceholder')}
                            </MenuItem>
                            {formData.serviceType === 'airport-pickup' && formData.pickupLocation === 'Jeddah' && [
                              <MenuItem key="Makkah" value="Makkah">Makkah</MenuItem>,
                              <MenuItem key="Jeddah" value="Jeddah">Jeddah</MenuItem>
                            ]}
                            {formData.serviceType === 'inter-city' || formData.pickupLocation === 'Riyadh' && [
                              <MenuItem key="JED_APT" value="JED_APT">JED APT</MenuItem>,
                              <MenuItem key="JED_CITY" value="JED_CITY">JED CITY</MenuItem>,
                              <MenuItem key="Makkah_CITY" value="Makkah_CITY">Makah City</MenuItem>,
                              <MenuItem key="Madina_CITY" value="Madina_CITY">Madinah City</MenuItem>,
                              <MenuItem key="Madina_APT" value="Madina_APT">Madinah APT</MenuItem>,
                              <MenuItem key="DAMMAM_APT" value="DAMMAM_APT">DAMMAM APT</MenuItem>,
                              <MenuItem key="DAMMAM_CITY" value="DAMMAM_CITY">DAMMAM CITY</MenuItem>,
                              <MenuItem key="RYD_APT" value="RYD_APT">RYD APT</MenuItem>,
                              <MenuItem key="KAUST" value="KAUST">KAUST</MenuItem>,
                              <MenuItem key="KAEC" value="KAEC">KAEC</MenuItem>,
                              <MenuItem key="Yanbu" value="Yanbu">Yanbu</MenuItem>,
                              <MenuItem key="Red_Sea_Umluj" value="Red_Sea_Umluj">Red Sea Umluj</MenuItem>,
                              <MenuItem key="NEOM" value="NEOM">NEOM</MenuItem>,
                              <MenuItem key="Makkah" value="Makkah">Makkah</MenuItem>,
                              <MenuItem key="Medina" value="Medina">Medina</MenuItem>
                            ]}
                          </Select>
                        </FormControl>
                      </Box>
                    )}

                    {/* Calculated Price Display */}
                    {calculatePrice !== null && (
                      <Box sx={{ mb: 3, p: 2, backgroundColor: '#E3F2FD', borderRadius: '8px', border: '1px solid #52A4C1' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            mb: 0.5,
                            color: '#1976D2',
                            fontSize: '0.875rem',
                          }}
                        >
                          Pls confirm your booking so our reservations team can contact with you for further procedures
                          Once we received the reservation or the booking we will confirm to the client with the rate and
                          availability
                        </Typography>
                        {/* <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 'bold',
                            color: '#52A4C1',
                          }}
                        >
                          {calculatePrice} SAR
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#666',
                            fontSize: '0.75rem',
                            display: 'block',
                            mt: 0.5,
                          }}
                        >
                          *Excludes VAT 15%
                        </Typography> */}
                      </Box>
                    )}

                    {/* Upload Photo */}
                    {/* <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        Upload Photo
                      </Typography>
                      <Box
                        sx={{
                          border: '2px dashed #ccc',
                          borderRadius: '8px',
                          p: 3,
                          textAlign: 'center',
                          backgroundColor: '#F8F8F8',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: '#52A4C1',
                            backgroundColor: '#f0f0f0',
                          },
                        }}
                      >
                        <input
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="photo-upload"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="photo-upload">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <CloudUpload sx={{ fontSize: 40, color: '#52A4C1' }} />
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              {formData.photo ? formData.photo.name : 'Upload Photo'}
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                    </Box> */}

                    {/* Pickup Date (Required) */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.pickupDate')}*
                      </Typography>
                      <TextField
                        fullWidth
                        name="pickupDate"
                        type="datetime-local"
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        required
                        inputProps={{
                          min: getMinDateTime(),
                        }}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarToday sx={{ color: '#666' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 0.5,
                          color: '#666',
                          fontSize: '0.75rem',
                          display: 'block',
                        }}
                      >
                        {t('booking.minTime')}
                      </Typography>
                    </Box>

                    {/* Flight # (Optional but recommended) */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          color: '#333',
                          fontSize: '0.875rem',
                        }}
                      >
                        {t('booking.flightNumber')}
                      </Typography>
                      <TextField
                        fullWidth
                        name="returnDate"
                        type="text"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        placeholder={t('booking.flightNumberPlaceholder')}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: '#F8F8F8',
                          },
                        }}
                      />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleCancel}
                        sx={{
                          py: 1.5,
                          borderRadius: '8px',
                          borderColor: '#D8D8D8',
                          backgroundColor: '#D8D8D8',
                          color: '#333',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          '&:hover': {
                            borderColor: '#C0C0C0',
                            backgroundColor: '#C0C0C0',
                          },
                        }}
                      >
                        {t('booking.cancel')}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                          py: 1.5,
                          borderRadius: '8px',
                          backgroundColor: '#52A4C1',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#4a94b1',
                          },
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Confirm'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export default ManageBookingClient;
