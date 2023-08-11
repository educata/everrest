import { CurrencyCode } from 'src/enums';
import { Product } from '../interfaces';
// dummy data before initial database
// TODO: Fill later
export const PRODUCTS: Omit<Product, '_id'>[] = [
  {
    title:
      'Asus ROG Flow Z13 (2022) 2-in-1 Gaming Laptop (GZ301ZE-LD225W) - Black',
    description:
      'Every laptop in ROG 2023 lineup has a model with our exclusive Nebula Display, with some models getting Nebula HDR Displays for the very first time. These brilliant panels offer a bright future for gamers who demand the absolute best image quality.',
    issueDate: new Date(2022, 1, 1).toISOString(),
    thumbnail:
      'https://alta.ge/images/thumbnails/900/650/detailed/248/129031.png.jpg',
    images: [
      'https://alta.ge/images/detailed/248/129031_2.jpg',
      'https://alta.ge/images/detailed/248/129031_3.jpg',
      'https://alta.ge/images/detailed/248/129031_4.jpg',
      'https://alta.ge/images/detailed/248/129031_5.jpg',
      'https://alta.ge/images/detailed/248/129031_6.jpg',
      'https://alta.ge/images/detailed/248/129031_7.jpg',
      'https://alta.ge/images/detailed/248/129031_8.jpg',
      'https://alta.ge/images/detailed/248/129031_9.jpg',
      'https://alta.ge/images/detailed/248/129031_10.jpg',
      'https://alta.ge/images/detailed/248/129031_11.jpg',
      'https://alta.ge/images/detailed/248/129031_12.jpg',
      'https://alta.ge/images/detailed/248/129031_13.jpg',
      'https://alta.ge/images/detailed/248/129031_14.jpg',
      'https://alta.ge/images/detailed/248/129031_15.jpg',
      'https://alta.ge/images/detailed/248/129031_16.jpg',
      'https://alta.ge/images/detailed/248/129031_17.jpg',
      'https://alta.ge/images/detailed/248/129031_18.jpg',
      'https://alta.ge/images/detailed/248/129031_19.jpg',
      'https://alta.ge/images/detailed/248/129031_20.jpg',
    ],
    price: {
      current: 5414.05,
      currency: CurrencyCode.GEL,
      beforeDiscount: 5699,
      discountPercentage: 5,
    },
    stock: Math.floor(Math.random() * 100) + 10,
    rating: 5,
    category: {
      id: '1',
      name: 'laptops',
      image:
        'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
    },
    brand: 'asus',
    warranty: 24,
  },
  {
    title: 'Asus ROG Strix G18 (2023) (G814JI-N6062) - Eclipse Gray',
    description:
      'Every laptop in ROGs 2023 lineup has a model with our exclusive Nebula Display, with some models getting Nebula HDR Displays for the very first time. These brilliant panels offer a bright future for gamers who demand the absolute best image quality. ',
    issueDate: new Date(2023, 1, 1).toISOString(),
    thumbnail:
      'https://alta.ge/images/thumbnails/900/650/detailed/283/1_haz4-vx.png.jpg',
    images: [
      'https://alta.ge/images/thumbnails/900/650/detailed/283/2_9x1t-tr.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/283/3_meoi-pp.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/283/6_hdet-wt.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/283/4_kr9k-2t.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/283/5_nj3m-oz.png.jpg',
    ],
    price: {
      current: 7200,
      currency: CurrencyCode.GEL,
      beforeDiscount: 7999,
      discountPercentage: 10,
    },
    stock: Math.floor(Math.random() * 100) + 10,
    rating: 5,
    category: {
      id: '1',
      name: 'laptops',
      image:
        'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
    },
    brand: 'asus',
    warranty: 24,
  },
  {
    title: 'Asus TUF Gaming F15 (FX506LHB-HN323) - Black',
    description:
      'Geared for serious gaming and real-world durability, the TUF Gaming F15 is a fully-loaded Windows 10 Pro gaming laptop that can carry you to victory. Powered by the latest 10th Gen Intel® Core™ i7 CPU and GeForce® GTX 1660 Ti GPU, action-packed gameplay is fast, fluid, and fully saturates speedy IPS-level displays up to 144Hz.',
    issueDate: new Date(2022, 1, 1).toISOString(),
    thumbnail:
      'https://alta.ge/images/thumbnails/900/650/detailed/254/120150_1.jpg.jpg',
    images: [
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_2_m7yx-ml.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_3_823p-ed.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_4_56ny-vf.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_5_7qso-zp.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_7_2631-4q.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_8_nctr-27.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/254/119469_9_58ds-69.jpg.jpg',
    ],
    price: {
      current: 1899,
      currency: CurrencyCode.GEL,
      beforeDiscount: 1899,
      discountPercentage: 0,
    },
    stock: Math.floor(Math.random() * 100) + 10,
    rating: 4.5,
    category: {
      id: '1',
      name: 'laptops',
      image:
        'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
    },
    brand: 'asus',
    warranty: 16,
  },
  {
    title: "Apple MacBook Air 13'' M1 (8GB/256GB) - Space Gray (2020)",
    description:
      'Mac and iPhone work as one: copy and paste text between devices, sync edits, continue a conversation on your Mac, started on the iPhone.',
    issueDate: new Date(2020, 1, 1).toISOString(),
    thumbnail:
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113956_1_eguq-zg.jpg.jpg',
    images: [
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113956_2_5qfk-ta.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113955_3.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113956_4_qs9o-3w.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113956_5_3xj1-xu.jpg.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/221/113956_6_q2e1-o0.jpg.jpg',
    ],
    price: {
      current: 2799,
      currency: CurrencyCode.GEL,
      beforeDiscount: 3399,
      discountPercentage: 17.65,
    },
    stock: Math.floor(Math.random() * 100) + 10,
    rating: 4.9,
    category: {
      id: '1',
      name: 'laptops',
      image:
        'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
    },
    brand: 'apple',
    warranty: 12,
  },
  {
    title: 'Lenovo Legion 5 15IAH7 (82RC00E6RK) - Storm Grey',
    description:
      'The body color of Lenovo Legion 5 Notebook are Silver with RGB keyboard',
    issueDate: new Date(2020, 1, 1).toISOString(),
    thumbnail:
      'https://alta.ge/images/thumbnails/900/650/detailed/287/1_fmo9-7i.png.jpg',
    images: [
      'https://alta.ge/images/thumbnails/900/650/detailed/287/2_rg7z-yu.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/287/3_wmvv-sf.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/287/4_9kzn-e0.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/287/5_fhne-c3.png.jpg',
      'https://alta.ge/images/thumbnails/900/650/detailed/287/6_9sqy-2x.png.jpg',
    ],
    price: {
      current: 2949,
      currency: CurrencyCode.GEL,
      beforeDiscount: 3499,
      discountPercentage: 15.72,
    },
    stock: Math.floor(Math.random() * 100) + 10,
    rating: 4.7,
    category: {
      id: '1',
      name: 'laptops',
      image:
        'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-laptop-icon-png-image_5683130.png',
    },
    brand: 'lenovo',
    warranty: 24,
  },
];
