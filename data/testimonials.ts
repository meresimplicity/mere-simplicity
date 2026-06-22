export type Testimonial = {
  name: string;
  role: string;
  location: string;
  quote: string;
  sample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Thabo Mokoena",
    role: "Car Owner",
    location: "Polokwane",
    quote:
      "TRUECOLOURS helped me understand the dent repair, match the colour, and choose the right paint products without making the process feel complicated.",
    sample: true,
  },
  {
    name: "Lerato Nkuna",
    role: "Vehicle Owner",
    location: "Mankweng",
    quote:
      "They did not just sell me paint. They checked what I needed, explained the colour match, and guided me to the right repair products.",
    sample: true,
  },
  {
    name: "Sipho Khumalo",
    role: "Panel Beater",
    location: "Seshego",
    quote:
      "Finding the correct paint, primer, thinners, and supplies is easier with TRUECOLOURS because they understand what each job needs.",
    sample: true,
  },
  {
    name: "Naledi Ramaphosa",
    role: "Customer",
    location: "Limpopo",
    quote:
      "I brought a paint sample and they helped match the colour carefully. The service felt patient, professional, and honest.",
    sample: true,
  },
  {
    name: "Kabelo Mashaba",
    role: "Workshop Assistant",
    location: "Polokwane",
    quote:
      "The product advice is what stands out. They help you choose what works together before the spraying and finishing starts.",
    sample: true,
  },
  {
    name: "Nomsa Maseko",
    role: "Car Owner",
    location: "Tzaneen",
    quote:
      "My car had scratches and I did not know where to start. TRUECOLOURS helped me understand the paint, primer, and finishing supplies I needed.",
    sample: true,
  },
];
