/**
 * Single source of truth for company details, navigation and catalogue data.
 *
 * Previously the product list, industry list and contact details were written
 * out again inside the footer and each section, so they drifted apart (the
 * footer advertised industries the industries section did not list). Everything
 * that appears in more than one place now lives here.
 */

import dolomiteImage from '../assets/attached_assets/generated_images/Dolomite_mineral_powder_0d149fcd.webp';
import talcImage from '../assets/attached_assets/generated_images/Talc_powder_product_dc4e4f6a.webp';
import calciteImage from '../assets/Calcite_mineral_powder_f858afa1.webp';
import limestoneImage from '../assets/attached_assets/generated_images/Limestone_powder_product_33d99b5e.webp';
import silicaImage from '../assets/attached_assets/generated_images/Silica_powder_product_7eef979c.webp';
import chinaClayImage from '../assets/attached_assets/generated_images/China_clay_powder_fced85c3.webp';
import facilityImage from '../assets/attached_assets/generated_images/Manufacturing_facility_exterior_e5c79976.webp';
import paintApplicationImage from '../assets/attached_assets/generated_images/Paint_industry_application_bac5aef0.webp';

export const company = {
  name: 'Aakar Mineral Industries',
  legalName: 'AAKAR MINERAL INDUSTRIES',
  tagline: 'Industrial Mineral Powders',
  foundedYear: 2013,
  city: 'Udaipur',
  region: 'Rajasthan',
  country: 'India',
  postalCode: '313001',
  /** Street line on its own so the schema.org block can be precise. */
  street: 'F-61, Road Number 2, Mewar Industrial Area, Madri',
  address:
    'F-61, Road Number 2, Mewar Industrial Area, Madri, Udaipur, Rajasthan 313001',
  /** E.164 — used for tel: links so mobile dialers parse it correctly. */
  phoneE164: '+919799896949',
  phoneDisplay: '+91 97998 96949',
  email: 'aakarminerals@gmail.com',
  /** Named point of contact, so an enquiry reaches a person, not an inbox. */
  contactPerson: { name: 'Bhavya Chittora', role: 'CEO' },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
} as const;

/** Years in business, derived rather than hard-coded as "10+". */
export const yearsInBusiness = new Date().getFullYear() - company.foundedYear;

export const images = {
  facility: facilityImage,
  paintApplication: paintApplicationImage,
} as const;

export type SectionId =
  | 'home'
  | 'about'
  | 'products'
  | 'industries'
  | 'quality'
  | 'contact';

export const navItems: ReadonlyArray<{
  id: SectionId;
  label: string;
  shortLabel: string;
}> = [
  { id: 'home', label: 'Home', shortLabel: 'Home' },
  { id: 'about', label: 'About Us', shortLabel: 'About' },
  { id: 'products', label: 'Products', shortLabel: 'Products' },
  { id: 'industries', label: 'Industries We Serve', shortLabel: 'Industries' },
  { id: 'quality', label: 'Quality & Facilities', shortLabel: 'Quality' },
  { id: 'contact', label: 'Contact Us', shortLabel: 'Contact' },
];

export interface Product {
  slug: string;
  name: string;
  description: string;
  /** Headline spec shown on the card — concrete numbers, not adjectives. */
  specs: ReadonlyArray<{ label: string; value: string }>;
  /** Where the grade is actually used, as supplied by the plant. */
  applications: ReadonlyArray<string>;
  industries: ReadonlyArray<string>;
  image: string;
}

export const products: ReadonlyArray<Product> = [
  {
    slug: 'dolomite-powder',
    name: 'Dolomite Powder',
    description:
      'High-purity calcium magnesium carbonate with excellent whiteness and chemical stability under heat.',
    specs: [
      { label: 'Brightness', value: '92–95%' },
      { label: 'Mesh', value: '200–800' },
      { label: 'Moisture', value: '< 0.5%' },
    ],
    applications: [
      'Glass and ceramics manufacturing',
      'Steel industry as a flux',
      'Paints and detergents',
      'Construction materials and soil conditioner',
    ],
    industries: ['Glass', 'Ceramics', 'Steel', 'Construction'],
    image: dolomiteImage,
  },
  {
    slug: 'talc-powder',
    name: 'Talc Powder',
    description:
      'Premium-grade hydrated magnesium silicate offering superior smoothness and oil absorption.',
    specs: [
      { label: 'Brightness', value: '90–94%' },
      { label: 'Mesh', value: '325–1250' },
      { label: 'Oil absorption', value: '28–34 g/100g' },
    ],
    applications: [
      'Cosmetics and personal care products',
      'Paper, for smoothness and brightness',
      'Plastics, rubber and paints, for reinforcement',
      'Ceramic tiles and refractories',
    ],
    industries: ['Cosmetics', 'Paper', 'Plastics', 'Ceramics'],
    image: talcImage,
  },
  {
    slug: 'calcite-powder',
    name: 'Calcite Powder',
    description:
      'Pure calcium carbonate with a tightly controlled particle size distribution batch to batch.',
    specs: [
      { label: 'CaCO₃', value: '≥ 98%' },
      { label: 'Mesh', value: '200–1000' },
      { label: 'Whiteness', value: '94–97%' },
    ],
    applications: [
      'PVC pipes, cables and plastic masterbatches',
      'Paints, coatings and adhesives',
      'Rubber and sealants',
      'Paper, for brightness and bulk',
    ],
    industries: ['Plastics', 'Paints', 'Adhesives', 'Paper'],
    image: calciteImage,
  },
  {
    slug: 'limestone-powder',
    name: 'Limestone Powder',
    description:
      'Consistent, low-impurity limestone for cement, concrete and building material production.',
    specs: [
      { label: 'CaO', value: '50–54%' },
      { label: 'Mesh', value: '100–500' },
      { label: 'Silica', value: '< 2%' },
    ],
    applications: [
      'Cement and concrete production',
      'Steel and iron industries',
      'Water treatment and flue gas desulfurisation',
      'Road construction and building materials',
    ],
    industries: ['Cement', 'Steel', 'Water treatment', 'Construction'],
    image: limestoneImage,
  },
  {
    slug: 'silica-powder',
    name: 'Silica Powder',
    description:
      'Chemically inert, thermally stable quartz powder milled to glass and foundry specifications.',
    specs: [
      { label: 'SiO₂', value: '≥ 99%' },
      { label: 'Mesh', value: '100–600' },
      { label: 'Fe₂O₃', value: '< 0.05%' },
    ],
    applications: [
      'Glass and foundry industries',
      'Refractories and ceramics',
      'Chemical and filtration applications',
      'Paints and coatings, for durability',
    ],
    industries: ['Glass', 'Foundry', 'Ceramics', 'Paints'],
    image: silicaImage,
  },
  {
    slug: 'china-clay',
    name: 'China Clay',
    description:
      'High-grade kaolin with exceptional plasticity, low grit and consistent firing behaviour.',
    specs: [
      { label: 'Brightness', value: '80–88%' },
      { label: 'Mesh', value: '200–500' },
      { label: 'Grit (+300#)', value: '< 0.1%' },
    ],
    applications: [
      'Ceramic products and sanitaryware',
      'Paper coating and filling',
      'Rubber and plastics, as a reinforcing agent',
      'Paints and adhesives, for a smooth finish',
    ],
    industries: ['Ceramics', 'Paper', 'Plastics', 'Paints'],
    image: chinaClayImage,
  },
];

export interface Industry {
  slug: string;
  title: string;
  description: string;
  products: ReadonlyArray<string>;
}

export const industries: ReadonlyArray<Industry> = [
  {
    slug: 'paints-coatings',
    title: 'Paints & Coatings',
    description:
      'Mineral fillers that improve opacity, coverage and film durability while lowering formulation cost.',
    products: ['Calcite', 'Dolomite', 'Talc'],
  },
  {
    slug: 'plastics',
    title: 'Plastics',
    description:
      'Reinforcing fillers that raise stiffness, heat-deflection temperature and dimensional stability.',
    products: ['Talc', 'Calcite', 'China Clay'],
  },
  {
    slug: 'ceramics',
    title: 'Ceramics',
    description:
      'Body and glaze raw materials with consistent firing shrinkage and predictable colour response.',
    products: ['China Clay', 'Silica', 'Limestone'],
  },
  {
    slug: 'rubber',
    title: 'Rubber',
    description:
      'Functional fillers that improve extrusion behaviour, tear strength and surface finish.',
    products: ['Calcite', 'Talc', 'Silica'],
  },
  {
    slug: 'paper',
    title: 'Paper',
    description:
      'Coating and filling minerals that raise brightness, smoothness and print holdout.',
    products: ['Calcite', 'Talc', 'China Clay'],
  },
  {
    slug: 'adhesives',
    title: 'Adhesives & Sealants',
    description:
      'Rheology-controlling extenders for putties, tile adhesives and construction sealants.',
    products: ['Calcite', 'Limestone', 'Talc'],
  },
  {
    slug: 'detergents',
    title: 'Detergents',
    description:
      'Mild abrasives and anti-caking agents for household and institutional cleaning products.',
    products: ['Calcite', 'Silica', 'Dolomite'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    description:
      'Bulk minerals for cement blending, dry-mix mortars, wall putty and flooring compounds.',
    products: ['Limestone', 'Calcite', 'Silica'],
  },
  {
    slug: 'pharmaceuticals',
    title: 'Pharmaceuticals',
    description:
      'Pharma-grade minerals used as excipients, glidants and tablet-coating components.',
    products: ['Talc', 'China Clay', 'Calcite'],
  },
];

export const inquiryTypes: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'quote', label: 'Request a quote' },
  { value: 'technical', label: 'Technical support' },
  { value: 'product', label: 'Product information' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Something else' },
];
