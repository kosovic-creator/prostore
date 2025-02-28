import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Cijena mora imati tačno dva decimalna mjesta'
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Ime mora imati najmanje 3 karaktera'),
  slug: z.string().min(3, 'Slug mmora imati najmanje 3 karaktera'),
  category: z.string().min(3, 'Kategorija mmora imati najmanje 3 karaktera'),
  brand: z.string().min(3, 'Brand mora imati najmanje 3 karaktera'),
  description: z.string().min(3, 'Karakteristike mmoraju imati najmanje 3 karaktera'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Artikal mora imati makar jednu sliku'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Id je obavezan'),
});

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email('Pogrešna  email adresa'),
  password: z.string().min(6, 'PLozinka mora imati najmanje 6 karaktera'),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Ime mora imati najmanje 3 karaktera'),
    email: z.string().email('Pogrešna  email adresa'),
    password: z.string().min(6, 'Lozinka mora imati najmanje 6 karaktera'),
    confirmPassword: z
      .string()
      .min(6, 'Lozinka mora imati najmanje 6 karaktera'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne podudaraju",
    path: ['confirmPassword'],
  });

// Cart Schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Artikal je obavezan'),
  name: z.string().min(1, 'Ime je obavezno'),
  slug: z.string().min(1, 'Slug je obavezan'),
  qty: z.number().int().nonnegative('Količina mora biti pozitivni broj'),
  image: z.string().min(1, 'Slika je obavzna'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session cart id je obavezno'),
  userId: z.string().optional().nullable(),
});

// Schema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Ime mora imati najmanje 3 karaktera'),
  streetAddress: z.string().min(3, 'Adresa mora imati najmanje 3 karaktera'),
  city: z.string().min(3, 'Grad mora imati najmanje 3 karaktera'),
  postalCode: z.string().min(3, 'Poštanski broj mora imati najmanje 3 karaktera.'),
  country: z.string().min(3, 'Država mora imati najmanje 3 karaktera'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Način plaćanja je obavezan'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Pogrešan način plaćanja',
  });

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'Korisnik je obavezan'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Pogrešan način plaćanja',
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting an order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Schema for the PayPal paymentResult
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Schema for updating the user profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Ime mora imati najmanje 3 karaktera'),
  email: z.string().min(3, 'Email mora imati najmanje 3 karaktera'),
});

// Schema to update users
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'ID ije obavezan'),
  role: z.string().min(1, 'Role je obavezna'),
});

// Schema to insert reviews
export const insertReviewSchema = z.object({
  title: z.string().min(3, 'Naslov mora imati najmanje 3 karaktera'),
  description: z.string().min(3, 'Karakteristike moraju imati najmanje 3 karaktera'),
  productId: z.string().min(1, 'Artikal je obavezan'),
  userId: z.string().min(1, 'Korisnik je obavezan'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Ocjena mora imati najmanje 1')
    .max(5, 'Ocjena može biti najviše 5'),
});
